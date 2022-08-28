const puppeteer = require("puppeteer");
const Redis = require("ioredis");
const axios = require('axios'); 
const logger = require('./logger');


class scrapperFootScrapper {
    constructor(url, username, password) {
        this.url  = this.url
        this.username = username
        this.password = password
    	  this.browser;
        this.mappingUrl;
        this.bestPlayerTating;
        this.eventIncoming;
        this.timeIncoming;
        this.statisct;
        this.mappingUrl;
        this.matchIncoming;

    }

    
    async init () {
        const browser = await puppeteer.launch({
            headless: false,
             defaultViewport: {
               width: 1100,
               height: 1280
             },
             SlowMo: 50,
             args: [
               "--no-sandbox",
               "--window-position=0,0",
               '--disable-extensions',
             ],  
           });

  
           this.browser = browser
           this.page = await browser.newPage()
          }

   async scrappingFoot(league) {
       
        await this.page.goto('https://google.com')
        await this.page.goto('https://www.sofascore.com/tournament/football/brazil/brasileiro-serie-a/325')
        logger.info({message : 'Localizou a Pagina'})
       
        await this.page.waitForTimeout('15000')
        let mapping = await this.page.evaluate(() => {
          const te_ = document.querySelectorAll('.sc-5d19fd97-1.gYXwKy')[0].querySelectorAll('.sc-cd4cfbdc-0.sc-248fac68-0.hDkGff.dlFeNl')
          const arry =  []
          const urlTimes = []

          te_.forEach(el => {
            const elt = el.querySelector('a')
            if(elt) {
              urlTimes.push(elt.href)
            }
            arry.push(el.innerText) 
          })

        return [arry, urlTimes]
      })

    
        const net =  mapping[0].map(el => el.split(/\n/))
        const net2 =  net.map(el => {
        const objetoTable = {}
        objetoTable.position = el[0]
        objetoTable.time = el[1]
        objetoTable.partidas = el[2]
        objetoTable.win = el[3]
        objetoTable.draw = el[4]
        objetoTable.lose = el[5]
        objetoTable.goal = el[6]
        objetoTable.Pts = el[7]
        return objetoTable
       })

      const incoming = await this.page.evaluate(() => {
        const partidas = document.querySelectorAll('.sc-8e930919-2.hibAwd')[0].querySelectorAll('a')
        const incoming = []
        partidas.forEach(el => {
         incoming.push([el.innerText, el.href] )
        })
        return incoming
      })

      const matchIncoming = incoming.map(el => {
        const matchObject = {}
        const splitMatch  =  el[0].split(/\n/)
        console.log(splitMatch)
        matchObject.game = splitMatch  
        matchObject.url = el[1]
        return matchObject 
    })

      logger.info('evalute' ,{message : JSON.stringify(mapping[1])})
      logger.info('incoming', {message : JSON.stringify(matchIncoming)})
      logger.info('fitst', { message : JSON.stringify(net2)})
      this.mappingUrl = mapping[1]
      this.matchIncoming = matchIncoming
      this.net2 = net2
      await this.sleep(2000)
      await this.getTimes(mapping[1])
      await this.saveToUpdate(net2, '/table')
      await this.saveToUpdate(matchIncoming, '/incoming')
    }

    async getTimes(urlsbox) {
      const page = await this.browser.newPage()  
      urlsbox.forEach(async el => {
          const elx = el.replace(/www./g, '')
          
          const io = elx
          const page = await this.browser.newPage()
          
          await page.goto(el, { timeout: 80000000})
          await page.waitForTimeout(250000)
          const timeIncoming = await page.evaluate(() => {
            const tr = document.querySelectorAll('.sc-8e930919-2.hibAwd')[0].querySelectorAll('a')
            const array = [] 
            tr.forEach(el => { array.push(el.innerText) })
            console.log(array)
            return array
          })

          const hj = timeIncoming.map(el => el.split(/\n/g))
          console.log(hj)
          await this.saveToUpdate(hj, '/time-incoming')
          logger.info('timeIncoming', {message : JSON.stringify(timeIncoming)})
                   
          const eventIncoming = await page.evaluate(() => {
          const tr =  document.querySelectorAll('.sc-hKwDye.fpwCSM.ps.ps--active-y')[0].querySelectorAll('div')
          const array = []
          tr.forEach(el => array.push(el.innerText))
          return array 
          })

          const ei = eventIncoming.map(el => el.split())
          console.log(ei)
          logger.info('bestPlayerTime', { message : JSON.stringify(eventIncoming)})
          await this.saveToUpdate(ei, '/best-player-time')
          const bestPlayerTating = await page.evaluate(() => {
            const tr = document.querySelectorAll('.sc-a2e18b6f-1.bcxLaS')[0].querySelectorAll('a')
            const array = []
            tr.forEach(el => array.push(el.innerText))
            return array
          })
          logger.info('bestPlayer', {message : JSON.stringify(bestPlayerTating)})
          
          const lh = bestPlayerTating.map(el => el.split(/\n/g))
          console.log(lh)
          await this.saveToUpdate(lh, '/best-player-tating')
          const statisct = await page.evaluate(() => {
            const tr = document.querySelectorAll('.sc-c7e95734-0.gVkkAv')[0].querySelectorAll('div')
            const array = []
            tr.forEach(el => { array.push(el.innerText)})
            return array
          })

          const ty = statisct.map(el => el.split(/\n/g))
          console.log(ty)
          logger.info('statist', {message : JSON.stringify(statisct)})
          await this.saveToUpdate(ty, '/statisct')
          await page.close()
          await this.sleep(80000)       

          


        })
      }

    async saveToUpdate (objectLow, scope) {
      axios.post('http://localhost:3055/api/football' + scope , objectLow).then((el) => console.log(el.data)).catch(err => console.log(err))
      logger.info('message', JSON.stringify(objectLow))
    }

    sleep (ms)  { 
      return new Promise((resolve, reject) =>{
      setTimeout(() => {
      resolve(true)
      }, ms)
    })
  }

}



module.exports = scrapperFootScrapper
