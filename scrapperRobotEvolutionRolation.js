const puppeteer = require("puppeteer-extra");
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const redis = require("redis");
const axios = require('axios'); 
const client = redis.createClient({
  host: "127.0.0.1",
  port: 6379
});

const  {
  l,
  getTextEvalute
} = require("./puppeterFunctions")

async function waitGoto(url, timeout, page) {
  await page.goto(url, {waitUntil: 'networkidle0'});
  await console.log('------Go to ' + url +'--------')
  await page.waitForTimeout(timeout)
}



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
     console.log(balance) 
     await page.waitForTimeout(3000)
} else {
     console.log('Ocorreu um erroo no site')
}

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
     var frames = (await page.frames());
     const a = frames[1].url();
     await page.goto(a, {waitUntil: 'networkidle0'});
     await page.waitForTimeout(15000);

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
gi
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
    l(pagex)
    pagex.forEach((el) => {
      l(el)
    axios.post('http://localhost:3055/api/evolution', el).then((result) => {
      console.log(result.data)
    }).catch((erro) => {
      console.log(erro)
    })
  })

    await page.waitForTimeout(1500)
    
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

    shows.forEach((elem) =>  {
      l(elem)
      if((/Football/g).test(elem.name) || (/Futbol/g).test(elem.name) ) {
      axios.post('http://localhost:3055/api/cards', elem).then((result) => {
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
  

      // let array = await page.$$('article')
      // console.log(array)
      // array.forEach( async (element, index) => {
      //     const name = await element.$('p')
      //     const textObject = await name.getProperty('textContent');
      //     const text = textObject._remoteObject.value;
      //     const numberAll = await element.$$('.HistoryGridItem--237f9')
      //     let arrayNumber = []
      //     for(let i; numberAll.lenght > i; i++) {
      //       let number = await numberAll[i].getProperty('textContent')
      //       console.log(number)
      //       array.push(number)
      //     }

      //     // const numbert = await element.$('.HistoryGrid--0f7aa.stretched--658be')
      //     // const arrayNumber = []
          // for(let i; numbert.lenght > i; i++) {
          //   const a = await numbert[i].$$('.HistoryGridItem--237f9')
          //   for(let y; a.lenght > y; y++) {
          //     const text = await a[y].getProperty('textContent')
          //     const resultText = text._remoteObject.value;
          //     arrayNumber.Push(resultText)
          //   }
          // }

  //        roulleta = {}
    //      roulleta.name = text
       //   roulleta.number = arrayNumber
         // console.log(roulleta)

//         })

//         console.log('-------------------Element try Detect----------------------')
     
//  } catch  (error) {
//     console.log(error)
//  }
 
//  try {
//   let elementHistory = await page.$$('.History--09963.tile--9ba18')
  
//   for(let i = 0; elementHistory.length > i; i++) {
//     let ay = []
//     let elementInsideArray = await elementHistory.$$('.HistoryGridItem--237f9')
//     console.log(elementHistory[i], 'element')
//   for(let y = 0; elementInsideArray.length > y; y++) {
    
//     const game = await elementInsideArray[y].getProperty('textContent');
//     console.log(elementHistory[y], 'element')
//     ay.push(game)
//   }
//     console.log(ay)
//   }
   
// } catch (err) {
//   console.log(err)
//  }
})()
