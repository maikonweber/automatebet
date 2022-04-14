const puppeteer = require("puppeteer");
 
 async function loginRoullete(username, password) {
    const browser = await puppeteer.launch({ 
      headless: false,
      defaultViewport: {
        width: 1920,
        height: 1080
      },
      slowMo : 50,
      args: [
        '--disable-web-security',
        '--disable-features=IsolateOrigins,site-per-process',
        '--start-maximized'
      ],  
      devTools: true, 
        
    });
  const page = await browser.newPage(
  
  );

  await page.goto("https://player.smashup.com/iframe/auth/login", {waitUntil: 'networkidle0'});

  const sideicons = "#trn";
  const xPathEvolution = '/html/body/main/section[2]/div/div/div/div[2]/figure/a';
  const Roullete = '#Thumbnail--c01d7 AnimateZoom--c472b'
  const link = 'https://www.smashup.com/'

  const elementNumber = "#number-container--c5cdb recent-number--1a19f desktop--b8c6b";



    try {
      const element_ = await page.$('#username');
      const elementPass_ = await page.$('#password');
      if (element_ && elementPass_) {
        // Send keys to the element
        await element_.type(username);
        await elementPass_.type(password);
        await page.keyboard.press('Enter');

        await page.waitForTimeout(15000);
      } else {
        console.log("Element not found");
      }
    } catch (error) {
      console.log(error);
    }

    await page.goto('https://player.smashup.com/player_center/goto_common_game/5941/1000000', {waitUntil: 'networkidle0'});

    await page.waitForTimeout(15000);
    var frames = (await page.frames());
    const a = frames[1].url();
    await page.goto(a, {waitUntil: 'networkidle0'});
    
    await page.waitForTimeout(15000);
    
    const w = await page.waitForXPath('/html/body/div[5]/div/div/div/div[3]/div[2]/div[5]/div/div/div[2]/div[1]/div/div')
    w.click();
    await page.waitForTimeout(15000);
    const x = await page.waitForXPath('/html/body/div[5]/div/div/div/div[3]/div[3]/div/div/div/div[1]/div/div[2]/div[2]')
    x.click();
    await page.waitForTimeout(15000);
    const elementX = page.$$(elementNumber);
    const elementX_ = await elementX[0].$$(elementNumber);


  

    //   try {
    //   await page.$x('/html/body/main/section[2]/div/div/div/div[2]/figure/a');
    //   await page.click(xPathEvolution);
    //       try  { 
    //         await page.waitForSelector('#Thumbnail--c01d7 AnimateZoom--c472b');
    //         let lett = await page.$('#Thumbnail--c01d7 AnimateZoom--c472b');
    //         await lett.click();
    //   } catch (error) {
    //         console.log(error);
    //     }
    //   } catch (error) {
    //     console.log(error);
    //     }
    // } catch (error) {
    //   console.log(error);
    // }

 
   

 
       
  //       } else {

  //       }
  //     } else {
  //       console.log('Element not found');
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }

  // await page.on('console', async (msg) => {
  //   // for (let i = 0; i < msg.args().length; ++i) {
  //   //   // consle.log(`${i}: ${msg.args()[i]}`);
  //   // }

  // const text = msg.text();
 
  // if (text.includes('endBettingRound()')) {
  //   console.log('Rodada de Aposta Finalizada');
  // }

  // if (text.includes('Game.State.Round Finished ')) {
  //   console.log('Game Finalizado');
  //   const elem  = await page.waitForXPath('//*[@id="root"]/div/div[3]/div[1]/div[2]/div[9]/div/div[2]/div', {timeout: 5000});
  //   elem.screenshot({path: './screenshot.png'});
  // }
  
  // if (text.includes('Start')) {
  //   console.log('Game Iniciado');
  // }
   
  // });

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
