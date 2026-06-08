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
  };
  privacy: {
    pageTitle: string;
    pageDescription: string;
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
}
