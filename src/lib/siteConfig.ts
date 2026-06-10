// Canonieke host is www.scorepath.nl. Stel NEXT_PUBLIC_SITE_URL in productie OOK in
// op https://www.scorepath.nl en zorg dat de hosting (Vercel/DNS) een 301 doet van
// de apex scorepath.nl -> www.scorepath.nl. De proxy doet dit ook defensief (zie src/proxy.ts).
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.scorepath.nl').replace(/\/$/, '');
export const SITE_NAME = 'ScorePath';
export const SITE_DESCRIPTION = 'Vul de groepsuitslagen in en zie live wie doorgaat naar de knockout-fase van het WK 2026.';
