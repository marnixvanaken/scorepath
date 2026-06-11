import type { GroupId, MatchResult } from './types';
import { GROUP_IDS, groupFixtures } from '@/data/worldcup2026';

/**
 * Volgorde-modus serialiseert geen scores: de gebruiker sleept alleen de
 * eindvolgorde per groep. Een gedeelde kaart-URL codeert echter enkel `s`
 * (uitslagen) en `k` (knockout); zonder uitslagen valt de kaart terug op de
 * sterkte-tiebreaker en reproduceert dus een ándere eindstand dan de gebruiker
 * zag (zie /api/og -> getQualifiers).
 *
 * Deze functie leidt een minimale set uitslagen af die exact de gesleepte
 * volgorde oplevert, zodat het bestaande `s`-formaat de enige bron van waarheid
 * blijft en de kaart de juiste gekwalificeerden toont:
 *   - hoger geplaatst verslaat lager geplaatst -> strikte 9/6/3/0 punten;
 *   - de nummer 3 van elke groep wint zijn 3-vs-4-duel met een marge die zijn
 *     plek in `thirdsOrder` codeert, zodat de ranking van beste nummers 3 klopt.
 *
 * Alle overige duels zijn uitslag-only (geen goals), zodat een gedeelde kaart
 * van een groepswinnaar of nummer 2 geen verzonnen scores toont.
 */
export function synthesizeDragResults(
  dragOrders: Record<GroupId, string[]>,
  thirdsOrder: GroupId[] = [],
): MatchResult[] {
  const results: MatchResult[] = [];
  const thirdRank = new Map<GroupId, number>(thirdsOrder.map((g, i) => [g, i]));

  for (const g of GROUP_IDS) {
    const order = dragOrders[g] ?? [];
    const rankOf = (id: string) => order.indexOf(id); // 0 = eerste, -1 = onbekend

    // Marge waarmee de nummer 3 van deze groep zijn nummer 4 verslaat: hoger in
    // thirdsOrder => groter doelsaldo => hogere ranking bij de beste nummers 3.
    const i = thirdRank.get(g);
    const thirdMargin =
      i === undefined ? 0 : Math.min(15, Math.max(1, thirdsOrder.length - i));

    for (const { homeId, awayId } of groupFixtures(g)) {
      const hr = rankOf(homeId);
      const ar = rankOf(awayId);
      if (hr === -1 || ar === -1) continue; // groep nog niet (volledig) gesleept

      const homeWins = hr < ar; // lagere index = hoger geplaatst = wint
      const winnerRank = Math.min(hr, ar);
      const loserRank = Math.max(hr, ar);

      // Codeer alleen het 3-vs-4-duel met goals (voor de #3-ranking); de rest
      // blijft uitslag-only zodat er geen scorelines op de kaart verschijnen.
      if (winnerRank === 2 && loserRank === 3 && thirdMargin > 0) {
        results.push(
          homeWins
            ? { group: g, homeId, awayId, homeGoals: thirdMargin, awayGoals: 0 }
            : { group: g, homeId, awayId, homeGoals: 0, awayGoals: thirdMargin },
        );
      } else {
        results.push({ group: g, homeId, awayId, outcome: homeWins ? 'H' : 'A' });
      }
    }
  }

  return results;
}
