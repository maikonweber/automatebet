const puppeteer = require('puppeteer');
const redis = require('redis');
// Create class js
 class RobotObserverRoullet {
    constructor(password, username) {
        this.password = password;
        this.username = username;
        this.browser = null;
        this.page = null;
        this.RoulletLastNumber = [],
        this.balance = 0;
        this.round = null;

        this.IndexofRoullet = []


        this.roullerCurrentResult = null;

        this.applyBetTime = false;
        this.timer = null;
    }

    async init() {
        const browser = await puppeteer.launch({
            userDataDir : './userData', 
            headless: false,
            defaultViewport: {
              width: 920,
              height: 580
            },
            slowMo: 100,
            args: [
              '--disable-web-security',
              '--disable-features=IsolateOrigins,site-per-process',
                '--disable-extensions',
                "--window-size=920,680",
                "--window-position=500,0",

            ],  
            devTools: true, 
              
          });
        const page = await browser.newPage();
        this.page = page;
        this.browser = browser;

        }

     async login() {
        const page = this.page;
        await page.goto("https://player.smashup.com/iframe/auth/login", {waitUntil: 'networkidle0'});
        const sideicons = "#trn";
        const xPathEvolution = '/html/body/main/section[2]/div/div/div/div[2]/figure/a';
        const Roullet = '#Thumbnail--c01d7 AnimateZoom--c472b'
        const link = 'https://www.smashup.com/'
        const elementNumber = "#number-container--c5cdb recent-number--1a19f desktop--b8c6b";
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
        this.page = page;
        return page;
    }   

    async routine () {
        await this.init();
        const page = await this.login();
        const page2 = await this.seeAllRoulletesPage();
        // const page3 = await this.roulletpad(page2);

       
    }


    async mappingBoard (page) {
        console.log("Mapping Board");
        const thx = await page.$$('.green_color');
        const ty = await page.$$('.red_color');
        const tz = await page.$$('.black_color');
        const t2 = await page.$$('.outsides_color');


        ty.forEach(async element => {
            console.log(await  element.getProperties());
          

        });
          
        

        // })

        // tz.forEach(async element => {
        //     await element.getAttribute('data-bet-spot-id').then(async (value) => {
        //         console.log(value);

        //     });

        // })

        // t2.forEach(async element => {
        //     await element.getAttribute('data-bet-spot-id').then(async (value) => {
        //         console.log(value);

        //     });  
        // })

    }

    async roulletpad (page) {
        console.log("Roullet pad");
        // Select all elements in the div root
        const data = await page.evaluate(() => document.querySelector('*').outerHTML);
            // SVG //*[@id="root"]/div[2]/div/div/div[2]/div/div[6]/div[2]/div/div[2]/div/div[1]/div/div[1]/div/svg
            // Table Class #classicStandard-wrapper
            // Element Class name is green_color , red_color, black_color
            // Element Class name is green_color , red_color, black_color
            // get Element by class name green_color
            const element = await page.$$('#text--27a51 uppercase--1918b');
            console.log(element[0]);
            const thx = await page.$$('.green_color');
            const ty = await page.$$('.red_color');
            const tz = await page.$$('.black_color');
            const ligthTraffic = await page. $$('.traffic-light--a7a04');
            const textLigth = await page.$$('.text--27a51');
            const w =  await page.$x('//*[@id="root"]/div[2]/div/div/div[2]/div/div[6]/div[1]/div/div/div[2]')
            console.log(w, 'w');
            this.mappingBoard(page);


            setInterval(async () => {
              const text = await  w[0].getProperty('textContent')
              const l = await text.jsonValue();
              console.log(l, 'l');
              this.round = l;

            }, 1000);
        

    }


    async seeAllRoulletesPage(page) {
        await this.page.goto("https://player.smashup.com/player_center/goto_common_game/5941/1000000", {waitUntil: 'networkidle0'});
        await this.page.waitForTimeout(15000);
        var frames = (await this.page.frames());
        const a = frames[1].url();
        await this.page.goto(a, {waitUntil: 'networkidle0'});
        await this.page.waitForTimeout(5000);

        await this.page.evaluate(() => {
            const element = document.querySelectorAll(".HistoryGridItem--237f9");
            console.log(element);
        })
       

    
        
    }




      async openPage(name) {
          this.page()
      }
       

  waitForSecond (time) {
        setTimeout(() => {
            console.log('Iniciando um Timeout de ' + time + ' segundos');
        }, [time]);   
    }   


}

const bot = new RobotObserverRoullet('ma128sio4', 'maikonweber1');
bot.routine();

module.exports = RobotObserverRoullet;