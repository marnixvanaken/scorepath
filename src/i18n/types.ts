export interface Messages {
  header: {
    title: string;
    subtitle: string;
    share: string;
    reset: string;
    prefill: string;
    prefillKnockout: string;
    copied: string;
    liveLoading: string;
    liveError: string;
    liveRefresh: string;
    groupPhase: string;
    knockout: string;
    viewLabel: string;
    moreOptions: string;
    backToHome: string;
  };
  modes: {
    exact: string;
    winner: string;
    drag: string;
  };
  table: {
    club: string;
    played: string;
    won: string;
    drawn: string;
    lost: string;
    gf: string;
    ga: string;
    gd: string;
    points: string;
    playedFull: string;
    wonFull: string;
    lostFull: string;
    gdFull: string;
    pointsFull: string;
    goalsLabel: string;
  };
  status: {
    qualified: string;
    maybeQualified: string;
    eliminated: string;
    confirmed: string;
  };
  thirds: {
    title: string;
    subtitle: string;
    group: string;
    groupAbbr: string;
    qualified: string;
    notQualified: string;
    dragNote: string;
    boundaryTie: string;
    through: string;
    out: string;
    best8: string;
    cutoff: string;
    tiebreakNote: string;
  };
  match: {
    vs: string;
    home: string;
    away: string;
    win: string;
    draw: string;
    loss: string;
  };
  group: string;
  tiebreak: {
    title: string;
    affectsThirds: string;
    affectsBracket: string;
    clear: string;
    up: string;
    down: string;
    positions: string[];
    positionPrefix: string;
    positionSuffix: string;
  };
  emptyState: {
    title: string;
    description: string;
  };
  theme: {
    toLight: string;
    toDark: string;
  };
  teamPicker: {
    myCard: string;
    chooseCountry: string;
    searchPlaceholder: string;
    noTeamFound: string;
  };
  card: {
    back: string;
    downloadFailed: string;
    linkCopied: string;
    downloadRouteCard: string;
    downloadBracket: string;
    shareLink: string;
  };
  home: {
    tagline1: string;
    tagline2: string;
    description: string;
    openSimulator: string;
    step01Label: string;
    step01Sub: string;
    step02Label: string;
    step02Sub: string;
    step03Label: string;
    step03Sub: string;
    birthplaceTitle: string;
    birthplaceDesc: string;
    openBirthplace: string;
    birthplaceEyebrow: string;
    wcEyebrow: string;
    wcTitle: string;
    wcDesc: string;
    uclEyebrow: string;
    uclTitle: string;
    uclDesc: string;
    openUcl: string;
  };
  start: {
    step1Label: string;
    chooseTournament: string;
    wc2026Name: string;
    wc2026Sub: string;
    select: string;
    comingSoon: string;
    step2Label: string;
    howToFill: string;
    quickTitle: string;
    quickDesc: string;
    exactTitle: string;
    exactDesc: string;
    switchNote: string;
    backTournament: string;
    stepOf: string;
  };
  blog: {
    back: string;
    readTime: string;
    publishedOn: string;
    allArticles: string;
    youMightAlsoLike: string;
    readArticle: string;
    pageTitle: string;
    pageDescription: string;
    footerText: string;
    openSimulator: string;
    minRead: string;
  };
  nav: {
    blog: string;
    privacy: string;
    simulator: string;
    about: string;
    birthplace: string;
    ucl: string;
  };
  privacy: {
    pageTitle: string;
    pageDescription: string;
  };
  about: {
    pageTitle: string;
    pageDescription: string;
    intro: string;
    howTitle: string;
    how: string;
    whyTitle: string;
    why: string;
    accuracyTitle: string;
    accuracy: string;
    editorialTitle: string;
    editorial: string;
    contactTitle: string;
    contact: string;
  };
  simulator: {
    modeLabel: string;
    inputModeLabel: string;
    dragHint: string;
    dragClickOrder: string;
    confirmTitle: string;
    cancel: string;
    clear: string;
    knockoutPhase: string;
    knockoutHint: string;
    prefillAutomatic: string;
    resetClearsAll: string;
  };
  bracket: {
    r32: string;
    r16: string;
    qf: string;
    sf: string;
    final: string;
    myCard: string;
    shareLink: string;
    timezoneLabel: string;
  };
  cookie: {
    text: string;
    accept: string;
    decline: string;
    privacyLabel: string;
  };
  modal: {
    groupComplete: string;
    groupCompleteDesc: string;
    knockoutComplete: string;
    knockoutCompleteDesc: string;
    toKnockout: string;
    toCard: string;
    back: string;
    close: string;
  };
  birthplace: {
    title: string;
    subtitle: string;
    inputLabel: string;
    inputPlaceholder: string;
    searching: string;
    noResults: string;
    nearest: string;
    top5: string;
    distanceKm: string;
    showTop5: string;
    hideTop5: string;
    posGK: string;
    posDF: string;
    posMF: string;
    posFW: string;
    emptyHint: string;
    error: string;
    loadingMap: string;
    myCard: string;
    downloadCard: string;
    cardTagline: string;
    cardTitle: string;
    bornIn: string;
    osmAttrib: string;
    cardBirthplace: string;
    cardDistance: string;
    cardTeam: string;
    cardPosition: string;
    mapLabel: string;
  };
  ogCard: {
    /** Gedeelde footer onderaan elke gegenereerde kaart. */
    footer: string;
    wc: {
      /** Header-merkregel, bijv. "WK 2026". */
      header: string;
      /** Grote uitkomstlabel onder de teamnaam. */
      result: {
        champion: string;
        final: string;
        sf: string;
        qf: string;
        r16: string;
        r32: string;
        group: string;
      };
      /** Korte ronde-labels in de routerijen. */
      round: {
        group: string;
        r32: string;
        r16: string;
        qf: string;
        sf: string;
        final: string;
      };
      /** Kwalificatie-ondertitel, met {group} placeholder voor de groepsletter. */
      qualified: {
        winner: string;
        runnerUp: string;
        third: string;
      };
    };
    bracket: {
      header: string;
      subtitle: string;
      round: {
        r32: string;
        r16: string;
        qf: string;
        sf: string;
        final: string;
      };
    };
    ucl: {
      champion: string;
      round: {
        q1: string;
        q2: string;
        q3: string;
        po: string;
        lp: string;
        kopo: string;
        r16: string;
        qf: string;
        sf: string;
        final: string;
      };
    };
  };
}
