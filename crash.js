
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const puppeteer = require("puppeteer-extra");
puppeteer.use(StealthPlugin());
// Moment timezone Sao Paulo
const moment = require('moment-timezone');
 




class Blaze {
    // Initial puppeter
    constructor (valor, username, password, horario, autoretirar) {
        this.browser = null;
        this.page = null;
        this.username = username;
        this.password = password;
        this.horario = horario;
        this.valor = valor;
        this.autoretirar = autoretirar;
    
    }


async init() {
    puppeteer.launch({
        executablePath: '/usr/bin/google-chrome-stable',
        headless: false,
        ignoreHTTPSErrors: true,
        args: [
            '--no-sandbox',
            '--single-process',
            '--window-size=920,850'
        ],
        defaultViewport: {
            width: 920,
            height: 850
        }
    }).then(async browser => {
     
        const page = await browser.newPage();
        this.page = page
        await this.page.goto('https://blaze.com/pt/games/crash');
        await this.page.waitForTimeout(5000);
        let a = await this.page.$$('a')
        console.log(a[1], '\n', a[0])
        await this.page.goto('https://blaze.com/pt?modal=auth&tab=login');
        let input =  await this.page.$$('input')
        console.log(input[0], '\n', input[1])
        
        try {
            // Send Key to input
            await this.page.waitForTimeout(7500)
            await input[1].type(this.username)
            await input[2].type(this.password)
            await this.page.waitForTimeout(500)
            await this.page.keyboard.press('Enter')
            await this.page.waitForTimeout(5000)
            await this.page.goto('https://blaze.com/pt/games/crash');
            this.page.reload()
        } catch (error) {
            console.log('Erro', error)
        }
    })
}

async Entry() {
    try {
    let inputGame = await this.page.$$('input')
    await inputGame[0].type(this.valor)
    await inputGame[1].type(this.autoretirar)
    await this.page.waitForTimeout(15000)
    let button = await this.page.$$('button')
    console.log(button)
    await button[6].click()
    await this.page.waitForTimeout(5000)
    console.log('Aposta Feita')
    await this.page.waitForTimeout(15000)
    if (this.horario.length === 0) {
        this.browser.close()
    }
    } catch (error) {
        console.log('Erro', error)
    }
}

 async getEntry() {
    // Moment now timezone Sao Paulo
    this.init()

    setInterval(async () => {   
        
    let time = moment().tz('America/Sao_Paulo');
    if (this.page != null) {
    this.horario.forEach(element => {
        if(element == time.format('HH:mm')) {
            console.log('Entre agora ')
            this.horario.splice(this.horario.indexOf(element), 1);
            this.Entry()
            return
    }

    }, 7000);

 }});
 }

 

}



module.exports = Blaze;

