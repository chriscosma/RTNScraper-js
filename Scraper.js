const https = require('https');
const constants = require('./Constants');
const paths = require('./Paths');

class ScraperKernel {
    constructor() {
    }

    options(path) {
        return {
            hostname: paths.getBaseURL(),
            port: 443,
            path: path,
            method: 'GET'
        }
    }

    sendRequest(path, callback) {
        const req = https.request(this.options(path), res => {
            res.on('data', d => {
                callback(JSON.parse(d.toString()));
            });
        });

        req.on('error', error => {
            console.error(error);
        });

        req.end();
    }

    validateSex(sex) {
        if (sex != constants.ScraperConstants.Men && sex != constants.ScraperConstants.Women) {
            throw `Invalid sex "${sex}"`;
        }
    }

    validateYear(sex, year) {
        if (sex == constants.ScraperConstants.Men && year < constants.ScraperConstants.EarliestMensYear) {
            throw `Year "${year}" is before earliest men\'s year`;
        } else if (sex == constants.ScraperConstants.Women && year < constants.ScraperConstants.EarliestWomensYear) {
            throw `Year "${year}" is before earliest women\'s year`;
        }
    }

    validateEvent(sex, event) {
         if (sex == constants.ScraperConstants.Men && (event < 1 || event > 7)) {
            throw 'Invalid men\'s event';
        } else if (sex == constants.ScraperConstants.Women && (event < 1 || event > 5)) {
            throw 'Invalid women\'s event';
        }
    }

    getCurrentSeasonAndWeek(sex, year, callback) {
        try {
            this.validateSex(sex);
            this.validateYear(sex, year);
            this.sendRequest(paths.getCurrentSeasonAndWeekPath(sex, year), data => callback(data));
        } catch (e) {
            console.error(e);
        }
    }

    getFinalResults(sex, year, callback) {
        try {
            this.validateSex(sex);
            this.validateYear(sex, year);
            this.sendRequest(paths.getFinalResultsPath(sex, year), data => callback(data));
        } catch (e) {
            console.error(e);
        }
    }

    getResults(sex, year, weekNumber, teamOrIndividual, event, callback) {
        try {
            this.validateSex(sex);
            this.validateYear(sex, year);
            this.validateEvent(event);
            this.sendRequest(paths.getResultsPath(sex, year, weekNumber, teamOrIndividual, event), data => callback(data));
        } catch (e) {
            console.error(e);
        }
    }

    getRoster(sex, year, teamId, callback) {
        try {
            this.validateSex(sex);
            this.validateYear(sex, year);
            this.sendRequest(paths.getRosterPath(sex, year, teamId), data => callback(data));
        } catch (e) {
            console.error(e);
        }
    }

    getGymnastMeetResults(sex, year, gymnastId, callback) {
        try {
            this.validateSex(sex);
            this.validateYear(sex, year);
            this.sendRequest(paths.getGymnastMeetResultsPath(sex, year, gymnastId), data => callback(data));
        } catch (e) {
            console.error(e);
        }
    }

    getMeetResults(sex, meetId, callback) {
        try {
            this.validateSex(sex);
            this.sendRequest(paths.getMeetResultsPath(sex, meetId), data => callback(data));
        } catch (e) {
            console.error(e);
        }
    }

    getSeasonWeeks(sex, year, callback) {
        try {
            this.validateSex(sex);
            this.validateYear(sex, year);
            this.sendRequest(paths.getSeasonWeeksPath(sex, year), data => callback(data));
        } catch (e) {
            console.error(e);
        }
    }

    getSchedule(sex, data, callback) {
        try {
            this.validateSex(sex);
            this.sendRequest(paths.getSchedulePath(sex, data), data => callback(data));
        } catch (e) {
            console.error(e);
        }
    }

    getTeamList(sex, year, callback) {
        try {
            this.validateSex(sex);
            this.validateYear(sex, year);
            this.sendRequest(paths.getTeamListPath(sex, year), data => callback(data));
        } catch (e) {
            console.error(e);
        }
    }
}

class Scraper extends ScraperKernel {
    constructor() {
        super();
    }
}

module.exports = Scraper;