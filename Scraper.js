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
        let chunks = []
        const req = https.request(this.options(path), res => {
            res.on('data', d => {
                chunks.push(d);
            }).on('end', () => {
                let data = Buffer.concat(chunks);
                callback(JSON.parse(data));
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

    getCurrentSeasonAndWeek(sex, year) {
        var self = this;
        return new Promise(function(resolve, reject) {
            try {
                self.validateSex(sex);
                self.validateYear(sex, year);
                self.sendRequest(paths.getCurrentSeasonAndWeekPath(sex, year), data => {
                    resolve(data);
                });
            } catch (err) {
                reject(err);
            }
        });
    }

    getFinalResults(sex, year) {
        var self = this;
        return new Promise(function(resolve, reject) {
            try {
                self.validateSex(sex);
                self.validateYear(sex, year);
                self.sendRequest(paths.getFinalResultsPath(sex, year), data => {
                    resolve(data);
                });
            } catch (err) {
                reject(err);
            }
        });
    }

    getResults(sex, year, weekNumber, teamOrIndividual, event) {
        var self = this;
        return new Promise(function(resolve, reject) {
            try {
                self.validateSex(sex);
                self.validateYear(sex, year);
                self.validateEvent(event);
                self.sendRequest(paths.getResultsPath(sex, year, weekNumber, teamOrIndividual, event), data => {
                    resolve(data);
                });
            } catch (e) {
                reject(e);
            }
        });
    }

    getRoster(sex, year, teamId) {
        var self = this;
        return new Promise(function(resolve, reject) {
            try {
                self.validateSex(sex);
                self.validateYear(sex, year);
                self.sendRequest(paths.getRosterPath(sex, year, teamId), data => {
                    resolve(data);
                });
            } catch (err) {
                reject(err);
            }
        });
    }

    getGymnastMeetResults(sex, year, gymnastId) {
        var self = this;
        return new Promise(function(resolve, reject) {
            try {
                self.validateSex(sex);
                self.validateYear(sex, year);
                self.sendRequest(paths.getGymnastMeetResultsPath(sex, year, gymnastId), data => {
                    resolve(data);
                });
            } catch (err) {
                reject(err);
            }
        });
    }

    getMeetResults(sex, meetId) {
        var self = this;
        return new Promise(function(resolve, reject) {
            try {
                self.validateSex(sex);
                self.sendRequest(paths.getMeetResultsPath(sex, meetId), data => {
                    resolve(data);
                });
            } catch (err) {
                reject(err);
            }
        });
    }

    getSeasonWeeks(sex, year) {
        var self = this;
        return new Promise(function(resolve, reject) {
            try {
                self.validateSex(sex);
                self.validateYear(sex, year);
                self.sendRequest(paths.getSeasonWeeksPath(sex, year), data => {
                    resolve(data);
                });
            } catch (err) {
                reject(err);
            }
        });
    }

    getSchedule(sex, date) {
        var self = this;
        return new Promise(function(resolve, reject) {
            try {
                self.validateSex(sex);
                self.sendRequest(paths.getSchedulePath(sex, date), data => {
                    resolve(data);
                });
            } catch (err) {
                reject(err);
            }
        });
    }

    getTeamList(sex, year) {
        var self = this;
        return new Promise(function(resolve, reject) {
            try {
                self.validateSex(sex);
                self.validateYear(sex, year);
                self.sendRequest(paths.getTeamListPath(sex, year), data => {
                    resolve(data);
                });
            } catch (err) {
                reject(err);
            }
        });
    }
}

class Scraper extends ScraperKernel {
    constructor() {
        super();
    }
}

module.exports = Scraper;