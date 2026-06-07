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
    slug: 'drie-legendes-wk-2026',
    title: 'Messi, Ronaldo en Ochoa: drie legendes op hun zesde WK',
    description: 'Drie mannen die het voetbal van twee decennia domineerden, staan op hun zesde Wereldkampioenschap. Een historisch moment dat we nooit meer zullen meemaken.',
    date: '2026-05-29',
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
    date: '2026-05-29',
    readTime: 5,
    category: 'Verhalen',
    tags: ['VS', 'Iran', 'WK 2026', 'Geschiedenis'],
    related: ['drie-legendes-wk-2026', 'tim-payne-viral-wk', 'oudste-coach-wk-2026'],
    author: 'ScorePath Redactie',
    published: true,
  },
  {
    slug: 'mbappe-jaagt-klose',
    title: "Mbappé jaagt op Klose: kan hij het record breken?",
    description: "Miroslav Klose scoorde 16 keer op een WK. Kylian Mbappé begint aan 2026 met 12 goals. De rekensom is eenvoudig. De uitvoering niet.",
    date: '2026-05-29',
    readTime: 5,
    category: 'Records',
    tags: ['Mbappé', 'Klose', 'WK goals', 'Records'],
    related: ['drie-legendes-wk-2026', 'messi-meeste-wk-wedstrijden', 'messi-vrije-trappen-rivelino'],
    author: 'ScorePath Redactie',
    published: true,
  },
  {
    slug: 'messi-meeste-wk-wedstrijden',
    title: 'Messi en het record van Matthäus: meer WK-wedstrijden dan wie ook',
    description: 'Na Qatar 2022 is Messi de speler met de meeste WK-wedstrijden ooit. In 2026 schrijft hij bij elke minuut nieuwe geschiedenis.',
    date: '2026-05-29',
    readTime: 5,
    category: 'Records',
    tags: ['Messi', 'Matthäus', 'WK 2026', 'Records'],
    related: ['drie-legendes-wk-2026', 'messi-vrije-trappen-rivelino', 'mbappe-jaagt-klose'],
    author: 'ScorePath Redactie',
    published: true,
  },
  {
    slug: 'yamal-euro-wk-dubbel',
    title: 'Yamal en de grote dubbel: jongste ooit om Euro én WK te winnen',
    description: 'Lamine Yamal won Euro 2024 als 16-jarige. Als Spanje ook WK 2026 wint, is hij de jongste speler ooit die beide trofeeën pakt. Dat record staat open.',
    date: '2026-05-29',
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
    date: '2026-05-29',
    readTime: 5,
    category: 'Analyse',
    tags: ['Coaches', 'WK 2026', 'Records', 'Tabárez'],
    related: ['drie-legendes-wk-2026', 'vs-iran-wk-2026', 'tim-payne-viral-wk'],
    author: 'ScorePath Redactie',
    published: true,
  },
  {
    slug: 'courtois-clean-sheets',
    title: 'Courtois op jacht: het record voor meeste WK clean sheets',
    description: 'Thibaut Courtois wil de WK-geschiedenis in als keeper met de meeste clean sheets. Daarvoor heeft hij een lang Belgisch toernooi nodig.',
    date: '2026-05-29',
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
    date: '2026-05-29',
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
    published: true,
  },
];

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return blogs.find((b) => b.slug === slug);
}

export function getPublishedBlogs(): BlogPost[] {
  return blogs.filter((b) => b.published);
}
