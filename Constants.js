const ScraperConstants = {
    Team: 0,
    Individual: 1,
    Men: 'men',
    Women: 'women',
    EarliestMensYear: 2012,
    EarliestWomensYear: 1998
};

const MensEvents = {
    FloorExercise: 1,
    PommelHorse: 2,
    StillRings: 3,
    Vault: 4,
    ParallelBars: 5,
    HighBar: 6,
    AllAround: 7
};

const WomensEvents = {
    Vault: 1,
    UnevenBars: 2,
    BalanceBeam: 3,
    FloorExercise: 4,
    AllAround: 5
};

module.exports = {
    ScraperConstants: ScraperConstants,
    MensEvents: MensEvents,
    WomensEvents: WomensEvents
};