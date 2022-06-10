const { TelegramClient, Api } = require('telegram');
const { StringSession } = require('telegram/sessions');
const input = require('input'); // npm i input
const { getStrategyByRoullet } = require('./database')
// Redis
const redis = require('redis');
const arrayName = require('./jsonObjects/RoleteNames');
const jsonRoullete = require('./jsonObjects/jsonOfhtml');
const clientRedis = redis.createClient({
     host: '127.0.0.1',
     port: 6379,
     expire: 180
});
const expectNumber = require('./jsonObjects/strategy.js');
clientRedis.connect();
// get all key in redis
(async () => {

console.log("Initializing...");
console.log("Consumer memory and strategy...");
/* 
     @dev | Send msg to redisChannel proceed strategya and save detect
*/

async function SendMessage(msg) {
     console.log('Envianado a msg de processamento para canal' - "---")
     // Redis channel bet
     const channel = 'BetRollet';
     const message = JSON.stringify(msg);
          await clientRedis.publish(channel, message);
          return true;      
}

// (async () => {
//const client = new TelegramClient(stringSession, apiId, apiHash, {
  //  connectionRetries: 5,
  //})



async function strategyMemory(number, expectNumber, estrategiaDetect, rouletteName, objetoRolleta) {
     // Is Strategia for detectado criar um chave no redis com o número do jso
     
     console.log("Stratey Memory...");
     const date = new Date().getTime()

   
     const verifyEstrategia = await clientRedis.get(`${rouletteName}_${estrategiaDetect}`)
     strategyConsult(rouletteName, estrategiaDetect, number, expectNumber, objetoRolleta)
     
     if (verifyEstrategia) {
          return 'Estratégia já foi usada'

     } else {
          const setMemory = await clientRedis.set(`${rouletteName}_${estrategiaDetect}`, JSON.stringify({objetoRolleta, number, expectNumber, estrategiaDetect}), {
          EX: 360
          })
          console.log('Setando a memória: ', setMemory)
          // await sendMsg('-1266295662', objSend[`${estrategiaDetect}`](number, expectNumber, rouletteName, objetoRolleta, estrategiaDetect))
          // await sendMsg('-1614635356', objSend[`${estrategiaDetect}`](number, expectNumber, rouletteName, objetoRolleta, estrategiaDetect))
          // await sendMsg('-1267429660', objSend[`${estrategiaDetect}`](number, expectNumber, rouletteName, objetoRolleta, estrategiaDetect))     
          }
    

}



function regExe(string, objetoRolleta, strategyArg) {
     // RegEx Nao Intendificado
     // if true return false
   
     const regEx = /Não identificado/g;
     if (regEx.test(string)) {
          return false
     } else {
          strategyMemory(objetoRolleta.numberjson, expectNumber[`${string}`](), string, objetoRolleta.roulletename, objetoRolleta) 
     return true
     }
}

async function strategyConsultFor18(newArray)  {
     const columa1 = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34]
     const coluna2 = [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35]
     const coluna3 = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36]
     const bloco1 = [1, 2, 3, 4,5, 6, 7, 8, 9, 10, 11, 12]
     const bloco2 = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
     const bloco3 = [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36]
     const red = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36]
     const green = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35, 0]
     const OneTo18 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 0]
     const x19To36 = [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 0]

     let colunas = []
     for(let i = 0; i < newArray.length; i++) {
          if (columa1.includes(newArray[i])) {
               return colunas.push(columa1)
          } else if (coluna2.includes(newArray[i])) {
               return colunas.push(coluna2)
          } else if (coluna3.includes(newArray[i])) {
               return colunas.push(coluna3)
          } else {
               return colunas.push(newArray[i])
           }
     } 
     let strategyProccess  = { 
          colunas : colunas,
     }

     return strategyProccess
}



async function strategyProced (objetoRolleta) {
     console.log('Consultando Strategia Proced')

     // Strategy Proced
     const last18 = objetoRolleta.last18
     const concat = last18[0].concat(last18[1])
     // Remove every time the 10th element of array and make a new array com rest of elements
     const newArray = concat.filter((item, index) => index % 10 !== 9)

     strategyConsultFor18(newArray)

     const nineteenTo36 = objetoRolleta.jsonbstrategy.nineteenTo36    
     console.log('Consultando Strategia Proced', nineteenTo36)
     const strategRed = objetoRolleta.jsonbstrategy.strategyRed
     const strategGree = objetoRolleta.jsonbstrategy.strategyGreen
     const s18to39 = objetoRolleta.jsonbstrategy.strategy19to39
     const oneTo18 = objetoRolleta.jsonbstrategy.strategyOneTo18
     const parRepeat = objetoRolleta.jsonbstrategy.strategyParReapeat
     const duziaReapt = objetoRolleta.jsonbstrategy.strategyDuziaRepeat
     const imparReapt = objetoRolleta.jsonbstrategy.strategyImparReapeat
     const columnsReapt = objetoRolleta.jsonbstrategy.strategyColumnReapeat
     const alternateColumns = objetoRolleta.jsonbstrategy.strategyAlternateColum
     const red4time = objetoRolleta.jsonbstrategy.strategyRed4Time

     await SendMessage(objetoRolleta)
     

          regExe(strategRed, objetoRolleta, 'red')
          regExe(s18to39, objetoRolleta, 's18to39')
          regExe(oneTo18, objetoRolleta, 'oneTo18')
          regExe(parRepeat, objetoRolleta, 'parRepeat')
          regExe(duziaReapt,  objetoRolleta, 'duziaReapt')
          regExe(imparReapt, objetoRolleta, 'imparReapt')
          regExe(columnsReapt, objetoRolleta, 'columnsReapt')
          regExe(alternateColumns, objetoRolleta, 'alternateColumns')
          
}

     


async function strategyConsult(rouletteName, estrategiaDetect, number) {
      //setTimeout( async () => {
     //console.log('Consultando Strategia')
     //console.log('Timeout Resolve Strategy')
     //const result = await getStrategyByRoullet(rouletteName)
     //const client = await clientRedis.get(`${rouletteName}_${estrategiaDetect}`)
     // const parseClient = JSON.parse(client)
     // const lastResult = result[0].numberjson
     //const expectNumberArray = parseClient.expectNumber
     //console.log(expectNumberArray, 'number')
     

     //if (parseClient.expectNumber.includes(lastResult[0])) {
        //  clientRedis.del(`${rouletteName}_${estrategiaDetect}`)
          //await sendMsg('-1266295662', `${rouletteName}, ✅ GREEEN BATEU A META VAZA!, ${lastResult[0]} || ${lastResult[1]} || ${lastResult[2]}`)
          
     // } else {
       //   clientRedis.del(`${rouletteName}_${estrategiaDetect}`)
          //await sendMsg('-1266295662', `${rouletteName}, 🔴 REED, RESPIRA E VOLTA MAIS TARDE, ${lastResult[0]} || ${lastResult[1]} || ${lastResult[2]}`)
     //}    
    // }, 40000)  
}



//await client.start({
 //   phoneNumber: async () => await input.text('Please enter your number: '),
   // password: async () => await input.text('Please enter your password: '),
    //phoneCode: async () =>
      //await input.text('Please enter the code you received: '),
   // onError: (err) => console.log(err),
  //});
//console.log('You should now be connected.');
//console.log(client.session.save()); // Save this string to avoid logging in again
  //await client.connect();
    //console.log('You should now be logged in.');


//const result = await client.invoke( new Api.messages.GetAllChats({
    //    exceptIds : [43]
  //  }) );

// async function sendMsg(sala, msg) {
     //const salaEntity = await client.getEntity(sala)

    // console.log(salaEntity)

  //   await client.invoke( new Api.messages.SendMessage({
   //       peer: salaEntity,
    //      message: msg.toString()
    // }) );
     //}

    //for(let i = 0; i < result.chats.length; i++){
      //  console.log(result.chats[i].id, result.chats[i].title)
   // }

// -1150553286 } MÁFIA DA ROLETA - [VIP] 🎰💰
// Integer { value: 1266295662n } VR BOT
// Integer { value: 1267429660n } MÁFIA DA ROLETA - [FREE] 🎰💰
// Integer { value: 1581808712n } NOVA MINING INVESTMENT
// Integer { value: 1614635356n } Mesa VIP | Bot Cassino 🎰
// Integer { value: 1629499483n } RoosterBattle - Brazilian Community


setInterval(() => {
     console.log('thick')
     arrayName.forEach(async (Element) => {
          const result = await getStrategyByRoullet(Element)
          // Match RegEx Nao Indenticado for Result strateg
          
          result.forEach(async (estrategia) => {
          if(estrategia.jsonbstrategy.last18.fistRow.numberjson) {
               let obj = {
               'roulletename' : estrategia.name,
               'jsonbstrategy'  :   estrategia.jsonbpreload,
               'numberjson'   :  estrategia.numberjson,
               'objsResult' : estrategia,
               'last18' : [estrategia.jsonbstrategy.last18.fistRow.numberjson,estrategia.jsonbstrategy.last18.lastRow.numberjson]
                }
          //console.log(obj)  
               strategyProced(obj)
          } else {
          console.log(`Payload nao esta comprometido ${estrategia.name}`)
          
     }
     })
})
}, 35000 / 2)

})()
