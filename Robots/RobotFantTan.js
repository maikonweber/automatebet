const puppeteer = require("puppeteer-extra");
const redis = require("redis");
const cheerio = require("cheerio");
const sharp = require("sharp");
const T = require("tesseract.js");
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const { Touchscreen } = require("puppeteer");
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
     this.getSygnal()
  
  }

  async getSygnal() {
    console.log('Aguardando Sinal');
    // Get all content of html
    const content = await this.page.content();
    // Get all frames of page
    const frames = await this.page.frames();
    const frame = frames[1].url();
    await this.page.goto(frame);
    await this.page.waitForTimeout(15000) //https://casino.bet365.com/Play/en-gb/


    let TopElement = await this.page.$('.top-container--281fe');
    let BottonmElement = await this.page.$('.bottom-game-overlay--e714e');
    console.log(TopElement, BottonmElement)

    // Select all canvas of page and get a screenshot for each one
    const canvas = await this.page.$$('canvas');
      // For LOOP
      for (let i = 0; i < canvas.length; i++) {
          console.log(canvas[3])
         
        }

    let result = await this.page.evaluate(async (el) => {
        let canvas = document.querySelectorAll('canvas');
        // for loop to get the canvas
        canvas[3].getBoundingClientRect();
        let canvasWidth = canvas[3].getBoundingClientRect().width;
        let canvasHeight = canvas[3].getBoundingClientRect().height;
      
        return { width :canvasWidth, heigth : canvasHeight}
    
      });

      console.log(result)
      await this.page.mouse(
      {
        x: result.width - 1020,
        y: result.heigth - 880
      })
     
    

      
  
    await this.page.screenshot({path: './screenshot.png'});

  
    
    
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
    await this.page.goto(`https://br.betano.com/casino/live/games/fan-tan/4281/tables/`)
    await this.page.waitForTimeout(15000) //https://casino.bet365.com/Play/en-gb/
      
  

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
    console.log('Aguardando Login');
    // get all frames of page
    const frames = await this.page.frames();
    const frame = frames[1].url();
    await this.page.goto(frame);
    await this.page.waitForTimeout(15000) //https://casino.bet365.com/Play/en-gb/
    let bird = await this.page.$$('#username')
    let elefant = await this.page.$$('#password') 
    console.log(bird, elefant)
    
    if (bird[0] && elefant[0]) {
      await bird[0].type(this.username);
      await elefant[0].type(this.password);
      // enter the page
      await this.page.waitForTimeout(5000);
      await this.page.keyboard.press('Enter');
    //   await this.page.waitForTimeout(20000);
    // //   const button = await this.page.$('.regulatory-last-login-modal__button');
    //   if (button) {
    //     await button.click();
    //   }
      await this.page.waitForTimeout(8000);

    }
      await this.page.waitForTimeout(15000);
      await this.page.goto(`https://br.betano.com/casino/live/games/fan-tan/4281/tables/`)
      await this.getSygnal();
    }


  async antiIndle( ) {
      await this.page.waitForTimeout(15000) //https://casino.bet365.com/Play/en-gb/
          
  }
}

const bot = new RoulleteBot("ma128sio4", "maikonweber", 'LiveRoulette');
bot.init();