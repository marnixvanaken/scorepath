// Maps team ID → ISO 3166-1 alpha-2 code for flagcdn.com
// Subdivisions (gb-sct, gb-eng) are supported by flagcdn.com
export const FLAG_CODE: Record<string, string> = {
  MEX: 'mx', KOR: 'kr', RSA: 'za', CZE: 'cz',
  CAN: 'ca', SUI: 'ch', QAT: 'qa', BIH: 'ba',
  BRA: 'br', MAR: 'ma', SCO: 'gb-sct', HAI: 'ht',
  USA: 'us', PAR: 'py', AUS: 'au', TUR: 'tr',
  GER: 'de', ECU: 'ec', CIV: 'ci', CUW: 'cw',
  NED: 'nl', JPN: 'jp', TUN: 'tn', SWE: 'se',
  BEL: 'be', IRN: 'ir', EGY: 'eg', NZL: 'nz',
  ESP: 'es', URU: 'uy', KSA: 'sa', CPV: 'cv',
  FRA: 'fr', SEN: 'sn', NOR: 'no', IRQ: 'iq',
  ARG: 'ar', AUT: 'at', ALG: 'dz', JOR: 'jo',
  POR: 'pt', COL: 'co', UZB: 'uz', COD: 'cd',
  ENG: 'gb-eng', CRO: 'hr', PAN: 'pa', GHA: 'gh',
};

export function flagUrl(teamId: string, width = 32): string {
  const code = FLAG_CODE[teamId];
  if (!code) return '';
  return `https://flagcdn.com/w${width}/${code}.png`;
}
