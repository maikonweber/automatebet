const puppeteer = require("puppeteer");
const redis = require("redis");

class RoulleteBot {
    constructor(password, username) {
      this.password = password;
      this.username = username;
      this.browser = null;
      this.page = null;
      this.RoulletLastNumber = [],
      this.balance = 0;
      this.round = null;
    
    } 

    async init() {
      await this.subscribe();
      await this.preLoad();
      await this.login();


  }

  async preLoad() {
    const browser = await puppeteer.launch({
      userDataDir : './userData', 
      headless: false,
      defaultViewport: {
        width: 920,
        height: 580
      },
      args: [
        '--disable-web-security',
        '--disable-features=IsolateOrigins,site-per-process',
          '--disable-extensions',
          "--window-size=920,680",
          "--window-position=500,0",

      ],  
      devTools: true, 
        
    });
    this.browser = browser;
    const page = await browser.newPage();
    this.page = page;

  }


  async subscribe() {
    const client = redis.createClient({
      host: 'localhost',
      port: 6379,
      password: "roullet" 
    });
  
    const subscriber = client.duplicate();
  
    await subscriber.connect();
  
      await subscriber.subscribe('roulletsEvents', (message) => {
      console.log(message); // 'message'
      });
  }

  async login() {
    const element_ = await page.$('#username');
    const elementPass_ = await page.$('#password');
    if (element_ && elementPass_) {
        // Send keys to the element
        await element_.type(this.username);
        await elementPass_.type(this.password);
        await page.keyboard.press('Enter');
        await page.waitForNavigation({waitUntil: 'networkidle0'});
    }
    else {
        console.log('Ocorreu um erro ao logar no site');    
    }
    
    return page;
    
  }



}




const bot = new RoulleteBot("ma128sio4", "maakonweber1");
bot.init();

