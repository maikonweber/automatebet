const link =  async () => {
    const hrefs = await page.$$eval('a', as => as.map(a => a.href));
    console.log(link)
}

const log = async (path, page) => {
 const name = await page.$eval(path, el => el.innerText)
 console.log(element, console.log('-----------------------Element', name))
}

const l = (log) => {
  console.log(log)
}

async function getTextEvalute (stringElement, page) {
  console.log('get element -> ', stringElement)
     const balance = await page.evaluate(() => {
        let result = document.querySelector()
        console.log(result)
        const text = result.innerHTML
        return text
      })
      return balance(stri)
    }

async function trySelector(path, xpath ,timeout, page) {
  try {
    if(path) {
    await page.waitForTimeout(timeout * 1000)
      const elementHandle = await page.$$(path)
      log(elementHandle[0])
      return elementHandle[0]
    } else {
    await page.waitForTimeout(timeout * 1000)
    const waitFor = await page.waitForSelector(xpath)
    log(waitFor)
    return waitFor
    }
  } catch (err) {
    console.log('---------------------------------------------')
    console.log(err)
    return
  }
}

async function waitGoto(url, timeout, page) {
    await page.goto(url, {waitUntil: 'networkidle0'});
    await console.log('------Go to ' + url +'--------')
    await page.waitForTimeout(timeout)
  }
  

module.exports ={
    trySelector,
    log,
    link,
    waitGoto,
    l,
    getTextEvalute
}