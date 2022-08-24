const puppeteer = require("puppeteer-extra");
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const Redis = require("ioredis");
const axios = require('axios'); 



class scrapperRobot {
    constructor(username, password, redis) {
        this.username = username;
        this.password = password;
        this.browser = null;
        this.currentPage = null;
        this.secondPage = null;    
        this.thirdPage = null;
        this.fourthPage = null;
        this.client = redis
        this.urlSender = 'http://localhost:3055'
        this.urlSmash = 'https://player.smashup.com/iframe/auth/login';
        this.jsonObject = {}
        this.jsonObjectCards = []
    }

    async getCurrentAndSet(name, data) {
      console.log(name, data)
      const args = await this.client.get(`${name}`)
        console.log(args != data)
        console.log(args != JSON.stringify(data)) 
      if (args != JSON.stringify(data)) {
          
          const sender = {
            name,
            data
          }

          await  this.client.set(`${name}`, JSON.stringify(data), 'EX', 250)
          axios.post(this.urlSender + '/api/evolution', sender).then(el => {
          }).catch(e => console.log(e))
        }
    }

    async init() {
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
           const pageA = await browser.newPage()
          //  const pageB = await browser.newPage()
          //  const pageC = await browser.newPage()
          //  const pageD = await browser.newPage()
           
        this.browser = browser;
        this.currentPage = pageA; 
        // this.secondPage = pageB;
        // this.thirdPage = pageC;
        // this.fourthPage = pageD;
    }

async login () {
    await this.currentPage.goto(this.urlSmash);
    const element_ = await this.currentPage.$('#username')
    const elementPass_ = await this.currentPage.$('#password')
if (element_ && elementPass_) {
     await element_.type('maikonweber4');
     await elementPass_.type('ma128sio4');
     await this.currentPage.keyboard.press('Enter')
     await this.currentPage.waitForNavigation({ waitUntil: 'networkidle0'})
     // player_uname // lastLogintimeTxt
     const balance = await this.currentPage.evaluate(() => {
        let current = document.querySelector('.currency_number').innerText
        let currentValor = document.querySelector('#player_uname').innerText
        let lastLogin = document.querySelector('#lastLogintimeTxt').innerText
        return {
          'Name' : current,
          'CurrentValor' : currentValor,
          'lastLogin' : lastLogin
        }
      })
   
     await this.currentPage.waitForTimeout(3000)
} else {
     console.log('Ocorreu um erroo no site')
    }
}

    async initRoleta() {

    await this.currentPage.goto('https://player.smashup.com/player_center/goto_common_game/5941/1000000?_ga=2.255341960.1850900768.1661037548-19437148.1661037548')
    await this.currentPage.waitForTimeout(3000)
    var frames = (await this.currentPage.frames());
    const a = frames[1].url();
    await this.currentPage.goto(a, {waitUntil: 'networkidle0'});
    
    await this.currentPage.goto('https://ezugi.evo-games.com/frontend/rr/live-redirect/#category=roulette', {waitUntil: 'networkidle0'});

    await this.currentPage.waitForTimeout(1500)

    setInterval(async () => {
        await this.currentPage.waitForTimeout(1000)
        await this.currentPage.reload({waitUntil: 'networkidle0'})
        await this.currentPage.waitForTimeout(3000)
        await this.currentPage.evaluate(() => {
          window.scrollTo(0, document.body.scrollHeight / 2);
        })

        await this.sleep(300)

        await this.currentPage.evaluate(() => {
          window.scrollTo(0, document.body.scrollHeight);
        })

        await this.sleep(300)
      //   })
      //   await this.currentPage.waitForTimeout(300)

      //   await this.currentPage.evaluate(() => {
      //     window.scrollTo(0, 200);
      //     window.scrollTo(0 ,600)
      //     window.scrollTo(0, 900)
      //     window.scrollTo(0, 1200)
      //     window.scrollTo(0, 1200)
      //     window.scrollTo(0, 1200)
      //  })

       await this.currentPage.waitForTimeout(300)

        const pagex = await this.currentPage.evaluate(() => {
           var payload = []
           const history = document.querySelectorAll('article')
           history.forEach((Element) => {
             var rou = {}
             const name = Element.querySelector('p').innerText
             rou.name = name
             const node = Element.querySelectorAll('.HistoryGridItem--237f9')
             rou.number = []
             var height = 20
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
            
             return payload
           })
                  pagex.forEach(async(element) => {
                      console.log(element)
                        if(element.number.length > 0) {
                        await this.getCurrentAndSet(element.name, element.number)
                        }
            })
            
    }, 12000)

}


async getCards() {

    await this.secondPage.goto('https://player.smashup.com/player_center/goto_common_game/5941/1000000?_ga=2.255341960.1850900768.1661037548-19437148.1661037548')
    await this.secondPage.waitForTimeout(3000)
    var frames = (await this.secondPage.frames());
    const a = frames[1].url();
    await this.secondPage.goto(a, {waitUntil: 'networkidle0'});
    
    await this.secondPage.goto('https://ezugi.evo-games.com/frontend/rr/live-redirect/#category=game_shows', {waitUntil: 'networkidle0'});

    await this.secondPage.waitForTimeout(1500)

    setInterval( async () => { 
    

    const shows = await this.secondPage.evaluate(() => {
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
          
          payload.push(rou)
        })
        
        return payload
      })
      
      shows.forEach((elem) =>  {
      
        if((/Football/g).test(elem.name) || (/Futbol/g).test(elem.name) ) {
        axios.post('http://localhost:3055/api/cards_', elem).then((result) => {
          console.log(result.data)
        }).catch((erro) => {
               })
        }



      })
  


    }, 12000)
    }

    sleep (ms)  { 
        return new Promise((resolve, reject) =>{
        setTimeout(() => {
        resolve(true)
        }, ms)
      })
    }


    async getSport() {
      // bt171 bt172 
      // bt-inner-page
      // betby


    
    
        // Open the Shadow DOM
        // Inside a element
        // const shadowRoot = element[0].shadowRoot;
      
        // Get properties from of the element 
        
    }
}





module.exports = scrapperRobot;