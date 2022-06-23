const { TelegramClient, Api } = require('telegram');
const { StringSession } = require('telegram/sessions');
const input = require('input'); // npm i input
const { getStrategyByRoullet , getLastNumber18,} = require('./database')
const {
     blocosRepeat,
     ColunasRepeat,
     redReapeat,
     alternateColumns,
     on18or36,
     
     parOuImpar,
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

/*
     @dev Maikon Weber
     @logic Processa o ultimo resultado da rolleta
     e envia para um canal redis   
*/


const expectNumber = require('./jsonObjects/strategy.js');
const { last } = require('cheerio/lib/api/traversing');

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








async function strategyConsultFor18(newArray)  {
     const columa1 = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34]
     const coluna2 = [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35]
     const coluna3 = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36]
     const par = [2, 4, 6, 8,  10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36]
     const impar = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35]
     const bloco1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
     const bloco2 = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
     const bloco3 = [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36]
     const red = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36]
     const green = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35]
     const OneTo18 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
     const x19To36 = [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36]

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
          } else if (green.includes(newArray[i])) {
               reds.push(2)
          } else {  
               reds.push(3)
          }
     }
     for(let i = 0; i < newArray.length; i++) {
          if (green.includes(newArray[i])) {
               greens.push(1)
          } else if (red.includes(newArray[i])) {
               greens.push(2)
          }
          else {
               greens.push(3)
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
          } else if (impar.includes(newArray[i])) {
               parx.push(2)
          }
          else {
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
          imparOrPar : imparx
     }



     return strategyProccess


}

function restOfNumber (value, spectNumber, number, string) {
     const array = new Array(...value)

     for(number; number > 0; number--) {
          array.pop()
     }
     
     if(!array.includes(spectNumber)) {
          return `Ausencia da ${string}`;
     } 
     return `Nao Identificado`
}


function getStrategy(strategy, value, number){
     // Received the number of element need remove to value array
     // Return the array with the element removed

     const array = new Array(...value)  // Copy the array     
     // remove the element from the array
     for(number; number > 0; number--) {
          array.pop()     
     }
     const StringValue = array.toString()

     if(strategy[`${StringValue}`]) {
         return strategy[`${StringValue}`]();
     } 
     return `Não identificado` ;
     }



async function strategy18Procced (strategy) {
     
     const stringColunas = strategy.colunas
     const stringBlocos = strategy.blocos
     const stringRed = strategy.reds
     const stringGreen = strategy.greens
     const stringOneTo18 = strategy.OneTo18s
     const stringParOuImpar = strategy.parOrImpar


          
     let strategyProced = {

     }    

     let times = 18
     let array = []



     //parOuImpar,
     let arrayColunas1Ausencia = []
     for(let i = 0; i < times; i++){    
          let value = restOfNumber(strategy.colunas, 1, i, 'Colunas 1')
          arrayColunas1Ausencia.push({
               coluna : value
          })
     }

     let arrayColunas2Ausencia = []
     for(let i = 0; i < times; i++){    
          let value = restOfNumber(strategy.colunas, 2, i,  'Colunas 2')
          arrayColunas2Ausencia.push({
               coluna : value
          })
     }

     let arrayColunas3Ausencia = []
     for(let i = 0; i < times; i++){    
          let value = restOfNumber(strategy.colunas, 3, i,  'Colunas 3')
          arrayColunas3Ausencia.push({
               coluna : value
          })
     }

     let arrayBloco1Ausencia = []
     for(let i = 0; i < times; i++){    
          let value = restOfNumber(strategy.bloco, 1, i, 'Bloco 1')
          arrayBloco1Ausencia.push({
               coluna : value
          })
     }

     let arrayBloco2Ausencia = []
     for(let i = 0; i < times; i++){    
          let value = restOfNumber(strategy.bloco, 2, i, 'Bloco 2')
          arrayBloco1Ausencia.push({
               coluna : value
          })
     }

     let arrayBloco3Ausencia = []
     for(let i = 0; i < times; i++){    
          let value = restOfNumber(strategy.bloco, 3, i, 'Bloco 3')
          arrayBloco1Ausencia.push({
               coluna : value
          })
     }

     
     for(let i = 0; i < times; i++) {
          let value = getStrategy(ColunasRepeat, stringColunas, i)
     
          array.push({
               coluna : value,
               index : i
          })
     }    

     let array3 = []
     for(let i = 0; i < times; i++) {
          let value = getStrategy(parOuImpar, stringParOuImpar, i)
       
          array3.push({
               parOrImpar : value,
               index : i
          })
     }

     const array7 = []
     for(let i = 0; i < times; i++) {
          let value = getStrategy(alternateColumns, stringColunas, i)
      
          array7.push({
               alternateColumns : value,
          })
     }

     let array4 = []
     for(let i = 0; i < times; i++) {
          let values = getStrategy(on18or36, stringOneTo18, i)
       
          array4.push({
               minorMajor : values,
               index : i
          })

     }

     let array5 =  []
     for(let i = 0; i < times; i++) {
          let values = getStrategy(redReapeat, stringRed, i)
          array5.push({
               color : values,
               index : i
          })

     }

     let array6 = []
     for(let i = 0; i < times; i++) {
          let values = getStrategy(blocosRepeat, stringBlocos, i)
          array6.push({
               blocosRepeat : values,
               index : i
          }    
          )
     }

     strategyProced.blocosRepeat = array6
     strategyProced.minorMajor = array4
     strategyProced.parOrImpar = array3
     strategyProced.colorRepeat = array5
     strategyProced.colunasRepeat = array
     strategyProced.alternateColumns = array7
     strategyProced.arrayColunas1Ausencia = arrayColunas1Ausencia
     stringBlocos.arrayColunas2Ausencia = arrayColunas2Ausencia
     stringBlocos.arrayColunas3Ausencia = arrayColunas3Ausencia
     stringBlocos.arrayBloco1Ausencia = arrayBloco1Ausencia
     stringBlocos.arrayBloco2Ausencia = arrayBloco2Ausencia
     stringBlocos.arrayBloco3Ausencia = arrayBloco3Ausencia

     // Convert array to string
     return strategyProced;
}


async function strategyProced (objetoRolleta) {

     // Strategy Proced
     const last18 = objetoRolleta.last18
     console.log(last18)
     const concat = last18[0].concat(last18[1])
     // Remove every time the 10th element of array and make a new array com rest of elements
     // Get the strategy
     const strategyProcess = await strategyConsultFor18(concat)
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

     objetoRolleta.concat = concat

     await SendMessage(objetoRolleta)
      
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
     const last18 = await getLastNumber18(Element);
              // Match RegEx Nao Indenticado for Result strateg
          result.forEach(async (estrategia) => {

               console.log(estrategia.name)
               console.log(last18)
               console.log(estrategia.numberjson)


               let obj = {
               'roulletename' : estrategia.name,
               'jsonbstrategy'  :   estrategia.jsonbpreload,
               'numberjson'   :  estrategia.numberjson,
               'objsResult' : estrategia,
               'last18' : [estrategia.numberjson, last18.lastRow.numberjson],
                }

               strategyProced(obj)
               
          })
     })

}, 15000)

})()
