const e = require("express");
const puppeteer = require("puppeteer");

async function closureText(page, element) {
  const value = await page.evaluate(el => el.textContent, element)
  console.log(value)
  return value
}

class scrapperFootScrapper {
  constructor(url, username, password) {
    this.url = this.url
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

    this.browser = browser
    this.page = await browser.newPage()
  }

  async scrappingFoot(league) {
    await this.page.goto('https://google.com')
    // await this.page.goto('https://www.sofascore.com/pt/time/futebol/palmeiras/1963')
    await this.sleep(5000)
    const json = {
      'Palmeiras' :'https://www.sofascore.com/pt/time/futebol/palmeiras/1963' ,
      'São Bento' : 'https://www.sofascore.com/pt/time/futebol/sao-bento/6967',
      'Red Bull Bragatino' : 'https://www.sofascore.com/pt/time/futebol/red-bull-bragantino/1999',
      'São Paulo' : 'https://www.sofascore.com/pt/time/futebol/sao-paulo/1981',
      'Ituano' : 'https://www.sofascore.com/pt/time/futebol/ituano/2025',
      'Santos' : 'https://www.sofascore.com/pt/time/futebol/santos/1968',
      'Mirassol FC' : 'https://www.sofascore.com/pt/time/futebol/mirassol-fc/21982',
      'Santo André' : 'https://www.sofascore.com/pt/time/futebol/santo-andre/6966',
      'Guarani' : 'https://www.sofascore.com/pt/time/futebol/guarani/1972',
      'Portuguesa de Desportos' : 'https://www.sofascore.com/pt/time/futebol/portuguesa-de-desportos/21896',
      'Botafogo-SP' : 'https://www.sofascore.com/pt/time/futebol/botafogo-sp/1979',
      'EC Água Santa' : 'https://www.sofascore.com/pt/time/futebol/ec-agua-santa/135510',
      'Ferroviária' : 'https://www.sofascore.com/pt/time/futebol/inter-de-limeira/135526',
      'Inter de Limeira' : 'https://www.sofascore.com/pt/time/futebol/inter-de-limeira/135526' ,
      'São Bernardo' : 'https://www.sofascore.com/pt/time/futebol/sao-bernardo/47504',
      'Corinthians' : 'https://www.sofascore.com/pt/time/futebol/corinthians/1957'
    }
    await this.sleep(5000)
    Object.values(json).forEach(async el => {
      await this.sleep(5000)
      await this.page.goto(`${el}`)
      const a = await this.page.evaluate(() => {
        return document.querySelector('.sc-hLBbgP.hTmmUs').textContent
      })
      console.log(a)
    })
        

  }

  sleep(ms) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(true)
      }, ms)
    })
  }

}



module.exports = scrapperFootScrapper
