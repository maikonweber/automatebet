const { Cluster } = require('puppeteer-cluster');
const redis = require("redis");
const axios = require('axios'); 

const puppeteer = require("puppeteer-extra");
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const client = redis.createClient({
  host: "127.0.0.1",
  port: 6379
});

// Functions Utils
const sleep = (ms) => { 
  return new Promise((resolve, reject) =>{
  setTimeout(() => {
    resolve(true)
  }, ms)
})
}

client.connect();
puppeteer.use(StealthPlugin());

// Logging 
const l = (log) => {console.log(log, 'This is Logger ', new Date() )}

// Logging Smash Up

const Logging = async ({page, data: url}) => {
  await page.goto(url);
  const element_ = await page.$('#username')
  const elementPass_ = await page.$('#password')
  
  if (element_ && elementPass_) {
       await element_.type('maikonweber1');
       await elementPass_.type('ma128sio4');
       await page.keyboard.press('Enter')
       await page.waitForNavigation({ waitUntil: 'networkidle0'})
       // player_uname // lastLogintimeTxt
       const balance = await page.evaluate(() => {
          let current = document.querySelector('.currency_number').innerText
          let currentValor = document.querySelector('#player_uname').innerText
          let lastLogin = document.querySelector('#lastLogintimeTxt').innerText
          return {
            'Name' : current,
            'CurrentValor' : currentValor,
            'lastLogin' : lastLogin
          }
        })
       l(balance) 
if(balance) {
        
await page.evaluate (() => {
  let button = document.querySelector('.brand-logo')
  button.click()
})

await page.waitForTimeout(5000)

await page.evaluate(() => {
  document.querySelector('.livecasino a').click()
})
await page.waitForTimeout(7000);
await page.goto('https://player.smashup.com/player_center/goto_common_game/5941/1000000')
await page.waitForTimeout(6000);
     await page.waitForTimeout(15000);
     var frames = (await page.A.frames());
     const a = frames[1].url();
     await page.goto(a, {waitUntil: 'networkidle0'});
     await page.waitForTimeout(15000);
while (true) {
 await page.evaluate(() => {
    let arrayElement = document.querySelectorAll('.CategoryIcon--647f6')
    console.log(arrayElement)
    arrayElement[1].click()
 })    

 await page.evaluate(() => {
   let arrayElement = document.querySelectorAll('img')
   console.log(arrayElement)
 }) 

    const pagex = await page.A.evaluate(() => {
      var payload = []
      const history = document.querySelectorAll('article')
      history.forEach((Element) => {
        var rou = {}
        const name = Element.querySelector('p').innerText
        rou.name = name
        const node = Element.querySelectorAll('.HistoryGridItem--237f9')
        rou.number = []
        node.forEach((el) => {
          const number =  el.innerText
          let newNumber = number.replace(/\n[0-9]*x/g, '')
          let new1Number = newNumber.replace(/\n[0-9]*/g, '')
          let int_ = parseInt(new1Number)
          
          rou.number.push(int_)
          return
          })
          console.log(rou)
          payload.push(rou)
        })
        console.log(payload)
        return payload
      })


    pagex.forEach((el) => {
      l(el)
    axios.post('https:api/muttercorp.com/api/evolution', el).then((result) => {
      console.log(result.data)
    }).catch((erro) => {
      console.log(erro)
    })
  })

    await page.waitForTimeout(12000)
    
    await page.evaluate(() => {
      let arrayElement = document.querySelectorAll('.CategoryIcon--647f6')
      console.log(arrayElement)
      arrayElement[5].click()
    })
    
    const shows = await page.A.evaluate(() => {
      var payload = []
      const history = document.querySelectorAll('article')
      history.forEach((Element) => {              
        var rou = {}
        const name = Element.querySelector('p').innerText
        rou.name = name
        const node = Element.querySelectorAll('.HistoryGridItem--237f9')
        rou.number = []
        node.forEach((el) => {
          const number =  el.innerText
          let newNumber = number.replace(/\n[0-9]*x/g, '')
          rou.number.push(newNumber)
          return
          })
          console.log(rou)
          payload.push(rou)
        })
        console.log(payload)
        return payload
      })

      if(shows.lenght < 1) {
        process.exit()
      }
    shows.forEach((elem) =>  {
      l(elem)
      if((/Football/g).test(elem.name) || (/Futbol/g).test(elem.name) ) {
      axios.post('https:api/muttercorp.com/api/cards', elem).then((result) => {
      console.log(result.data)
      }).catch((erro) => {
      console.log(erro)
      })
      }
    })

    await page.evaluate(() => {
      let arrayElement = document.querySelectorAll('.CategoryIcon--647f6')
      console.log(arrayElement)
      arrayElement[1].click()
    })
    
    sleep(7000)
  }
  }} else {
       console.log('Ocorreu um erroo no site')
  }
};

// GetEsportes
const getEsporte = async ({page , data: url  }) =>  {
  l(`Getting Esportes Bets`)
  l(url)
  await page.goto(url)
  await page.evaluate(() => {
       return document.querySelectorAll('a')[3].click()
  })
  const body = await page.$$(`body`)
  l(body)
  const pageTitle = await page.evaluate(() => document.body);
  l('Take element')
  await page.waitForSelector('.bto-sb-betting-menu-active').then((result) => result.click())
  l(pageTitle)  
  };



(async () => {
  const cluster = await Cluster.launch({
    concurrency: Cluster.CONCURRENCY_CONTEXT,
    maxConcurrency: 2,
    puppeteer,
    headless: false,
    defaultViewport: {
      width: 1100,
      height: 980
    },
    SlowMo: 50,
    args: [
      "--no-sandbox",
      "--window-size=920,680",
      "--window-position=1200,0",
      '--disable-extensions',
      '--use-gl=egl',
    ],     
  });

  await cluster.task(async ({ page, data: url }) => {
    await page.goto(url)
    const pageTitle = await page.evaluate(() => document.title);
    l(pageTitle)
    l()
    // Store screenshot, do something else
  });
  cluster.queue('https://player.smashup.com/iframe/auth/login', Logging);
  await sleep(12000)
  cluster.queue(`https://player.smashup.com/player_center`, getEsporte)
  // many more pages

  await cluster.idle();
  await cluster.close();


})()