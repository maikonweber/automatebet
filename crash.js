
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const puppeteer = require("puppeteer-extra");
puppeteer.use(StealthPlugin());
const moment = require('moment');



class Blaze {
    // Initial puppeter
    constructor (username, password, horario) {
        this.browser = null;
        this.page = null;
        this.username = username;
        this.password = password;
        this.horario = horario;
    
    }


    async init() {
    puppeteer.launch({
        headless: false,
        args: [
            '--disable-gpu',
            '--disable-dev-shm-usage',
            '--disable-setuid-sandbox',
            '--no-first-run',
            '--no-sandbox',
            '--no-zygote',
            '--single-process',
        ],
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
            await page.waitForTimeout(10000)
            await input[1].type(username)
            await input[2].type(password)
            await page.waitForTimeout(10000)
            await page.keyboard.press('Enter')
            await page.waitForTimeout(15000)
            await page.goto('https://blaze.com/pt/games/crash');

            this.page = page;

        } catch (error) {
            console.log('Erro', error)
        }
    })
}

 async getEntry(horario) {
    const page = this.page;
    console.log('Interval');
    let date = new Date();
    let hour = date.getHours().toString();
    let minute = date.getMinutes().toString().padStart(2, '0');
    let second = date.getSeconds();
    let time = hour + ':' + minute 
    console.log(time);
    listRow.forEach(function(row) {
        let rows = row.match(/[0-9][0-9]\:[0-9][0-9]/g);
        if (rows != null) {
            if (rows[0] == time) {
        

                    });
                });
            });


   
    



    }

    


        
       
        // await page.waitFor(5000);
        // Select all input of page
        // const divCount = await page.$$('input');
        // console.log(divCount[0]);
        // divCount[0].type('2');
        

        // await page.waitFor(5000);

}
}


module.exports = Blaze;

