const puppeteer = require("puppeteer-extra");
const redis = require("redis");
const cheerio = require("cheerio");
const sharp = require("sharp");
const T = require("tesseract.js");
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const { data } = require("cheerio/lib/api/attributes");
const { Logger } = require("selenium-webdriver/lib/logging");
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
    this.page.waitForTimeout(5000);
    const frames = await this.page.frames();
    // get frame content of frame[2]
 
  
    setInterval(async () => {
    const screenshot = await this.page.screenshot();
    sharp(screenshot)
    .resize(1100, 980)
    .extract({
      width: 250,
      height: 40,
      left: 770,
      top: 740
    })
    // convert background image to gray
    .greyscale()
    // remove noise
    // threshold the image
    .threshold(0)
    .toFile(`crop${this.room}.png`)
      .then((image) => { 
        T.recognize(`crop${this.room}.png`, 'eng', {
          tessedit_char_whitelist: '0123456789',
          tessedit_pageseg_mode: '1',
          tessedit_ocr_engine_mode: '1',
          tessedit_image_dpi: '300',
          tessedit_char_blacklist: '',  
        
        }).then(({ data: { text } }) => {
          console.log(parseInt(text)); // converting string to number
        
      })
    })
    
  }, 10000);

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
      await username.type(this.username);
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

