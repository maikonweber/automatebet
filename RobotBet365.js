const puppeteer = require("puppeteer");
const redis = require("redis");
const cheerio = require("cheerio");
const sharp = require("sharp");


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
    const l = await frames[2].url();
    this.browser.newPage().then(async (page) => {
        await page.goto(l, {waitUntil: 'networkidle0'});
        await page.waitForTimeout(25000);
          console.log('|Console');
        await page.on('console', msg => console.log('PAGE LOG:', msg.text()));
        

        // Get body of page
         const bodyHandle = await page.$$('#gamecontainer')
         const frame = await page.$$('#gamecontent')
       
        
       // get scheenshoot bodyHandle
        setInterval(async () => {
       let screenshot = await bodyHandle[0].screenshot()
        console.log(screenshot)
          sharp(screenshot)
          .resize(920, 580)
          .extract({ 
            left: 655, 
            top: 500, 
            width: 250, 
            height: 27 })
          .toFile('crop.png')
          .then(() => { 
            console.log('Imagem Cropada');
          })
          
        }, 8000);

      });
   
    //  

  }

  async preLoad() {
    const browser = await puppeteer.launch({
      userDataDir: './userData',
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
    const page = await this.browser.newPage();
    this.page = page
    console.log('Abrindo a página');
    await this.page.goto(`https://casino.bet365.com/Play/${this.room}`)
    await this.page.waitForTimeout(8000) //https://casino.bet365.com/Play/en-gb/
//     // get all frame
//     const frames = await this.page.frames();
//     const l = await frames[2].url();
//     this.browser.newPage().then(async (page) => {
//       await page.goto(l, {waitUntil: 'networkidle0'});
//       await page.waitForTimeout(25000);
//       // Get body of page
//       const bodyHandle = await page.$$('div');
//       await page.waitForTimeout(25000);
//       const frame = page.frames()
//       // get text of body
//       await frame.forEach(async element => {
//           element.url().then(async (url) => {
//             this.browser.newPage().then(async (page) => {
//                 page.goto(url, {waitUntil: 'networkidle0'});
//             });
//       });
//     });
//       const element_ = await bodyHandle[0].getProperty('innerText');
//       const element_text = await element_.jsonValue();
//   });
// }

    // const username = await this.page.waitForSelector('#txtUsername');
    // const password = await this.page.waitForSelector('#txtPassword');
    // if (username && password) {
    //   // send keys to the element

    //   // await username.type(this.username);
    //   await password.type(this.password);
    //   // enter the page
    //   await this.page.waitForTimeout(5000);
    //   await this.page.keyboard.press('Enter');
    //   await this.page.waitForTimeout(20000);
    //   const button = await page.$('.regulatory-last-login-modal__button');
    //   if (button) {
    //     await button.click();
    //   }
    //   await this.page.waitForTimeout(8000);

    // }

    //   await page.waitForTimeout(20000);
  // }

  // }


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
    const element_ = await this.page.$('#txtusername');
    const elementPass_ = await this.page.$('#txtPassword');
    if (element_ && elementPass_) {
        // Send keys to the element
        // await element_.type(this.username);
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




const bot = new RoulleteBot("ma128sio4", "maikonweber", 'LiveRoulette');
bot.init();

