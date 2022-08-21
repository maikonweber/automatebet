
async function getRoleta(page) {
// await sleep(8000)
// await page.evaluate(() => {
//   document.querySelector('.livecasino a').click()
// })
await page.goto('https://player.smashup.com/player_center/goto_common_game/5941/1000000')

 await sleep(8000)
  var frames = (await page.frames());
  const a = frames[1].url();
  await page.goto(a, {waitUntil: 'networkidle0'});
  await sleep(8000)

 await page.evaluate(() => {
    let arrayElement = document.querySelectorAll('.CategoryIcon--647f6')
    console.log(arrayElement)
    arrayElement[1].click()
 })    

 await page.evaluate(() => {
   let arrayElement = document.querySelectorAll('img')
   console.log(arrayElement)
 }) 

 setInterval(async  () => {
    const pagex = await page.evaluate(() => {
      var payload = []
      const history = document.querySelectorAll('article')
      history.forEach((Element) => {
        var rou = {}
        const name = Element.querySelector('p').innerText
        rou.name = name
        const node = Element.querySelectorAll('.HistoryGridItem--237f9')
        rou.number = []
        node.forEach((el) => {
          const number =  el.innerText
          let newNumber = number.replace(/\n[0-9]*x/g, '')
          let new1Number = newNumber.replace(/\n[0-9]*/g, '')
          let int_ = parseInt(new1Number)
          
          rou.number.push(int_)
          return
          })
          console.log(rou)
          payload.push(rou)
        })
        console.log(payload)
        return payload
      })


    pagex.forEach((el) => {
      console.log(el)
      axios.post('http://localhost:3055/api/evolution', el).then((result) => {
      console.log(result.data)
    }).catch((erro) => {
      console.log(erro)
    })
  })

    await page.waitForTimeout(12000)
    
    await page.evaluate(() => {
      let arrayElement = document.querySelectorAll('.CategoryIcon--647f6')
      console.log(arrayElement)
      arrayElement[5].click()
    })
    
    const shows = await page.evaluate(() => {
      var payload = []
      const history = document.querySelectorAll('article')
      history.forEach((Element) => {              
        var rou = {}
        const name = Element.querySelector('p').innerText
        rou.name = name
        const node = Element.querySelectorAll('.HistoryGridItem--237f9')
        rou.number = []
        node.forEach((el) => {
          const number =  el.innerText
          let newNumber = number.replace(/\n[0-9]*x/g, '')
          rou.number.push(newNumber)
          return
          })
          console.log(rou)
          payload.push(rou)
        })
        console.log(payload)
        return payload
      })

      if(shows.lenght < 1) {
        process.exit(1)
      }

    shows.forEach((elem) =>  {
      console.log(elem)
      if((/Football/g).test(elem.name) || (/Futbol/g).test(elem.name) ) {
      axios.post('http://localhost:3055/api/cards_', elem).then((result) => {
      console.log(result.data)
      }).catch((erro) => {
      console.log(erro)
      })
      }
    })

    await page.evaluate(() => {
      let arrayElement = document.querySelectorAll('.CategoryIcon--647f6')
      console.log(arrayElement)
      arrayElement[1].click()
    })
    
    await page.waitForTimeout(700)
  }, 8000) 
}

module.exports = getRoleta;