const constants = require('./Constants');
const Scraper = require('./Scraper');

let s = new Scraper();
s.getCurrentSeasonAndWeek(constants.ScraperConstants.Men, 2021, data => {
    console.log(data);
}); 

// s.getFinalResults(constants.ScraperConstants.Men, 2020, data => {
//     console.log(data);
// });