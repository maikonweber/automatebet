
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
        headless: false,
        ignoreHTTPSErrors: true,
        args: [
            '--disable-gpu',
            '--disable-dev-shm-usage',
            '--disable-setuid-sandbox',
            '--no-first-run',
            '--no-sandbox',
            '--no-zygote',
            '--single-process',
            '--window-size=920,850'

        ],
        defaultViewport: {
            width: 920,
            height: 850
        }
    }).then(async browser => {
        const page = await browser.newPage();
        await page.goto('https://blaze.com/pt/games/crash');
        await page.waitForTimeout(5000);
        let a = await page.$$('a')
        console.log(a[1], '\n', a[0])
        await page.goto('https://blaze.com/pt?modal=auth&tab=login');
        let input =  await page.$$('input')
        console.log(input[0], '\n', input[1])

        try {
            // Send Key to input
            await page.waitForTimeout(500)
            await input[1].type(this.username)
            await input[2].type(this.password)
            await page.waitForTimeout(500)
            await page.keyboard.press('Enter')
            await page.waitForTimeout(5000)
            await page.goto('https://blaze.com/pt/games/crash');
            this.page = page
            this.page.reload()
        } catch (error) {
            console.log('Erro', error)
        }
    })
}

async Entry() {
    let inputGame = await this.page.$$('input')
    await inputGame[0].type(this.valor)
    await inputGame[1].type(this.autoretirar)
    await this.page.waitForTimeout(5000)
    await this.page.$$('button')[4].click()
    console.log('Aposta Feita')
    await this.page.waitForTimeout(5000)
}

 async getEntry() {
    // Moment now timezone Sao Paulo
    this.init()
    setInterval(async () => {   
        let time = moment().tz('America/Sao_Paulo');

    // horario for 
    this.horario.forEach(element => {
        if(element == time.format('HH:mm')) {
            console.log('Entre agora ')
            this.horario.splice(this.horario.indexOf(element), 1);
            this.Entry()
    }

}, 5000);
    });
 }


        
       
        // await page.waitFor(5000);
        // Select all input of page
        // const divCount = await page.$$('input');
        // console.log(divCount[0]);
        // divCount[0].type('2');
        

        // await page.waitFor(5000);
}

const blaze = new Blaze('2' , 'mateusv.aranha@gmail.com', '#100210aranhA', [
    '13:51',
    '13:52',
    '13:53',
    '13:54',
    '13:55',
    '13:56',
    '13:57',
    '13:58',
    '13:59',
    '14:00',
    '14:01',
    '14:02',
    '14:03',
    '14:04',
    '14:05',
    '14:06',
    '14:07',
    '14:08',
    '14:09',
    '14:10',
    '14:11',
    '15:00',
    '15:50',
    '16:57',
    '17:25',
    '17:26',
    '17:30',
    '17:36',
    '17:45',


], '1,90');

blaze.getEntry();


module.exports = Blaze;

