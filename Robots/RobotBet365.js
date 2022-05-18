const puppeteer = require("puppeteer-extra");
const cheerio = require("cheerio");
const sharp = require("sharp");
const T = require("tesseract.js");
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());
var amqp = require('amqplib/callback_api');


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
    this.page.goto('https://dl-com.c365play.com/live_desktop/');
    this.page.waitForTimeout(45000);

    setInterval(async () => {
    // const orange = await this.page.evaluate(() => {
    //   let menuIcon = document.querySelectorAll('lobby-category-item__icon_dynamic')[0];
    //   console.log(menuIcon);
    //   let menuIconRoullete = document.querySelectorAll('lobby-category-item__icon')[0].click();
    //   console.log(menuIconRoullete);
      await this.page.reload();
      await this.page.waitForTimeout(5000);

    // });



    const glee = await this.page.evaluate(() => {
        let dophin = document.querySelectorAll('.roulette-historyfOmuwAaXbwHRa3HTIjFP.roulette-history_lobbyDxuTPpg3FmAO6mbqrAe7');
        const glee = []
        let elefant = document.querySelectorAll('.lobby-table__name-container')
        // Mouse over of all elements
        elefant.forEach(element => {
          element.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
        });

        for (let i = 0; i < dophin.length; i++) {
           // Get all text nodes
            glee.push({
                name: elefant[i].innerText,
                number: dophin[i].innerText
            });
        }
        return glee;
      });
      for (let i = 0; i < glee.length; i++) {
        // Split \n line into array
        let number = glee[i].number.split('\n');
        for (let i = 0; i < number.length; i++) {
          // Replace if number is have a  regEx  x[0-9]* in string 
          let regEx = /x[0-9]*/g;
          for (let i = 0; i < number.length; i++) {
              if (number[i].match(regEx)) {
                  number[i] = number[i].replace(regEx, '');
              }
          }
      }
      // removing of array the empty string
      number = number.filter(Boolean);
      for (let i = 0; i < number.length; i++) {
         // parse to int
           number[i] = parseInt(number[i]); 
      }
      glee[i].number = number;
      // transforme of into string
    
      };

      this.publisher(glee)

      


    }, 11000);
 
  
}



  async preLoad() {
    const browser = await puppeteer.launch({
      headless: false,
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
    const page = await browser.newPage();
    this.page = page
    await this.page.goto(`https://casino.bet365.com/Play/${this.room}`)
    await this.page.waitForTimeout(5000) //https://casino.bet365.com/Play/en-gb/
    await this.login();
    

}

  async publisher(message) {

    amqp.connect('amqp://roullet:roullet@localhost:5672', function(err, conn) {
      let queue = 'bet365Roullet'
      conn.createChannel(function(err, ch) {
          ch.assertQueue(queue, {durable: false});
          ch.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
          console.log(" [x] Sent %s", message);
          setTimeout(function() {
              conn.close();
          }, 500);
     
        });
      });
  }

  async login() {
    await this.page.waitForTimeout(7000) 
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
      await this.page.waitForTimeout(20000);
      const button = await this.page.$('.regulatory-last-login-modal__button');
      if (button) {
        await button.click();
      }
      await this.page.waitForTimeout(35000);
      await this.page.waitForTimeout(8000);
    }
  }

  async antiIndle( ) {
      await this.page.waitForTimeout(15000) //https://casino.bet365.com/Play/en-gb/
          
  }
}

const bot = new RoulleteBot("Ma128sio4", "maikonweber", 'LiveRoulette');
bot.init();