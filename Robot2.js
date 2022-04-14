const puppeteer = require("puppeteer");
 
 async function loginRoullete(username, password) {
    const browser = await puppeteer.launch({ 
      headless: false,
      

    });
  const page = await browser.newPage(
  
  );

  await page.goto("https://player.smashup.com/player_center/goto_common_game/5941/1000000", {waitUntil: 'networkidle0'});


 }
