const puppeteer = require("puppeteer");
const Redis = require("ioredis");
const axios = require('axios'); 


class scrapperFootScrapper {
    constructor(url, username, password) {
        this.url  = this.url
        this.username = username
        this.password = password
        }

    
    async init () {
        const browser = await puppeteer.launch({
            headless: false,
             defaultViewport: {
               width: 1100,
               height: 1280
             },
             SlowMo: 50,
             args: [
               "--no-sandbox",
               "--window-position=0,0",
               '--disable-extensions',
             ],  
           });

           this.browser = browser
           this.page =  await browser.newPage()
    }
}



module.exports = scrapperFootScrapper