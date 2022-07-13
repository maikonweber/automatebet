
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
     SlowMo: 50,
     args: [
       "--no-sandbox",
       "--window-size=920,680",
       "--window-position=500,0",
       '--disable-extensions',
       '--use-gl=egl',
     ],  
   });
   const page = await browser.newPage()
   return page
}

async function login(page) {
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
}

const url = 'https://player.smashup.com/iframe/auth/login'
const sideicons = "#trn";
const xPathEvolution = '/html/body/main/section[2]/div/div/div/div[2]/figure/a';
const Roullet = '#Thumbnail--c01d7 AnimateZoom--c472b'
const link = 'https://www.smashup.com/'
const elementNumber = "#number-container--c5cdb recent-number--1a19f desktop--b8c6b";

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
await page.goto(a, {waitUntil: 'networkidle0'});
await page.waitForTimeout(5000);

await page.goto('https://ezugi.evo-games.com/frontend/evo/r2/#category=game_shows&game=topcard&table_id=nifyytz35m2qcevw', {waitUntil: 'networkidle0'})




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


setInterval( async () => {
  const label = await page.waitForSelector('.text--27a51')
  const value = await label.evaluate(el => el.textContent);

  
  if (AWAY.test(value)) {
    console.log('detect')
    await axios.post('https://api.muttercorp.online/api/cards', away)
    return await page.reload()    
  } else if (HOME.test(value)) {
    console.log('detect')
    await axios.post('https://api.muttercorp.online/api/cards', home)
    return await page.reload()    
  } else if (DRAW.test(value)) {
    console.log('detect')
    await axios.post('https://api.muttercorp.online/api/cards', draw)
    return await page.reload()    
  } else {

  }
},  1000)


})()