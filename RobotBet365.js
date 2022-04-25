const puppeteer = require("puppeteer");
const redis = require("redis");
const cheerio = require("cheerio");
const sharp = require("sharp");
const T = require("tesseract.js");
const { data } = require("cheerio/lib/api/attributes");



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
    await frames[2].$$('#root')

  

     
   
//  await this.antiIndle(this.page);
    const container = await this.page.$$('.inline-games-page-component__iframe-container')
    console.log(container);   
    await this.antiIndle();    
  // const element = await this.page.$$('div');  
    // element.forEach(
    //   async (element, index) => {
    //     // get the text of element
    //     const text = await element.getProperty('textContent');
    //     const textContent = await text.jsonValue();
    //     // console.log(textContent);
      
    //   })  
     
      //  // get scheenshoot bodyHandle
        
  }
    //  


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
    await this.page.waitForTimeout(8000) //https://casino.bet365.com/Play/en-gb/
    // await this.login();
  

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
    setInterval((async () => {
      await this.page.goto(`https://casino.bet365.com/Play/${this.room}`)
      await this.page.waitForTimeout(15000) //https://casino.bet365.com/Play/en-gb/
      setInterval(async () => {
      const container = await this.page.waitForSelector('.inline-games-page-component__iframe-container')
      let scheenshoot = container[0].screenshot();
      sharp(scheenshoot)
        .resize(1020, 880)
        .extract({ left: 880, top: 980, width: 220, height: 30 })
        .toFile('new.png');
      }, 15000)
    }), 75000);
  }


}






const bot = new RoulleteBot("ma128sio4", "maikonwdc2", 'LiveRoulette');
bot.init();

