const puppeteer = require("puppeteer-extra");
const cheerio = require("cheerio");
const sharp = require("sharp");
const T = require("tesseract.js");
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());


class RoulleteBot {
    constructor(password, username, room) {
      this.password = password;
      this.username = username;
      this.browser = null;
      this.page = null;
      this.RoulletLastNumber = [],
      this.balance = 0;
      this.round = null;
      this.room = room;
    } 

    async init() {
    
     await this.preLoad();
     


  }

  async getSygnal() {
    console.log('Aguardando Sinal');
    this.page.goto('https://dl-com.c365play.com/live_desktop/');
    this.page.waitForTimeout(5000);
    const frames = await this.page.frames();
  
}



  async preLoad() {
    const browser = await puppeteer.launch({
      headless: false,
      dumpio: true,
      defaultViewport: {
        width: 1100,
        height: 980
      },
      args: [
        '--no-sandbox',
        '--disable-web-security',
        '--disable-features=IsolateOrigins,site-per-process',
        '--disable-extensions',
        "--window-size=1110,980",
        "--window-position=500,0",


      ],  
      devTools: true, 
        
    });
    this.browser = browser;
    const page = await this.browser.newPage();
    this.page = page
    console.log('Abrindo a página');
    await this.page.goto(`https://casino.bet365.com/Play/${this.room}`)
    await this.page.waitForTimeout(15000) //https://casino.bet365.com/Play/en-gb/
   
  

}

  async publisher(message) {
    
    
  
  
  }

  async login() {
    const username = await this.page.waitForSelector('#txtUsername');
    const password = await this.page.waitForSelector('#txtPassword');
    if (username && password) {
      // Clean username
       // Clear the input field
      // await username.type('\u0008');
      await username.type(this.username);
      await password.type(this.password);
      // enter the page
      await this.page.waitForTimeout(5000);
      await this.page.keyboard.press('Enter');
      await this.page.waitForTimeout(15000);

      if (button) {
        await button.click();
      }
      await this.page.evaluate(() => {
        const root = document.querySelector('#root');
        console.log(root)

        
      })
    


      await this.page.waitForTimeout(8000);
    }
  }

  async antiIndle( ) {
      await this.page.waitForTimeout(15000) //https://casino.bet365.com/Play/en-gb/
          
  }
}

const bot = new RoulleteBot("ma128sio4", "maikonwdc2", 'LiveRoulette');
bot.init();

bot.init();
