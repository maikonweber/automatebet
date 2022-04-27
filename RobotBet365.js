const puppeteer = require("puppeteer-extra");
const redis = require("redis");
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
    console.log('Abrindo Pagina');
     await this.preLoad();
     console.log('Aguardando o sinal');
     await this.getSygnal();


  }

  async getSygnal() {
    console.log('Aguardando Sinal');
    // get frames of page
    this.page.waitForTimeout(35000);
    const frames = await this.page.frames();
    console.log(await frames[2].$$('#root'));
    const container = await this.page.$$('.inline-games-page-component__iframe-container')
    console.log(container);   
    let screenshot = await container[0].screenshot()
    console.log(screenshot);
      sharp(screenshot)
      .resize(1020, 880)
      .extract({
        left: 800,
        top: 200,
        width: 400,
        height: 20
      })
      .toFile('screenshot.png');
    T.recognize('screenshot.png', {
        lang: 'eng',
        tessedit_char_whitelist: '0123456789',
    }).then(({ data }) => {
      console.log(data.text, typeof data.text);
      console.log(Number(data.text), parseInt(data.text));
      let convertedNumber = [...data.text].map((num) => Number(num));
      console.log(convertedNumber);
    });

  }


  async preLoad() {
    const browser = await puppeteer.launch({
      userDataDir: './userData2',
      headless: false,
      dumpio: true,
      defaultViewport: {
        width: 1020,
        height: 880
      },
      args: [
        '--no-sandbox',
        '--disable-web-security',
        '--disable-features=IsolateOrigins,site-per-process',
          '--disable-extensions',
          "--window-size=1020,880",
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
    await this.login();
  

}

  async publisher(message) {

    const publish = redis.createClient({
      host: 'localhost',
      port: 6379,
      password: "roullet" 
    });
  
    
    await publish.connect();
    await publish.publish('bet365events',message);
  }

  async login() {
    const username = await this.page.waitForSelector('#txtUsername');
    const password = await this.page.waitForSelector('#txtPassword');
    if (username && password) {
      // await username.type(this.username);
      await password.type(this.password);
      // enter the page
      await this.page.waitForTimeout(5000);
      await this.page.keyboard.press('Enter');
      await this.page.waitForTimeout(20000);
      const button = await this.page.$('.regulatory-last-login-modal__button');
      if (button) {
        await button.click();
      }
      await this.page.waitForTimeout(8000);

    }
      await this.page.waitForTimeout(15000);
  }

  async antiIndle( ) {
      await this.page.waitForTimeout(15000) //https://casino.bet365.com/Play/en-gb/
          
  }
}

const bot = new RoulleteBot("ma128sio4", "maikonwdc2", 'LiveRoulette');
bot.init();

