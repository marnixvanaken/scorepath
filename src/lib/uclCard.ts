// MijnKaart-serialisatie: alle wedstrijden van de gekozen club in een compacte,
// URL-veilige string. Alleen de eigen club wordt geserialiseerd, dus de param
// blijft klein. Formaat per duel: `${round}.${oppId}.${res}` gescheiden door `_`.
// res = "gf-ga" (met goals) of "W"/"L" (winnaar-gekozen duels).

export interface CardMatch {
  round: string; // q1 q2 q3 po lp kopo r16 qf sf final
  oppId: string;
  res: string; // "2-1" | "W" | "L"
}

// Ronde-labels voor de kaart staan in i18n (Messages.ogCard.ucl.round), zodat
// ze per taal vertaald kunnen worden. De sleutels hier (q1..final) corresponderen
// met die vertaalsleutels.

export function encodeCard(matches: CardMatch[]): string {
  return matches.map((m) => `${m.round}.${m.oppId}.${m.res}`).join('_');
}

export function decodeCard(s: string): CardMatch[] {
  if (!s) return [];
  return s
    .split('_')
    .map((rec) => {
      const [round, oppId, res] = rec.split('.');
      return round && oppId && res ? { round, oppId, res } : null;
    })
    .filter((m): m is CardMatch => m !== null);
}

// Uitkomst van een kaart-duel vanuit het perspectief van de gekozen club.
export function cardOutcome(m: CardMatch): 'W' | 'D' | 'L' {
  if (m.res === 'W') return 'W';
  if (m.res === 'L') return 'L';
  const [gf, ga] = m.res.split('-').map(Number);
  if (Number.isNaN(gf) || Number.isNaN(ga)) return 'D';
  return gf > ga ? 'W' : gf < ga ? 'L' : 'D';
}

// Heeft de club het toernooi gewonnen? (finale gespeeld en gewonnen)
export function cardIsChampion(matches: CardMatch[]): boolean {
  const final = matches.find((m) => m.round === 'final');
  return !!final && cardOutcome(final) === 'W';
}
