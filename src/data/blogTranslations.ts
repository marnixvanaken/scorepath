interface LocalizedMeta {
  title: string;
  description: string;
  category: string;
}

type BlogTranslations = Record<string, {
  en: LocalizedMeta;
  es: LocalizedMeta;
}>;

export const BLOG_TRANSLATIONS: BlogTranslations = {
  'wk-2026-format': {
    en: {
      title: '48 teams, a round of 32 and new rules: the 2026 World Cup format explained',
      description: 'The 2026 World Cup has a new format: 48 teams, 12 groups and a brand new round of 32. Everything you need to know about how the tournament works.',
      category: 'Guide',
    },
    es: {
      title: '48 equipos, la ronda de 32 y nuevas reglas: así funciona el Mundial 2026',
      description: 'El Mundial 2026 tiene un nuevo formato: 48 equipos, 12 grupos y una nueva ronda de 32. Todo lo que necesitas saber sobre cómo funciona el torneo.',
      category: 'Guía',
    },
  },
  'nederland-wk-2026': {
    en: {
      title: 'The Netherlands at World Cup 2026: how far can they go?',
      description: 'The Netherlands missed 2018 and reached the quarter-finals in 2022. Now, with Van Dijk and Simons leading a new generation, how realistic is the Dutch World Cup dream?',
      category: 'Analysis',
    },
    es: {
      title: 'Países Bajos en el Mundial 2026: ¿hasta dónde pueden llegar?',
      description: 'Países Bajos no estuvo en 2018 y llegó a cuartos en 2022. Ahora, con Van Dijk y Simons liderando una nueva generación, ¿cómo de realista es el sueño mundialista de la Naranja?',
      category: 'Análisis',
    },
  },
  'vijf-wk-stunts': {
    en: {
      title: 'The five biggest World Cup upsets ever',
      description: 'From North Korea beating Italy in 1966 to Germany\'s historic 7-1 against Brazil in 2014: these are the five most unexpected moments in World Cup history.',
      category: 'Stories',
    },
    es: {
      title: 'Los cinco mayores batacazos de la historia del Mundial',
      description: 'Desde Corea del Norte venciendo a Italia en 1966 hasta el histórico 7-1 de Alemania a Brasil en 2014: estos son los cinco momentos más inesperados de la historia del Mundial.',
      category: 'Historias',
    },
  },
  'drie-legendes-wk-2026': {
    en: {
      title: 'Messi, Ronaldo and Ochoa: three legends at their sixth World Cup',
      description: 'Three men who dominated football for two decades stand at their sixth World Championship. A historic moment we will never see again.',
      category: 'Legends',
    },
    es: {
      title: 'Messi, Ronaldo y Ochoa: tres leyendas en su sexto Mundial',
      description: 'Tres hombres que dominaron el fútbol durante dos décadas están en su sexto Campeonato del Mundo. Un momento histórico que nunca volveremos a ver.',
      category: 'Leyendas',
    },
  },
  'vs-iran-wk-2026': {
    en: {
      title: 'USA vs Iran: a rematch after 1998',
      description: 'In 1998, the USA and Iran played the most politically charged match in World Cup history. In 2026, America is the host. Can it happen again?',
      category: 'Stories',
    },
    es: {
      title: 'EE.UU. contra Irán: una revancha tras 1998',
      description: 'En 1998, EE.UU. e Irán disputaron el partido más cargado políticamente de la historia del Mundial. En 2026, América es el anfitrión. ¿Puede repetirse?',
      category: 'Historias',
    },
  },
  'mbappe-jaagt-klose': {
    en: {
      title: "Mbappé chases Klose: can he break the record?",
      description: "Miroslav Klose scored 16 times at a World Cup. Kylian Mbappé enters 2026 with 12 goals. The maths is simple. The execution is not.",
      category: 'Records',
    },
    es: {
      title: 'Mbappé persigue a Klose: ¿puede batir el récord?',
      description: 'Miroslav Klose marcó 16 goles en un Mundial. Kylian Mbappé empieza 2026 con 12 goles. La cuenta es sencilla. La ejecución, no.',
      category: 'Récords',
    },
  },
  'messi-meeste-wk-wedstrijden': {
    en: {
      title: "Messi and Matthäus's record: more World Cup matches than anyone",
      description: 'After Qatar 2022, Messi is the player with the most World Cup matches ever. In 2026, every minute he plays writes new history.',
      category: 'Records',
    },
    es: {
      title: 'Messi y el récord de Matthäus: más partidos en un Mundial que nadie',
      description: 'Tras Qatar 2022, Messi es el jugador con más partidos en Mundiales. En 2026, cada minuto que juega escribe nueva historia.',
      category: 'Récords',
    },
  },
  'yamal-euro-wk-dubbel': {
    en: {
      title: 'Yamal and the grand double: youngest ever to win Euro and World Cup',
      description: "Lamine Yamal won Euro 2024 at 16. If Spain also wins the 2026 World Cup, he'll be the youngest player ever to claim both trophies. That record is open.",
      category: 'Records',
    },
    es: {
      title: 'Yamal y el gran doblete: el más joven en ganar la Euro y el Mundial',
      description: 'Lamine Yamal ganó la Euro 2024 con 16 años. Si España también gana el Mundial 2026, será el jugador más joven en conquistar ambos trofeos. Ese récord está abierto.',
      category: 'Récords',
    },
  },
  'oudste-coach-wk-2026': {
    en: {
      title: 'Who will be the oldest coach at the 2026 World Cup?',
      description: 'Oscar Tabárez coached Uruguay at 71 at the World Cup. In 2026, there are candidates who could approach that record. A look at age and experience on the biggest stage.',
      category: 'Analysis',
    },
    es: {
      title: '¿Quién será el entrenador más veterano del Mundial 2026?',
      description: 'Óscar Tabárez dirigió a Uruguay con 71 años en un Mundial. En 2026 hay candidatos que podrían acercarse a ese récord. Una mirada a la edad y la experiencia en el mayor escenario.',
      category: 'Análisis',
    },
  },
  'courtois-clean-sheets': {
    en: {
      title: 'Courtois on the hunt: the record for most World Cup clean sheets',
      description: 'Thibaut Courtois wants to go down in World Cup history as the goalkeeper with the most clean sheets. For that he needs a long Belgian tournament run.',
      category: 'Records',
    },
    es: {
      title: 'Courtois a la caza: el récord de porterías a cero en un Mundial',
      description: 'Thibaut Courtois quiere pasar a la historia del Mundial como el portero con más porterías a cero. Para eso necesita un largo recorrido belga en el torneo.',
      category: 'Récords',
    },
  },
  'messi-vrije-trappen-rivelino': {
    en: {
      title: "Messi and the free kick: is he chasing Rivelino's record?",
      description: "Rivelino was the first great master of the free kick at a World Cup. Fifty years later, Messi stands ready to take over his legacy.",
      category: 'Records',
    },
    es: {
      title: 'Messi y el tiro libre: ¿persigue el récord de Rivelino?',
      description: 'Rivelino fue el primer gran maestro del tiro libre en un Mundial. Cincuenta años después, Messi está listo para hacerse con su legado.',
      category: 'Récords',
    },
  },
  'tim-payne-viral-wk': {
    en: {
      title: 'Tim Payne: from 4,000 to a million followers in one World Cup',
      description: 'Nobody knew him before the tournament. Now Tim Payne has more than a million Instagram followers. How the World Cup turns unknown athletes into global icons.',
      category: 'Stories',
    },
    es: {
      title: 'Tim Payne: de 4.000 a un millón de seguidores en un Mundial',
      description: 'Nadie lo conocía antes del torneo. Ahora Tim Payne tiene más de un millón de seguidores en Instagram. Cómo el Mundial convierte a atletas desconocidos en iconos mundiales.',
      category: 'Historias',
    },
  },
};

export function getLocalizedBlogMeta(
  slug: string,
  lang: string,
): { title: string; description: string; category: string } | null {
  const translations = BLOG_TRANSLATIONS[slug];
  if (!translations) return null;
  if (lang === 'en') return translations.en;
  if (lang === 'es') return translations.es;
  return null;
}
