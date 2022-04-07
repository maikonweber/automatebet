const puppeteer = require("puppeteer");
 
 async function loginRoullete(username, password) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto("https://launcher.betfair.com/?gameId=betfair-live-roulette-cptl&returnURL=https%3A%2F%2Fcasino.betfair.com%2Fpt-br%2Fp%2Fcassino-ao-vivo&launchProduct=gaming&RPBucket=gaming&mode=real&dataChannel=ecasino&switchedToPopup=true", {waitUntil: 'networkidle0'});
    try {   
        const element = await page.$('#onetrust-accept-btn-handler');
        if (element) {
          await element.click();
        } else {
          console.log('Element not found');
        }
    } catch (error) {
      console.log(error);    
    }
  
    try {
      const element_ = await page.$('#username');
      const elementPass_ = await page.$('#password-label');
      if (element_ && elementPass_) {
        // Send keys to the element
        await element_.type(username);
        await elementPass_.type(password);
        await page.keyboard.press('Enter');

      } else {
        console.log('Element not found');
      }
    } catch (error) {
      console.log(error);
    }


  await page.waitForTimeout(35000);

  // await page.on('console', msg => {
  //   for (let i = 0; i < msg.args().length; ++i)
  //     console.log(`${i}: ${msg.args()[i]}`);

  // });

  // await page.on('request', request => {
  //   console.log(request.url());
  //   console.log(request.headers());
  // });


//  const elem = await page.metrics()
//     console.log(elem);

  const conten = await page.content();
  console.log(conten)


  
  

}



module.exports = {
  loginRoullete
}
