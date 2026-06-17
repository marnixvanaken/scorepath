export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: number;
  category: string;
  tags: string[];
  related: string[];
  author: string;
  published: boolean;
}

export const blogs: BlogPost[] = [
  {
    slug: 'wk-2026-format',
    title: '48 teams, een ronde van 32 en nieuwe regels: het WK 2026 format uitgelegd',
    description: 'Het WK 2026 heeft een nieuw format: 48 teams, 12 groepen en een geheel nieuwe ronde van 32. Alles wat je moet weten over hoe het toernooi werkt.',
    date: '2026-03-05',
    readTime: 6,
    category: 'Uitleg',
    tags: ['WK 2026', 'Format', 'Ronde van 32', '48 teams'],
    related: ['drie-legendes-wk-2026', 'vs-iran-wk-2026', 'vijf-wk-stunts'],
    author: 'ScorePath Redactie',
    published: true,
  },
  {
    slug: 'drie-legendes-wk-2026',
    title: 'Messi, Ronaldo en Ochoa: drie legendes op hun zesde WK',
    description: 'Drie mannen die het voetbal van twee decennia domineerden, staan op hun zesde Wereldkampioenschap. Een historisch moment dat we nooit meer zullen meemaken.',
    date: '2026-03-17',
    readTime: 6,
    category: 'Legendes',
    tags: ['Messi', 'Ronaldo', 'Ochoa', 'WK 2026'],
    related: ['messi-meeste-wk-wedstrijden', 'messi-vrije-trappen-rivelino', 'mbappe-jaagt-klose'],
    author: 'ScorePath Redactie',
    published: true,
  },
  {
    slug: 'vs-iran-wk-2026',
    title: 'VS tegen Iran: een herkansing na 1998',
    description: 'In 1998 speelden de VS en Iran de meest politiek geladen wedstrijd in WK-geschiedenis. In 2026 is Amerika gastland. Kan het opnieuw?',
    date: '2026-03-28',
    readTime: 5,
    category: 'Verhalen',
    tags: ['VS', 'Iran', 'WK 2026', 'Geschiedenis'],
    related: ['drie-legendes-wk-2026', 'vijf-wk-stunts', 'oudste-coach-wk-2026'],
    author: 'ScorePath Redactie',
    published: true,
  },
  {
    slug: 'mbappe-jaagt-klose',
    title: "Mbappé jaagt op Klose: kan hij het record breken?",
    description: "Miroslav Klose scoorde 16 keer op een WK. Kylian Mbappé begint aan 2026 met 12 goals. De rekensom is eenvoudig. De uitvoering niet.",
    date: '2026-04-09',
    readTime: 5,
    category: 'Records',
    tags: ['Mbappé', 'Klose', 'WK goals', 'Records'],
    related: ['drie-legendes-wk-2026', 'messi-meeste-wk-wedstrijden', 'messi-vrije-trappen-rivelino'],
    author: 'ScorePath Redactie',
    published: true,
  },
  {
    slug: 'nederland-wk-2026',
    title: 'Oranje op het WK 2026: hoe ver kunnen ze komen?',
    description: 'Nederland miste het WK van 2018 en bereikte de kwartfinale in 2022. Nu, met een nieuwe generatie rondom Van Dijk en Simons, zijn de verwachtingen hoog. Hoe realistisch is de WK-droom van Oranje?',
    date: '2026-04-22',
    readTime: 6,
    category: 'Analyse',
    tags: ['Nederland', 'Oranje', 'WK 2026', 'Analyse'],
    related: ['wk-2026-format', 'vijf-wk-stunts', 'oudste-coach-wk-2026'],
    author: 'ScorePath Redactie',
    published: true,
  },
  {
    slug: 'messi-meeste-wk-wedstrijden',
    title: 'Messi en het record van Matthäus: meer WK-wedstrijden dan wie ook',
    description: 'Na Qatar 2022 is Messi de speler met de meeste WK-wedstrijden ooit. In 2026 schrijft hij bij elke minuut nieuwe geschiedenis.',
    date: '2026-04-30',
    readTime: 5,
    category: 'Records',
    tags: ['Messi', 'Matthäus', 'WK 2026', 'Records'],
    related: ['drie-legendes-wk-2026', 'messi-vrije-trappen-rivelino', 'mbappe-jaagt-klose'],
    author: 'ScorePath Redactie',
    published: true,
  },
  {
    slug: 'vijf-wk-stunts',
    title: 'De vijf grootste WK-verrassingen ooit',
    description: 'Van Noord-Korea dat Italië versloeg in 1966 tot de historische 7-1 van Duitsland tegen Brazilië in 2014: dit zijn de vijf meest onverwachte momenten in WK-geschiedenis.',
    date: '2026-05-12',
    readTime: 6,
    category: 'Verhalen',
    tags: ['WK-geschiedenis', 'Stunts', 'Records', 'WK 2026'],
    related: ['vs-iran-wk-2026', 'drie-legendes-wk-2026', 'wk-2026-format'],
    author: 'ScorePath Redactie',
    published: true,
  },
  {
    slug: 'yamal-euro-wk-dubbel',
    title: 'Yamal en de grote dubbel: jongste ooit om Euro én WK te winnen',
    description: 'Lamine Yamal won Euro 2024 als 16-jarige. Als Spanje ook WK 2026 wint, is hij de jongste speler ooit die beide trofeeën pakt. Dat record staat open.',
    date: '2026-05-20',
    readTime: 5,
    category: 'Records',
    tags: ['Yamal', 'Spanje', 'Euro 2024', 'WK 2026'],
    related: ['drie-legendes-wk-2026', 'mbappe-jaagt-klose', 'courtois-clean-sheets'],
    author: 'ScorePath Redactie',
    published: true,
  },
  {
    slug: 'oudste-coach-wk-2026',
    title: 'Wie wordt de oudste coach op WK 2026?',
    description: 'Oscar Tabárez coachte Uruguay op zijn 71e op het WK. In 2026 zijn er kandidaten die dat record kunnen benaderen. Een blik op leeftijd en ervaring op het grootste podium.',
    date: '2026-05-26',
    readTime: 5,
    category: 'Analyse',
    tags: ['Coaches', 'WK 2026', 'Records', 'Tabárez'],
    related: ['drie-legendes-wk-2026', 'vs-iran-wk-2026', 'nederland-wk-2026'],
    author: 'ScorePath Redactie',
    published: true,
  },
  {
    slug: 'courtois-clean-sheets',
    title: 'Courtois op jacht: het record voor meeste WK clean sheets',
    description: 'Thibaut Courtois wil de WK-geschiedenis in als keeper met de meeste clean sheets. Daarvoor heeft hij een lang Belgisch toernooi nodig.',
    date: '2026-06-02',
    readTime: 5,
    category: 'Records',
    tags: ['Courtois', 'België', 'Clean sheets', 'WK 2026'],
    related: ['mbappe-jaagt-klose', 'yamal-euro-wk-dubbel', 'drie-legendes-wk-2026'],
    author: 'ScorePath Redactie',
    published: true,
  },
  {
    slug: 'messi-vrije-trappen-rivelino',
    title: "Messi en de vrije trap: jaagt hij op het record van Rivelino?",
    description: "Rivelino was de eerste grote meester van de vrije trap op een WK. Vijftig jaar later staat Messi klaar om zijn erfenis over te nemen.",
    date: '2026-06-08',
    readTime: 5,
    category: 'Records',
    tags: ['Messi', 'Rivelino', 'Vrije trap', 'WK 2026'],
    related: ['messi-meeste-wk-wedstrijden', 'drie-legendes-wk-2026', 'mbappe-jaagt-klose'],
    author: 'ScorePath Redactie',
    published: true,
  },
  {
    slug: 'tim-payne-viral-wk',
    title: 'Tim Payne: van 4.000 naar een miljoen volgers in één WK',
    description: 'Niemand kende hem voor het toernooi. Nu heeft Tim Payne meer dan een miljoen Instagram-volgers. Hoe het WK van onbekende atleten mondiale iconen maakt.',
    date: '2026-06-15',
    readTime: 5,
    category: 'Verhalen',
    tags: ['Tim Payne', 'Viral', 'WK 2026', 'Social media'],
    related: ['vs-iran-wk-2026', 'drie-legendes-wk-2026', 'oudste-coach-wk-2026'],
    author: 'ScorePath Redactie',
    // Gedepubliceerd: publicatiedatum 15-06-2026 ligt in de toekomst en het artikel
    // claimt gebeurtenissen (viral worden tijdens het toernooi) die nog niet hebben
    // plaatsgevonden — het WK start pas 11-06-2026. Zet pas weer op true na herschrijven
    // met correcte, actuele feiten en een publicatiedatum in het verleden.
    published: false,
  },
];

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return blogs.find((b) => b.slug === slug);
}

export function getPublishedBlogs(): BlogPost[] {
  return blogs.filter((b) => b.published);
}
