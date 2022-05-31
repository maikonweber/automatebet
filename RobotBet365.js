const puppeteer = require("puppeteer-extra");
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const redis = require("redis");
const client = redis.createClient({
  host: "localhost",
  port: 6379
});

client.connect();
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
    this.page.goto('https://dl-com.c365play.com/live_desktop/');
    console.log('Aguardando Sinal');
    console.log(await this.page.url());
    // take body
    const body = await this.page.evaluate(() => {
      return document.body.innerText;
    });
    console.log(body);

    this.page.waitForTimeout(15000);
    let site  = await this.page.url();
    console.log(site);

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

    console.log(glee);


      for(let i = 0; i < glee.length; i++) {
        for(let j = 0; j < glee[i].number.length; j++) {      

    const columa1 = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34]
    const coluna2 = [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35]
    const coluna3 = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36]

        
        if(columa1.includes(glee[i].number[j])){
            glee[i].number[j] = {
                
                number: glee[i].number[j],
                columa: 1
            }
        } else if (coluna2.includes(glee[i].number[j])){
            glee[i].number[j] = {
                number: glee[i].number[j],
                columa: 2
            } 
        } else if (coluna3.includes(glee[i].number[j])){
            glee[i].number[j] = {
                number: glee[i].number[j],
                columa: 3
            }
         
        } else {
            glee[i].number[j] = {
                number: glee[i].number[j],
                columa: 0
            } 
        }
    }
}

    for(let i = 0; i < glee.length; i++) {
        for(let j = 0; j < glee[i].number.length; j++) {      

    const bloco1 = [1, 2, 3, 4,5, 6, 7, 8, 9, 10, 11, 12]
    const bloco2 = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
    const bloco3 = [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36]

        
        if(bloco1.includes(glee[i].number[j].number)){
            glee[i].number[j].bloco = 1
        } else if (bloco2.includes(glee[i].number[j].number)){
            glee[i].number[j].bloco = 2
        } else if (bloco3.includes(glee[i].number[j].number)){
            glee[i].number[j].bloco = 3
        } else {
            glee[i].number[j].bloco = 0
        }
    }
}

    for(let i = 0; i < glee.length; i++) {
        for(let j = 0; j < glee[i].number.length; j++) {
            if(glee[i].number[j].number % 2 == 0){
                glee[i].number[j].par = true
            } else {
                glee[i].number[j].par = false
            }
        }
    }

    for(let i = 0; i < glee.length; i++) {
        for(let j = 0; j < glee[i].number.length; j++) {
            if(glee[i].number[j].number % 2 != 0){
                glee[i].number[j].impar = true
            } else {
                glee[i].number[j].impar = false
            }
        }
    }

    for(let i = 0; i < glee.length; i++) {
        for(let j = 0; j < glee[i].number.length; j++) {
            const red = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36]
            const green = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35, 0]
            if(red.includes(glee[i].number[j].number)){
                glee[i].number[j].red = true
                glee[i].number[j].green = false
            }
            if(green.includes(glee[i].number[j].number)){
                glee[i].number[j].green = true
                glee[i].number[j].red = false              
            }
        }
    }

    for(let i = 0; i < glee.length; i++) {
        for(let j = 0; j < glee[i].number.length; j++) {
            const OneTo18 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 0]
            const x19To36 = [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 0]
            if(OneTo18.includes(glee[i].number[j].number)){
                glee[i].number[j].OneTo18 = true
                glee[i].number[j].x19To36 = false
                
            }
            if(x19To36.includes(glee[i].number[j].number)){
                glee[i].number[j].x19To36 = true 
                glee[i].number[j].OneTo18 = false         
            }
        }
    }

    await this.publisher(glee);
  


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
        // '--proxy-server=45.190.249.100:8080',
        '--no-sandbox',
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
    console.log('Publishing message...')
    client.publish('Bet365', JSON.stringify(message));
  }

  async login() {
    await this.page.waitForTimeout(7000) 
    // Get body
    const bodyHandle = await this.page.$('body');
    // get innet HTML
    const bodyHTML = await this.page.evaluate(body => body.innerHTML, bodyHandle);
    console.log(bodyHTML)
    const username = await this.page.waitForSelector('#txtUsername');
    const password = await this.page.waitForSelector('#txtPassword');
    console.log("Try to login");
    let site  = await this.page.url();
    console.log(site);
    if (username && password) {
      // Clean username
       // Clear the input field
      // await username.type('\u0008');
      await username.type(this.username);
      await password.type(this.password);
      // enter the page
      await this.page.waitForTimeout(5000);
      await this.page.keyboard.press('Enter');
      await this.page.waitForTimeout(5000);
      const button = await this.page.$('.regulatory-last-login-modal__button');
      if (button) {
        await button.click();
      }
      await this.page.waitForTimeout(5000);
      await this.page.waitForTimeout(5000);
    }
  }

  async antiIndle( ) {
      await this.page.waitForTimeout(15000) //https://casino.bet365.com/Play/en-gb/
          
  }
}

const bot = new RoulleteBot("Ma128sio4", "maikonweber", 'LiveRoulette');
bot.init();