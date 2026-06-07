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
    qualified: string;
    notQualified: string;
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
}

export const NL: Messages = {
  header: {
    title: 'WK 2026 Simulator',
    subtitle: 'Vul de groepsuitslagen in en zie live wie doorgaat',
    share: 'DEEL LINK',
    reset: 'Reset',
    prefill: 'Vul alles in',
    prefillKnockout: 'Simuleer',
    copied: 'Link gekopieerd!',
    liveLoading: 'Live data laden...',
    liveError: 'Live data niet beschikbaar',
    liveRefresh: 'Ververs',
  },
  modes: {
    exact: 'Exact',
    winner: '1X2',
    drag: 'Sleep',
  },
  table: {
    club: 'Team',
    played: 'P',
    won: 'W',
    drawn: 'G',
    lost: 'V',
    gf: 'DV',
    ga: 'DT',
    gd: '+/-',
    points: 'Ptn',
  },
  status: {
    qualified: 'Door',
    maybeQualified: 'Misschien',
    eliminated: 'Uitgeschakeld',
  },
  thirds: {
    title: 'Beste nummers 3',
    subtitle: 'De 8 beste nummers 3 gaan door naar de Round of 32',
    group: 'Groep',
    qualified: 'Gekwalificeerd',
    notQualified: 'Niet door',
  },
  match: {
    vs: 'vs',
    home: 'Thuis',
    away: 'Uit',
    win: 'W',
    draw: 'G',
    loss: 'V',
  },
  group: 'Groep',
};
