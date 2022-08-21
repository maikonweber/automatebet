const scrapperRobot = require('./classScrapper.js');

const scrapper = new scrapperRobot('maikonweber4', 'ma128sio4');

scrapper.init().then(() => {;


}).catch(err => {
}).finally(() => {
    scrapper.login().then(() => {

    scrapper.initRoleta();
    scrapper.getCards();
    scrapper.getSport();
    })
})