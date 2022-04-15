const puppeteer = require('puppeteer');
// Create class js
 class RobotObserverRoullet {
    constructor(password, username) {
        this.password = password;
        this.username = username;
        this.browser = null;
        this.page = null;
        this.RoulletLastNumber = [],
        this.balance = 0;

        this.roulletNumbersInterface = {
            numeber1 : null,
            numeber2 : null,
            numeber3 : null,
            numeber4 : null,
            numeber5 : null,
            numeber6 : null,
            numeber7 : null,
            numeber8 : null,
            numeber9 : null,
            numeber10 : null,
            numeber11 : null,
            numeber12 : null,
            numeber13 : null,
            numeber14 : null,
            numeber15 : null,
            numeber16 : null,
            numeber17 : null,
            numeber18 : null,
            numeber19 : null,
            numeber20 : null,
            numeber21 : null,
            numeber22 : null,
            numeber23 : null,
            numeber24 : null,
            numeber25 : null,
            numeber26 : null,
            numeber27 : null,
            numeber28 : null,
            numeber29 : null,
            numeber30 : null,
            numeber31 : null,


        }

        this.roulletHistory = {
            numbers : []
        }

        this.roullerCurrentResult = null;

        this.applyBetTime = false;
        this.timer = null;
    }

    async init() {
        const browser = await puppeteer.launch({ 
            headless: false,
            defaultViewport: {
              width: 920,
              height: 580
            },
            slowMo : 50,
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
        
        return page;
    }   

    async routine () {
        await this.init();
        const page = await this.login();
        const page2 = await this.seeAllRoulletesPage(page);
      
       
    }

    async seeAllRoulletesPage(page) {
        await page.goto("https://player.smashup.com/player_center/goto_common_game/5941/1000000", {waitUntil: 'networkidle0'});
        await page.waitForTimeout(15000);
        var frames = (await page.frames());
        const a = frames[1].url();
        await page.goto(a, {waitUntil: 'networkidle0'});
        await page.waitForTimeout(5000);
        const RoulletIcon = '/html/body/div[5]/div/div/div/div[3]/div[2]/div[5]/div/div/div[2]/div[1]/div';
        const Balance = '/html/body/div[5]/div/div/div/div[3]/div[4]/div/div/span[2]/span[2]'
        const resultAllTable = '/html/body/div[5]/div/div/div/div[3]/div[3]'
        const popUpNoMoney = 'popup--3eb13 popupBubble--41420'
        const tableContainer = '//*[@id="root"]/div[2]/div/div/div[2]/div/div[6]'
        const PlaceLocal = '//*[@id="root"]/div[2]/div/div/div[2]/div/div[6]/div[1]'
        const spanOfPlaceLocal = '//*[@id="root"]/div[2]/div/div/div[2]/div/div[6]/div[1]/div/div/div[2]'
        const bidGrid = '//*[@id="root"]/div[2]/div/div/div[2]/div/div[6]/div[2]/div/div[2]/div'
        const bidGridTable = '//*[@id="root"]/div[2]/div/div/div[2]/div/div[6]/div[2]/div/div[2]/div'
        const bidGridSvg = '//*[@id="root"]/div[2]/div/div/div[2]/div/div[6]/div[2]/div/div[2]/div[2]'
        const blaclButton = '#black_color'   
        const redButton = '#red_color'
        const greenButton = '#green_color'
        const allBidTableElements = "#classicStandard-wrapper"
        const Ballance = await page.$x(Balance);
        console.log(Ballance);
     
        const w = await page.waitForXPath('/html/body/div[5]/div/div/div/div[3]/div[2]/div[5]/div/div/div[2]/div[1]/div/div')
        w.click();
        await page.waitForTimeout(15000);
        const x = await page.waitForXPath('/html/body/div[5]/div/div/div/div[3]/div[3]/div/div/div/div[1]/div/div[2]/div[2]')
        x.click();
        await page.waitForTimeout(15000);
       


    }

  waitForSecond (time) {
        setTimeout(() => {
            console.log('Iniciando um Timeout de ' + time + ' segundos');
        }, [time]);   
    }   


}

module.exports = RobotObserverRoullet;