const { TelegramClient, Api } = require('telegram');
const { StringSession } = require('telegram/sessions');
const input = require('input'); // npm i input
const { getStrategyByRoullet } = require('./database')
const {
     BlocosRepeat,
     ColunasRepeat,
     redReapeat,
     parOuImpar,
     on18or36
} = require('./jsonObjects/jsonStrategy.js')

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
     const par = [2, 4, 6, 8,  10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36]
     const impar = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35]
     const bloco1 = [1, 2, 3, 4,5, 6, 7, 8, 9, 10, 11, 12]
     const bloco2 = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
     const bloco3 = [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36]
     const red = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36]
     const green = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35, 0]
     const OneTo18 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 0]
     const x19To36 = [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 0]

     let colunas = []
     let blocos = []
     let reds = []
     let greens = []
     let OneTo18s = []
     let imparx = []
     let parx = []

     for(let i = 0; i < newArray.length; i++) {
          if (columa1.includes(newArray[i])) {
               colunas.push(1)
          } else if (coluna2.includes(newArray[i])) {
               colunas.push(2)
          } else if (coluna3.includes(newArray[i])) {
               colunas.push(3)
          } else {
               colunas.push(0)
          }
     }
     for(let i = 0; i < newArray.length; i++) {
          if (bloco1.includes(newArray[i])) {
               blocos.push(1)
          } else if (bloco2.includes(newArray[i])) {
               blocos.push(2)
          } else if (bloco3.includes(newArray[i])) {
               blocos.push(3)
          } else {
               blocos.push(0)
          }
     }

     for(let i = 0; i < newArray.length; i++) {
          if (red.includes(newArray[i])) {
               reds.push(1)
          } else {
               reds.push(0)
          }
     }
     for(let i = 0; i < newArray.length; i++) {
          if (green.includes(newArray[i])) {
               greens.push(1)
          } else {
               greens.push(0)
          }
     }
     for(let i = 0; i < newArray.length; i++) {
          if (OneTo18.includes(newArray[i])) {
               OneTo18s.push(1)
          } else if (x19To36.includes(newArray[i])) {
               OneTo18s.push(2)
          } else {
               OneTo18s.push(0)
          }
     }

    
     for(let i = 0; i < newArray.length; i++) {
     
          if (par.includes(newArray[i])) {
               parx.push(1)
          } else {
               parx.push(0)
          } 
     
     }
     let strategyProccess  = { 
          colunas : colunas,
          blocos : blocos,
          reds : reds,
          greens : greens,
          OneTo18s : OneTo18s,
          parOrImpar : parx,
     }

     return strategyProccess


}

const {
     BlocosRepeat,
     ColunasRepeat,
     redReapeat,
     blackRepeat,
     parOuImpar,
     on18or36
} = require('./jsonObjects/jsonStrategy.js')

function getStrategy(strategy, value, number){
     // Received the number of element need remove to value array
     // Return the array with the element removed
     console.log(strategy)
     const array = value
     const arrayRemove = value.slice(0, value.length - number)
     const StringValue = arrayRemove.toString()
     console.log(StringValue)

     if(strategy[`${StringValue}`]) {
         return strategy[`${StringValue}`]();
     } 
     return `Não identificado`;
     }



async function strategy18Procced (strategy) {
    console.log(strategy)

     const stringColunas = strategy.colunas
     const stringBlocos = strategy.blocos
     const stringRed = strategy.greens
     const stringOneTo18 = strategy.oneTo18
     const stringX19To36 = strategy.x19To36
     const stringParOuImpar = strategy.parOuImpar
     
     const bloco17 = getStrategy(BlocosRepeat, stringBlocos, 1)
     const colunas17 = getStrategy(ColunasRepeat, stringColunas, 1)
     const redReapeat17 = getStrategy(redReapeat, stringRed, 1)
     const parOuImpar17 = getStrategy(parOuImpar, stringParOuImpar, 1)
     const one19or3617 = getStrategy(on18or36, stringOneTo18, 1)
     const blackRepeat = getStrategy(blackRepeat, stringX19To36, 1)
     
     const bloco16 = getStrategy(BlocosRepeat, stringBlocos, 2)
     const colunas16 = getStrategy(ColunasRepeat, stringColunas, 2)
     const redReapeat16 = getStrategy(redReapeat, stringRed, 2)
     const parOuImpar16 = getStrategy(parOuImpar, stringParOuImpar, 2)
     const one19or3616 = getStrategy(on18or36, stringOneTo18, 2)
     const blackRepeat16 = getStrategy(blackRepeat, stringX19To36, 2)

     const bloco15 = getStrategy(BlocosRepeat, stringBlocos, 3)
     const colunas15 = getStrategy(ColunasRepeat, stringColunas, 3)
     const redReapeat15 = getStrategy(redReapeat, stringRed, 3)
     const parOuImpar15 = getStrategy(parOuImpar, stringParOuImpar, 3)
     const one19or3615 = getStrategy(on18or36, stringOneTo18, 3)
     const blackRepeat15 = getStrategy(blackRepeat, stringX19To36, 3)


     const bloco14 = getStrategy(BlocosRepeat, stringBlocos, 4)
     const colunas14 = getStrategy(ColunasRepeat, stringColunas, 4)
     const redReapeat14 = getStrategy(redReapeat, stringRed, 4)
     const parOuImpar14 = getStrategy(parOuImpar, stringParOuImpar, 4)
     const one19or3614 = getStrategy(on18or36, stringOneTo18, 4)
     
     const bloco13 = getStrategy(BlocosRepeat, stringBlocos, 5)
     const colunas13 = getStrategy(ColunasRepeat, stringColunas, 5)
     const redReapeat13 = getStrategy(redReapeat, stringRed, 5)
     const parOuImpar13 = getStrategy(parOuImpar, stringParOuImpar, 5)
     const one19or3613 = getStrategy(on18or36, stringOneTo18, 5)

     const bloco12 = getStrategy(BlocosRepeat, stringBlocos, 6)
     const colunas12 = getStrategy(ColunasRepeat, stringColunas, 6)
     const redReapeat12 = getStrategy(redReapeat, stringRed, 6)
     const parOuImpar12 = getStrategy(parOuImpar, stringParOuImpar, 6)
     const one19or3612 = getStrategy(on18or36, stringOneTo18, 6)

     const bloco11 = getStrategy(BlocosRepeat, stringBlocos, 7)
     const colunas11 = getStrategy(ColunasRepeat, stringColunas, 7)
     const redReapeat11 = getStrategy(redReapeat, stringRed, 7)
     const parOuImpar11 = getStrategy(parOuImpar, stringParOuImpar, 7)
     const one19or3611 = getStrategy(on18or36, stringOneTo18, 7)

     let obj = {
          blackRepeat : blackRepeat,
          blackRepeat16 : blackRepeat16,
          bloco17 : bloco17,
          colunas17 : colunas17,
          redReapeat : redReapeat,
          parOuImpar : parOuImpar,
          one19or36 : one19or36,
          bloco16 : bloco16,
          colunas16 : colunas16,
          redReapeat16 : redReapeat16,
          parOuImpar16 : parOuImpar16,
          one19or3616 : one19or3616,
          bloco15 : bloco15,
          colunas15 : colunas15,
          redReapeat15 : redReapeat15,
          parOuImpar15 : parOuImpar15,
          one19or3615 : one19or3615,
          bloco14 : bloco14,
          colunas14 : colunas14,
          redReapeat14 : redReapeat14,
          parOuImpar14 : parOuImpar14,
          one19or3614 : one19or3614,
          bloco13 : bloco13,
          colunas13 : colunas13,
          redReapeat13 : redReapeat13,
          parOuImpar13 : parOuImpar13,
          one19or3613 : one19or3613,
          bloco12 : bloco12,
          colunas12 : colunas12,
          redReapeat12 : redReapeat12,
          parOuImpar12 : parOuImpar12,
          one19or3612 : one19or3612,
          bloco11 : bloco11,
          colunas11 : colunas11,
          redReapeat11 : redReapeat11,
          parOuImpar11 : parOuImpar11,
          one19or3611 : one19or3611
     }
     // Convert array to string
     console.log(obj)
     return obj;
}


async function strategyProced (objetoRolleta) {
     console.log('Consultando Strategia Proced')

     // Strategy Proced
     const last18 = objetoRolleta.last18
     const concat = last18[0].concat(last18[1])
     // Remove every time the 10th element of array and make a new array com rest of elements
     const newArray = concat.filter((item, index) => index % 10 !== 9)

     const strategyProcess = await strategyConsultFor18(newArray)
     objetoRolleta.detectStrategy = await strategy18Procced(strategyProcess)

     const nineteenTo36 = objetoRolleta.jsonbstrategy.nineteenTo36    
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
          if(estrategia.jsonbstrategy.last18.fistRow) {
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
