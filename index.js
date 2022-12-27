const scrapperRobot = require('./classScrapper.js');
const Redis = require("ioredis");
const redis = new Redis();
const scrapperFootScrapper = require('./classFootScrapper.js')

const scrapper = new scrapperRobot('maikonweber4', 'ma128sio4', redis);
const scrapperFoot = new scrapperFootScrapper('https://footystats.org/brazil/serie-a')

const fuc = async () => {
    // await scrapperFoot.init();
    await scrapperFoot.init()
    await scrapperFoot.scrappingFoot('Paulista');
}

Promise.all([fuc()])