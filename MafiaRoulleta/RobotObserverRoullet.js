const puppeteer = require('puppeteer');
const redis = require('redis');
const axios = require('axios')
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
                '--no-sandbox'

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

        await this.page.goto('https://ezugi.evo-games.com/frontend/evo/r2/#category=game_shows&game=topcard&table_id=TopCard000000001', {waitUntil: 'networkidle0'})
        const p = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(console.log('Walting for the next Signal!!!'))
            }, 1500)
        })
        this.intervalRefresh.then(() => {
            console.log('Refresh for 3 minutes')
        })
    

setInterval(async () => {

        const elefant = await this.page.$$('.historyStatistic--c80d3.fourLines--c2f5f')
        const orphan = await this.page.$eval('.text--27a51', el => el.innerText);

        const AWAY = /AWAY/g
        const HOME = /HOME/g
        const DRAW = /DRAW/g

        const home = {
            result : 'H',
            created : new Date().getTime()
        }

        const draw = {
            result : 'D',
            created: new Date().getTime()
        }

        const away = {
            result : 'A',
            created : new Date().getTime()
        }


        if (AWAY.test(orphan)) {
            console.log('detect')
            return axios.post('http://localhost:3055/api/cards', away).then(
                (res) => {
                    console.log('Draw', res)
                }).catch(() => {
                    axios.post('http://localhost:3055/api/cards', draw).then((res) => {
                    }).catch((e) => {
                        console.log(e)  
                    })
                })

        } else if (HOME.test(orphan)) {
            console.log('detect')
            return  axios.post('http://localhost:3055/api/cards', home).then((res) => {
                    console.log('Draw', res)
                }).catch(() => {
                    axios.post('http://localhost:3055/api/cards', home).then((res) => {
                    }).catch((e) => {
                        console.log(e)  
                    })
                })

        } else if (DRAW.test(orphan)) {
            console.log('detect')
            return axios.post('http://localhost:3055/api/cards', draw).then(
                (res) => {
                    console.log('Draw', res)
                }).catch(() => {
                    axios.post('http://localhost:3055/api/cards', draw).then((res) => {
                    }).catch((e) => {
                        console.log(e)  
                    })
                })
        } else if (/BETS CLOSING/g.test(orphan)) {
            return await this.page.reload({ waitUntil: ["networkidle0", "domcontentloaded"] });
        } else {
            console.log('No sygnal')
    
            console.log('No Sygnal')
            return
        }

    }, 4000)
    }

   async intervalRefresh() {
        while (true) {
            const p = new Promise(() => {
                setTimeout(async () => {
                    resolve(await this.page.reload())

                }, 90000)
            })

            await p
        }
    }

}

const bot = new RobotObserverRoullet('ma128sio4', 'maikonweber1');
bot.routine();

module.exports = RobotObserverRoullet;