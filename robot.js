const puppeteer = require("puppeteer");
 
(async () => {
  const browserConfig = {
    headless: false,
    args: {
      "--start-maximized": true,
      "--disable-notifications": true,

      
    }
  };
  }

  const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage();

 
  await page.goto("https://launcher.betfair.com/?gameId=betfair-live-roulette-cptl&returnURL=https%3A%2F%2Fcasino.betfair.com%2Fpt-br%2Fp%2Fcassino-ao-vivo&launchProduct=gaming&RPBucket=gaming&mode=real&dataChannel=ecasino&switchedToPopup=true", {waitUntil: 'networkidle0'});
   

    const frame = await page.waitForSelector("iframe");
    const rect = await page.evaluate(el => {
            const {x, y} = el.getBoundingClientRect();
            return {x, y};
          }, frame);

      console.log(frame );


    
    setTimeout(async () => {
    }, 85000);



//   const login = await page.$('#login-form');
//     await login.click();


//   // Find the iframe
//   const frame = await page.waitForSelector("iframe");
  // Find its coordinates
//   const rect = await page.evaluate(el => {
//     const {x, y} = el.getBoundingClientRect();
//     return {x, y};
//   }, frame);
 
  // Values found manually by doing 
  // `document.querySelector('.yscp_link').getBoundingClientRect()`
  // in the dev console. Add 5 to them, because it's the top left corner
//   const offset = {x: 213 + 5, y: 11 + 5};
 
//   // Click
//   await page.mouse.click(rect.x + offset.x, rect.y + offset.y);
 
//   await frame.waitForNavigation({
//     waitUntil: 'networkidle2',
//   });
 
//   await page.screenshot({ path: "example.png" });
 
//   await browser.close();
})();