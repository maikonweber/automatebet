const puppeteer = require("puppeteer-extra");
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const Redis = require("ioredis");
const axios = require('axios'); 
const redis = new Redis();

process.on('SIGINT', function() {
  redis.quit(function(err) {
    process.exit(err ? 1 : 0)
  })
})




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
   const pageA = await browser.newPage()
   const pageB = await browser.newPage()
   const pageC = await browser.newPage()
   const pageD = await browser.newPage()

   return {
    A : pageA,
    B : pageB,
    C : pageC,
    D : pageD
   }
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
await page.A.goto(url);
const element_ = await page.A.$('#username')
const elementPass_ = await page.A.$('#password')

if (element_ && elementPass_) {
     await element_.type('maikonweber1');
     await elementPass_.type('ma128sio4');
     await page.A.keyboard.press('Enter')
     await page.A.waitForNavigation({ waitUntil: 'networkidle0'})
     // player_uname // lastLogintimeTxt
     const balance = await page.A.evaluate(() => {
        let current = document.querySelector('.currency_number').innerText
        let currentValor = document.querySelector('#player_uname').innerText
        let lastLogin = document.querySelector('#lastLogintimeTxt').innerText
        return {
          'Name' : current,
          'CurrentValor' : currentValor,
          'lastLogin' : lastLogin
        }
      })
     console.log(balance) 
     await page.A.waitForTimeout(3000)
} else {
     console.log('Ocorreu um erroo no site')
}

const sleep = (ms) => { 
  return new Promise((resolve, reject) =>{
  setTimeout(() => {
    resolve(true)
  }, ms)
})
}


async function getSport(page) {
await page.waitForTimeout(45000)
await page.goto('https://blaze.com/pt/sports')

const allDiv = await page.$$('div')


}

async function getRoleta(page) {
// await sleep(8000)
// await page.evaluate(() => {
//   document.querySelector('.livecasino a').click()
// })

await page.goto('https://player.smashup.com/player_center/goto_common_game/5941/1000000')

 await sleep(8000)
  var frames = (await page.frames());
  const a = frames[1].url();
  await page.goto(a, {waitUntil: 'networkidle0'});
  await sleep(8000)

 await page.evaluate(() => {
    let arrayElement = document.querySelectorAll('.CategoryIcon--647f6')
    console.log(arrayElement)
    arrayElement[1].click()
 })    

 await page.evaluate(() => {
   let arrayElement = document.querySelectorAll('img')
   console.log(arrayElement)
 }) 

 setInterval(async  () => {
    const pagex = await page.evaluate(() => {
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
    axios.post('http://localhost:3055/api/evolution', el).then((result) => {
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
    
    const shows = await page.evaluate(() => {
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
        process.exit(1)
      }

    shows.forEach((elem) =>  {
      l(elem)
      if((/Football/g).test(elem.name) || (/Futbol/g).test(elem.name) ) {
      axios.post('http://localhost:3055/api/cards_', elem).then((result) => {
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
    
    await page.waitForTimeout(700)
  }, 8000)
  
}

async function getEsporte(page) {
  setInterval(async () => {
  await page.goto('https://blaze.com/en/games/crash')

  await page.waitForTimeout(10000)

  const result = await  page.evaluate(() => {
    return document.querySelector('.entries').querySelector('span').innerText
  })

  const objCrash = {}
  objCrash.number = result.replace('X', '')
  objCrash.date = new Date()

  const resultx = await redis.get(`${objCrash.number}`)
  
  if(!resultx) {
  redis.set(`${objCrash.number}`, true, 'EX', 20)
  axios.post('http://localhost:3055/api/crash_', objCrash).then((result) => {
      console.log(result.data)
    }).catch((erro) => {
      console.log(erro)
    })
  }
  }, 8000)
}


async function getCrash(page) {
  await page.waitForTimeout(5000)
  await page.goto('https://blaze.com/en/games/double') 
  setInterval(async () => {
  const number = await page.$$('.entries.main')
  const tite = await number[0].$('.entry')
  const lastnumber = await tite.$('.number')
  const newnumber = await lastnumber.getProperty('textContent')
  let nownumber = await newnumber.jsonValue()
  console.log('Her')
  const obj = {}
  obj.number = nownumber.replace('', 'X')
  obj.date = new Date().getTime()
  console.log(obj)

  const resultx = await redis.get(`${obj.number}`)
  
  if(!resultx) {
  redis.set(`${obj.number}`, true, 'EX', 20)
  axios.post('http://localhost:3055/api/double_', obj).then((result) => {
      console.log(result.data)
    }).catch((erro) => {
      console.log(erro)
    })
  }
  
}, 8000)

}
  
    // const objDouble = {}
    // objDouble.number = result3.replace('', '0')
    // objDouble.date = new Date().getTime()
    // console.log(objDouble)
    // const resultxT = await redis.get(`${objDouble.number}`)
    
    // if(!resultxT) {
    // redis.set(`${objDouble.number}`, true, 'EX', 20)
    // axios.post('http://localhost:3055/api/double_', objDouble).then((result) => {
    //     console.log(result.data)
    //   }).catch((erro) => {
    //     console.log(erro)
    //   })
    // }
  
    // await page.waitForTimeout(10000)
  

  


const promisse  = new Promise((resolve, reject) =>  {
  setTimeout(() => {
    resolve(process.send('ready'), process.exit(1))
  }, 60000 * 10)
})

Promise.all([getCrash(page.C), getEsporte(page.A), getRoleta(page.C), getSport(page.D), promisse]).then(result => console.log(result))

})()