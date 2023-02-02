module.exports = {
    getBaseURL: () => "roadtonationals.com",
    getCurrentSeasonAndWeekPath: (sex, year) => `/api/${sex}/currentweek/${year}`,
    getFinalResultsPath: (sex, year) => `/api/${sex}/finalresults/${year}`,
    getResultsPath: (sex, year, weekNumber, teamOrIndividual, event) => `/api/${sex}/results/${year}/${weekNumber}/${teamOrIndividual}/${event}`,
    getRosterPath: (sex, year, teamId) => `/api/${sex}/rostermain/${year}/${teamId}/1`,
    getGymnastMeetResultsPath: (sex, year, gymnastId) => `/api/${sex}/gymnast/${year}/${gymnastId}`,
    getMeetResultsPath: (sex, meetId) => `/api/${sex}/meetresults/${meetId}`,
    getSeasonWeeksPath: (sex, year) => `/api/${sex}/yearweeks/${year}`,
    getSchedulePath: (sex, date, ncaaOrGymact) => `/api/${sex}/schedulesplit/${date}/0/${ncaaOrGymact}`,
    getTeamListPath: (sex, year) => `/api/${sex}/gymnasts2/${year}/0`
};