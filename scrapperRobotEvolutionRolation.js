const puppeteer = require("puppeteer-extra");
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const redis = require("redis");
const axios = require('axios'); 

const  {
  l,
  getTextEvalute
} = require("./puppeterFunctions");
const { get } = require("cheerio/lib/api/traversing");

async function waitGoto(url, timeout, page) {
  await page.goto(url, {waitUntil: 'networkidle0'});
  await console.log('------Go to ' + url +'--------')
  await page.waitForTimeout(timeout)
}




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
   return {
    A : pageA,
    B : pageB,
    C : pageC
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
    axios.post('https://api.muttercorp.online/api/evolution', el).then((result) => {
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
        process.exit()
      }

    shows.forEach((elem) =>  {
      l(elem)
      if((/Football/g).test(elem.name) || (/Futbol/g).test(elem.name) ) {
      axios.post('https://api.muttercorp.online/api/card', elem).then((result) => {
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

  // await page.goto('https://player.smashup.com/player_center/')
  // await page.evaluate(() => {
  // return document.querySelectorAll('a')[3].click()
  // })

  // var frames = (await page.frames());
  // const a = frames[0].url();
  // await page.goto(a, {waitUntil: 'networkidle0'});
  // await sleep(8000)

  // const evaluate = await page.evaluate(() => {
  // const grid = document.querySelectorAll('iframe')[1].contentWindow.document
    // const allElement = grid.querySelectorAll('.bto-sb-event-odds')
    // // console.log(allElement)
    // const inCommmingEvent = []
    // allElement.forEach((el) => {
      // Sconsole.log(el)
    //   let inCommingEvent = {}
    //   inCommingEvent.name = el.querySelector('a').innerText
    //   inCommingEvent.campeonato = el.querySelector('.bto-sb-event-description').innerText
    //   inCommingEvent.data = el.querySelector('.bto-sb-event-inntime').innerText
    //   inCommingEvent.hora = el.querySelector('.bto-sb-event-inndate').innerText
    //   inCommingEvent.g1x2_1 =  el.querySelectorAll('span')[9].innerText
    //   inCommingEvent.g1x2_x =  el.querySelectorAll('span')[10].innerText
    //   inCommingEvent.g1x2_2 = el.querySelectorAll('span')[11].innerText
    //   el.click()
    //   let grid = document.querySelectorAll('.bto-sb-mormarket-content.bto-sb-event-mormarket-full')[0].querySelectorAll('.bto-sb-event-mormarket-market.bto-sb-mormarket')
    //   grid.forEach((el => {

    //     inCommingEvent.n1x2_1 = el.querySelectorAll('.bto-sb-event-mormarket-market.bto-sb-mormarket')[0].querySelectoAll('.bto-sb-event-odd')[0]
    //     inCommingEvent.n1x2_x = el.querySelectorAll('.bto-sb-event-mormarket-market.bto-sb-mormarket')[0].querySelectoAll('.bto-sb-event-odd')[1]
    //     inCommmingEvent.n1x2_2 = el.querySelectorAll('.bto-sb-event-mormarket-market.bto-sb-mormarket')[0].querySelectoAll('.bto-sb-event-odd')[0]
    //     inCommingEvent.ATM.sim = el.querySelectorAll('.bto-sb-event-mormarket-market.bto-sb-mormarket')[1].querySelectoAll('.bto-sb-event-odd')[0]
    //     inCommingEvent.ATM.nao = el.querySelectorAll('.bto-sb-event-mormarket-market.bto-sb-mormarket')[1].querySelectoAll('.bto-sb-event-odd')[1]
    //     inCommingEvent.doublechange.x1 = el.querySelectorAll('.bto-sb-event-mormarket-market.bto-sb-mormarket')[2].querySelectoAll('.bto-sb-event-odd')[0]
    //     inCommingEvent.doublechange.x12 = el.querySelectorAll('.bto-sb-event-mormarket-market.bto-sb-mormarket')[2].querySelectoAll('.bto-sb-event-odd')[1]
    //     inCommingEvent.doublechange.x2 = el.querySelectorAll('.bto-sb-event-mormarket-market.bto-sb-mormarket')[2].querySelectoAll('.bto-sb-event-odd')[2]
    //     inCommingEvent.midtime_full._1_1 = el.querySelectorAll('.bto-sb-event-mormarket-market.bto-sb-mormarket')[3].querySelectoAll('.bto-sb-event-odd')[0]
    //     inCommingEvent.midtime_full._1_x = el.querySelectorAll('.bto-sb-event-mormarket-market.bto-sb-mormarket')[3].querySelectoAll('.bto-sb-event-odd')[1]
    //     inCommingEvent.midtime_full._1_2 = el.querySelectorAll('.bto-sb-event-mormarket-market.bto-sb-mormarket')[3].querySelectoAll('.bto-sb-event-odd')[2]
    //     inCommingEvent.midtime_full._x_1 = el.querySelectorAll('.bto-sb-event-mormarket-market.bto-sb-mormarket')[3].querySelectoAll('.bto-sb-event-odd')[3]
    //     inCommingEvent.midtime_full._x_x = el.querySelectorAll('.bto-sb-event-mormarket-market.bto-sb-mormarket')[3].querySelectoAll('.bto-sb-event-odd')[4]
    //     inCommingEvent.midtime_full._x_2 = el.querySelectorAll('.bto-sb-event-mormarket-market.bto-sb-mormarket')[3].querySelectoAll('.bto-sb-event-odd')[5]
    //     inCommingEvent.midtime_full._2_1 = el.querySelectorAll('.bto-sb-event-mormarket-market.bto-sb-mormarket')[3].querySelectoAll('.bto-sb-event-odd')[6]
    //     inCommingEvent.midtime_full._2_x = el.querySelectorAll('.bto-sb-event-mormarket-market.bto-sb-mormarket')[3].querySelectoAll('.bto-sb-event-odd')[7]
    //     inCommingEvent.midtime_full._2_2 = el.querySelectorAll('.bto-sb-event-mormarket-market.bto-sb-mormarket')[3].querySelectoAll('.bto-sb-event-odd')[8]
    //     inCommingEvent.impar_par.impar = el.querySelectorAll('.bto-sb-event-mormarket-market.bto-sb-mormarket')[4].querySelectoAll('.bto-sb-event-odd')[0]
    //     inCommingEvent.impar_par.par = el.querySelectorAll('.bto-sb-event-mormarket-market.bto-sb-mormarket')[4].querySelectoAll('.bto-sb-event-odd')[1]
    //    }))
          //})
    //     document.querySelector('.bto-sb-main-nav-left a').click()
    //     inCommming.push(inCommingEvent)
    //     console.log(inCommingEvent)
    // })
    //     console.log(inCommmingEvent)
    //     return inCommmingEvent
    //       return true
    // })
    //   console.log(evaluate)
}



await getEsporte(page.B)
await getRoleta(page.A)
// setInterval(async () => {
//     await page.B.evaluate(() => {
//       return document.querySelectorAll('li > a')[5].click()
//      })
   
 
//      const pagexB = await page.B.evaluate(() => {
//        const array = []
//       //  document.querySelectorAll('.roulette-previous.casino-recent')[0].querySelectorAll('.entries.main')[0].querySelectorAll('div').forEach((elemt) => { 
//       //    console.log(elemt.innerText)
//       //    array.push(elemt.innerText)
      
//        const obj = {
//          Double : array
//        }
 
//        return obj
//      }) 
 
//      console.log(pagexB)
 
//      await page.B.evaluate(() => {

//        return document.querySelectorAll('li > a')[4].click()
//      })
 

//      await page.B.waitForTimeout(45000)
 
//      // console.log(pagexB)
 
//     //  const pagexBCrash = await page.B.evaluate(() => {
//     //    const array = []
//     //   //  document.querySelectorAll('.entries.main')[0].querySelectorAll('.entry.crash-mr').forEach((elemt) => {
//     //   //    return array.push(elemt.innerText)

//     //    let obj =
//     //    {
//     //      Crash : array
//     //    }
//     //    return obj
 

//     //   })

//     //       }, 17000)

//       // let array = await page.$$('article')
//       // console.log(array)
//       // array.forEach( async (element, index) => {
//       //     const name = await element.$('p')
//       //     const textObject = await name.getProperty('textContent');
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
