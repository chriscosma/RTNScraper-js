# rtnscraper
This module helps scrape the roadtonationals.com API.

## Getting Started
    const rtnscraper = require('rtnscraper');
    
	let scraper = new rtnscraper.Scraper();
	
	let men = rtnscraper.Constants.ScraperConstants.Men;
	
	scraper.getSeasonWeeks(men, 2021, data => {
		console.log(data);
	});

	scraper.getRoster(men, 2021, 1, roster => {
	    console.log(roster);
	});

## Documentation
See https://github.com/chriscosma/RTNScraper for a similar module.
Also see Scraper.js