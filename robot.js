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

  await page.on('console', async (msg) => {
    // for (let i = 0; i < msg.args().length; ++i) {
    //   // consle.log(`${i}: ${msg.args()[i]}`);
    // }

  const text = msg.text();
 
  if (text.includes('endBettingRound()')) {
    console.log('Rodada de Aposta Finalizada');
  }

  if (text.includes('Game.State.Round Finished ')) {
    console.log('Game Finalizado');
    const elem  = await page.waitForXPath('//*[@id="root"]/div/div[3]/div[1]/div[2]/div[9]/div/div[2]/div', {timeout: 5000});
    elem.screenshot({path: './screenshot.png'});
  }
  
  if (text.includes('Start')) {
    console.log('Game Iniciado');
  }
   
  });

  // Select with xPath //*[@id="root"]/div/div[3]/div[1]/div[2]/div[9]/div/div[2]/div

  // await page.on('request', request => {
  //   console.log(request.url());
  //   console.log(request.headers());
  // });


//  const elem = await page.metrics()
//     console.log(elem)


  
  

}



module.exports = {
  loginRoullete
}
