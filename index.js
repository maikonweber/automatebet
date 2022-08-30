const scrapperRobot = require('./classScrapper.js');
const Redis = require("ioredis");
const redis = new Redis();
const scrapperFootScrapper = require('./classFootScrapper.js')

const scrapper = new scrapperRobot('maikonweber4', 'ma128sio4', redis);
const scrapperFoot = new scrapperFootScrapper('https://footystats.org/brazil/serie-a')

scrapper.init().then(() => {;


}).catch(err => {
}).finally(() => {
    scrapper.login().then(() => {  
    scrapper.initRoleta();
    scrapperFoot.init().then(() => { 
        
    // scrapperFoot.scrappingFoot('Brasileiro')

    
    // scrapper.getCards();
    })
    //
    })
})