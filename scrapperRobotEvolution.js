
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const redis = require("redis");
const axios = require('axios'); 
const client = redis.createClient({
  host: "127.0.0.1",
  port: 6379
});

client.connect();
puppeteer.use(StealthPlugin());

async function getBrowser () {
const browser = await puppeteer.launch({
     headless: false,
     defaultViewport: {
       width: 1100,
       height: 980
     },
     args: [
       "--window-size=920,680",
       "--window-position=500,0"   
     ],  
     devTools: true, 
   });
   const page = await browser.newPage()
   return page
}

async function login(page) {
await page.goto("https://player.smashup.com/iframe/auth/login", {waitUntil: 'networkidle0'});
const titulo = ".Typography--46b8a.Typography_xs_subtitle1--c55ab.Typography_md_h6--ebc04.Typography_xl_h5--c919c bold--9a1d2.colorPrimary--5a57c.ellipsisModeOneLine--eb3a6"
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
}

const url = 'https://player.smashup.com/iframe/auth/login'
const sideicons = "#trn";
const xPathEvolution = '/html/body/main/section[2]/div/div/div/div[2]/figure/a';
const Roullet = '#Thumbnail--c01d7 AnimateZoom--c472b'
const link = 'https://www.smashup.com/'
const elementNumber = "#number-container--c5cdb recent-number--1a19f desktop--b8c6b";
const category = ".CategoryIcon--647f6";
const grid = ".HistoryGrid--0f7aa.stretched--658be";


(async () => { 
const page = await getBrowser()
await page.goto(url);

const element_ = await page.$('#username')
const elementPass_ = await page.$('#password')

if (element_ && elementPass_) {
     await element_.type('maikonweber1');
     await elementPass_.type('ma128sio4');
     await page.keyboard.press('Enter')
     await page.waitForNavigation({ waitUntil: 'networkidle0'})
} else {
     console.log('Ocorreu um erroo no site')
}

await page.goto("https://player.smashup.com/player_center/goto_common_game/5941/1000000", {waitUntil: 'networkidle0'});
await page.waitForTimeout(15000);
var frames = (await page.frames());
const a = frames[1].url();
await page.goto('https://ezugi.evo-games.com/frontend/evo/r2/#category=roulette', {waitUntil: 'networkidle0'});
await page.waitForTimeout(5000);



const p = new Promise((resolve, reject) => {
     setTimeout(() => {
       resolve(true)
     }, 15200)  
   })
   
while(true) {
     const grider = await page.$$(grid);
     for (let i = 0; i < grider.length; i++) {
          grider
        }

 
await p 

}



})()