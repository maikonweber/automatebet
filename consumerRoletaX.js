

const { TelegramClient, Api, client } = require("telegram");
const Redis = require('ioredis');
const { StringSession } = require("telegram/sessions");
const input = require("input"); // npm i input
const { getStrategyFilter, getLastNumber18, getLastNumber } = require("./database");
const apiId = 17228434;
const apiHash = 'b05e1c84ad4dd7c77e9965204c016a36';
const stringSession = new StringSession('1AQAOMTQ5LjE1NC4xNzUuNTkBuwTAXKXEayLxDFQ02v+INi5wCeE2WCcO++LRgIqkCTcHl/9onDF705MOohzvjMmJONsJB6m50KJO2iyye9qSUiRud48glxOW1A4ANch3JAuQE+iBjQal/P0KtY6qfy3ZY/fw1DI3Vrxfz7xOEVoc/s08Y2rdWj/EaW2d69yS4dBF/W/FZw58p7BNZfvqm2XtPdhNGrzXipdTP3AF8QOcBcFwXX3WpI0PZj7JqYElYw2cjkjOwSfAF1wafEwgyp2Py8wdG3D/0Z/+Oqy7rv/N5+2q8VYR5lhmaYS02G7URF5bRGuBEy/hexVH6AfW3ML4a16FzawG1qEdQ+x1RSsTmNA=');
const clientRedis = new Redis(
)
const expectNumber = require("./jsonObjects/strategy");



(async () => {
const roleta = 
     [
          'Roulette',
          'Football_French_Roulette',
          'Deutsches_Roulette',
          'Speed_Roulette',
          'Prestige_Roulette',
          'Mega_Fire_Blaze_Roulette_Live',
          'Greek_Roulette',
          'Roleta_Brasileira',
          'Auto_Roulette',
          'French_Roulette',
          'Hindi_Roulette',
          'Roulette_Italiana',
          'Bucharest_Roulette',
          'American_Roulette',
     ]

const strategyx = [
     'Alternar colunas 1 e 2 - 7 vezes',
     'Alternar colunas 2 e 3 - 7 vezes',
     'Alternar colunas 3 e 1 - 7 vezes',
     'Alternar colunas 1 e 3 - 7 vezes',
     'Alternar colunas 2 e 1 - 7 vezes',
     'Alternar colunas 3 e 2 - 7 vezes',
     'Repetição de 7 vezes do Bloco 3',
     'Repetição de 7 vezes do Bloco 2',
     'Repetição de 7 vezes do Bloco 1',
     'Repetição de 7 vezes da Coluna 1',
     'Repetição de 7 vezes da Coluna 2',
     'Repetição de 7 vezes da Coluna 3',
     'Ausencia da Colunas 2 - 12 vezes ',
     'Ausencia da Colunas 3 - 12 vezes ',
     'Ausencia da Colunas 1 - 12 vezes ',
     'Ausencia da Bloco 2 - 12 vezes ',
     'Ausencia da Bloco 3 - 12 vezes ',
     'Ausencia da Bloco 1 - 12 vezes ',

]

const spectStrategy = [
     'Alternar colunas 1 e 2 - 6 vezes',
     'Alternar colunas 2 e 3 - 6 vezes',
     'Alternar colunas 3 e 1 - 6 vezes',
     'Alternar colunas 1 e 3 - 6 vezes',
     'Alternar colunas 2 e 1 - 6 vezes',
     'Alternar colunas 3 e 2 - 6 vezes',
     'Repetição de 6 vezes do Bloco 3',
     'Repetição de 6 vezes do Bloco 2',
     'Repetição de 6 vezes do Bloco 1',
     'Repetição de 6 vezes da Coluna 1',
     'Repetição de 6 vezes da Coluna 2',
     'Repetição de 6 vezes da Coluna 3',
     'Ausencia da Colunas 2 - 11 vezes ',
     'Ausencia da Colunas 3 - 11 vezes ',
     'Ausencia da Colunas 1 - 11 vezes ',
     'Ausencia da Bloco 2 - 11 vezes ',
     'Ausencia da Bloco 3 - 11 vezes ',
     'Ausencia da Bloco 1 - 11 vezes ',
     
]

const string = 
`✅ ENTRADA CONFIRMADA ✅
🎰 ROLETA: {rouletteName}
💎 ESTRATÉGIA: {strategyName}
Ultimos Numeros : {last}
✅ENTRAR: {expect}
🎯COBRIR O ZERO`


const string2 = 
`
✅ ENTRADA CONFIRMADA ✅
🎰 Roleta 🎰: {rouletteName}
💎 ESTRATÉGIA: {strategyName}
LastNumber : {last}
👉🏻 Entrada 👈🏻: : {expect}
🎯 Cobrir o zero'
`

const possivelAlert = `⚠️POSSÍVEL ENTRADA⚠️

🎰 ROLETA: {rouletteName}
💎 ESTRATÉGIA: {strategyName}`


const stringred = `
🎰 Roleta 🎰: {rouletteName}
🚀 Estratégia 🚀: {strategyName}
Ultimos Resultados : {last}
✅ GREEN ✅
`

function testStrategy(estrategiaDetect, lastNumber) {
     if(estrategiaDetect.match(/Coluna 1/)) {
          console.log('Repetição')
          return { 
               "expect" : "Quebra na Colunas 3 ou 2",
               "array" : expectNumber['Coluna 1 Repeat']()
               }
     } else if (estrategiaDetect.match(/Par/g)) {
          console.log('Par')
          return {
               "expect" : "Jogar nos Numeros Impares",
               "array" : expectNumber['Par Reapeat']()
               }
     } else if (estrategiaDetect.match(/Impar/g)) {
          console.log('Impar')
          return {
               "expect" : "Jogar nos Numeros pares",
               "array":expectNumber['Impar Reapeat']()
          }
     } else if (estrategiaDetect.match(/1 ou 18/g)) {
          console.log('Repetição - 1 ao 18')
          return {
               "expect" : "Jogar nos numeros Maiores",
               "array" : expectNumber['1 ao 18 Reapeat']()}
     } else if (estrategiaDetect.match(/19 ou 36/g)) {
          console.log('Repetição - 19 ao 36')
          return {
               "expect" : "Jogar nos numeros Menores",
               "array" : expectNumber['19 ao 36 Reapeat']()}
     } else if (estrategiaDetect.match(/Coluna 2/g)) {
          console.log('Repetição - Coluna 2')
          return {
               "expect" : "Quebra no Coluna 1 ou Coluna 3",
              "array" : expectNumber['Coluna 2 Reapeat']()
          }
     } else if (estrategiaDetect.match(/Coluna 3/g)) {
          console.log('Repetição - Coluna 3')
          return { 
               "expect" : "Quebra na Colunas 2 ou Colunas 1",
               "array" :expectNumber['Coluna 3 Reapeat']()
     }
     } else if (estrategiaDetect.match(/Bloco 1/g)) {
          console.log('Repetição - Bloco 1')
          return { 
               "expect" : "Quebra no Bloco 3 ou Bloco 2",
                "array"  :  expectNumber['Bloco 1 Reapeat']() 
          }
     } else if (estrategiaDetect.match(/Bloco 2/g)) {
          console.log('Repetição - Bloco 2')
          return { 
               "expect" : "Quebra no Bloco 1 ou Bloco 3",
               "array" : expectNumber['Bloco 2 Reapeat']()
          }
     
     } else if (estrategiaDetect.match(/Bloco 3/g)) {
          console.log('Repetição - Bloco 3')
          return {    "expect" : "Quebra no Bloco 1 ou Bloco2",
                    "array" : expectNumber['Bloco 3 Reapeat']()
                    }
          } else if (estrategiaDetect.match(/Red/g)) {
          console.log('Red')
          return {
               "expect" : "Jogar nos Numeros Pretos",
                "array"  :  expectNumber['White']()
          }
     } else if (estrategiaDetect.match(/Black/g)) {
          return {
                 "expect" : "Jogar nos Vermelhos", 
                 "array" : expectNumber['Red']()
          }
     } else if (estrategiaDetect.match(/Alternar colunas 2 e 1/g)) {
          
          return {
               "expect" : "Quebra na Colunas 3",
               "array" : expectNumber['Alternancia da Coluna 2 e 1']()
          }
     } else if (estrategiaDetect.match(/Alternar colunas 3 e 2/g)) {
          console.log('Não encontrado')
          return {
               "expect" : "Quebra na Colunas 1 ",
               "array" : expectNumber['Alternar colunas 3 e 2']()
          }
     } else if (estrategiaDetect.match(/Alternar colunas 1 e 3/g)) {
          console.log('Não encontrado')
          return {
               "expect" : "Quebra na Colunas 2",
               "array" : expectNumber['Alternancia da Coluna 1 e 3']()

          }
     } else if (estrategiaDetect.match(/Alternar colunas 1 e 2/g)) {
          console.log('Não encontrado')
          return {
               "expect" : "Quebra na Colunas 3",
               "array" : expectNumber['Alternancia da Coluna 1 e 2']()
          }
     } else if (estrategiaDetect.match(/Alternar colunas 2 e 3/g)) {
          console.log('Não encontrado')
          return {
               "expect" : "Quebra na Colunas 1",
               "array" : expectNumber['Alternancia da Coluna 2 e 3']()
          }

     }    else if (estrategiaDetect.match(/Alternar colunas 3 e 1/g)) {
          console.log('Não encontrado')
          return {
               "expect" : "Quebra na Colunas 2",
               "array" : expectNumber['Alternancia da Coluna 3 e 1']()
          }
          // Ausencia 
     } else if (estrategiaDetect.match(/Ausencia da Colunas 1/g)) {
          console.log('Bloco 1')
          return {
               "expect" : "Quebra na Colunas 1",
               "array" : expectNumber['Ausencia da Colunas 1']()
          }
     }
     else if (estrategiaDetect.match(/Ausencia da Colunas 2/g)) {
          console.log('Bloco 1')
          return {
               "expect" : "Quebra na Colunas 2",
               "array" : expectNumber['Ausencia da Colunas 2']()
          }
     }
     else if (estrategiaDetect.match(/Ausencia da Colunas 3/g)) {
          console.log('Bloco 1')
          return {
               "expect" : "Quebra na Colunas 3",
               "array" : expectNumber['Ausencia da Colunas 3']()
          }
     }
     else if (estrategiaDetect.match(/Ausencia da Bloco 1 /g)) {
          console.log('Bloco 1')
          return {
               "expect" : "Quebra na Bloco 1",
               "array" : expectNumber['Ausencia da Bloco 1']()
          }
     }
     else if (estrategiaDetect.match(/Ausencia da Bloco 2 /g)) {
          console.log('Bloco 1')
          return {
               "expect" : "Quebra na Bloco 2",
               "array" : expectNumber['Ausencia da Bloco 2']()
          }
     }
     else if (estrategiaDetect.match(/Ausencia da Bloco 3 /g)) {
          console.log('Bloco 1')
          return {
               "expect" : "Quebra na Bloco 3",
               "array" : expectNumber['Ausencia da Bloco 3']()
          }
     }
}
   

async function sendMsg(sala, msg, reply) {
          if(!reply) {
          const salaEntity = await client.getEntity(sala)      
          return await client.invoke( new Api.messages.SendMessage({
               peer: salaEntity,
               message: msg.toString()     
               
}))
} else {
     console.log('Reply')
     console.log(reply.updates[0].SUBCLASS_OF_ID)
     const salaEntity = await client.getEntity(sala)
     return await client.invoke (new Api.messages.SendMessage({
          peer: salaEntity,
          message: msg.toString(),
          replyToMsgId: reply.updates[0].id
          }))
     }
}

function proccedRoulletAndSend(sygnalBase, string) {
     const replace = stringReplace(string, sygnalBase)
     return saveMemorySend(sygnalBase, replace) 

}
          
async function saveMemorySend(sygnalBase, string) {
    
     let alert_ = await redisClient.get(`${sygnalBase.estrategiaDetect}_${sygnalBase.roulleteName}`)
     alert_ = await JSON.parse(alert_)
     const msg1 = await sendMsg(-1266295662, string, alert_.msg)
     await redisClient.set(`${sygnalBase.estrategiaDetect}_${sygnalBase.roulleteName}`, {
          "payload" : alert_.payload,
          'msg' : msg1
     })

     
     consultMemory(sygnalBase, string)
}
          
function replaceForGreen(string, resultadoAtual, sygnalBase, zero) {
               if(!zero) {
               const replace = string.replace(/✅ ENTRADA CONFIRMADA ✅/g, '✅ GREEEEEEEN ✅')
               const replace2 = replace.replace(/{last}/g, `${resultadoAtual.numberjson[0]} || ${resultadoAtual.numberjson[1]} || ${resultadoAtual.numberjson[2]} || ${resultadoAtual.numberjson[3]}`)
               const replace3 = replace2.replace(/{rouletteName}/g, `${sygnalBase.roulleteName}`)
               const replace4 = replace3.replace(/{strategyName}/g, `${sygnalBase.estrategiaDetect}`) 
               return replace4
          } else {
               const replace = string.replace(/✅ ENTRADA CONFIRMADA ✅/g, '✅ GREEEEEEEN NO ZEROOOO ✅')
               const replace2 = replace.replace(/{last}/g, `${resultadoAtual.numberjson[0]} || ${resultadoAtual.numberjson[1]} || ${resultadoAtual.numberjson[2]} || ${resultadoAtual.numberjson[3]}`)
               const replace3 = replace2.replace(/{rouletteName}/g, `${sygnalBase.roulleteName}`)
               const replace4 = replace3.replace(/{strategyName}/g, `${sygnalBase.estrategiaDetect}`) 
               return replace4
          }
}

function replaceForRed(string, resultadoAtual, sygnalBase) {
               const replace = string.replace(/✅ GREEN ✅/g, '🔴 Desta Vez Não Deu! Mas vamos Insistir faz um Martigale 🔴')
               const replace2 = replace.replace(/{last}/g, `${resultadoAtual.numberjson[0]} || ${resultadoAtual.numberjson[1]} || ${resultadoAtual.numberjson[2]} || ${resultadoAtual.numberjson[3]}`)
               const replace3 = replace2.replace(/{rouletteName}/g, `${sygnalBase.roulleteName}`)
               const replace4 = replace3.replace(/{strategyName}/g, `${sygnalBase.estrategiaDetect}`)
               return replace4
}         


function consultMemory (sygnalBase, string) {
console.log(sygnalBase)
     setTimeout(async () => {
     const { array, expect } = testStrategy(sygnalBase.estrategiaDetect)
     console.log(array)
     let resultadoAtual = await getLastNumber(sygnalBase.roulleteName)
     if(array.includes(resultadoAtual.numberjson[0])) {
     console.log('GREEN')
     let entry = await clientRedis.get(`${sygnalBase.estrategiaDetect}_${sygnalBase.roulleteName}`)
     entry =  JSON.parse(entry)
     await sendMsg(-1266295662, replaceForGreen(stringred, resultadoAtual, sygnalBase), entry.msg)
     } 
     else if ([0].includes(resultadoAtual.numberjson[0])) {
     console.log('ZEROOOOO')
     let entry = await clientRedis.get(`${sygnalBase.estrategiaDetect}_${sygnalBase.roulleteName}`)
     entry =  JSON.parse(entry)
     await sendMsg(-1266295662, replaceForGreen(stringred, resultadoAtual, sygnalBase, 'zero'), entry.msg)
     } else {
     console.log('RED')  
     await martingale(sendMsg, replaceForGreen, replaceForRed, stringred, sygnalBase)   
                    }
     }, 35000)
}

/* 
     @dev Maikon Weber   
     @logic : Promisse to execute martingale send msg and confirm win
     @params : fuctions closures
*/

async function martingale(sendMsg, replaceForGreen, replaceForRed, stringred, sygnalBase) {
     let {
          array,
          expect
     } = testStrategy(sygnalBase.estrategiaDetect)
     await sendMsg(-1266295662, `
     Executa o Martingale
     🎰 Roleta 🎰 ${sygnalBase.roulleteName},
     👉🏻 Entrada 👈🏻: ${expect} 
     🎯 Cobrir o zero'
      ` )
      
     const PromiseCromprove = new Promise(() => {
          setTimeout(async () => {
               let resultadoAtual = await getLastNumber(sygnalBase.roulleteName)
               if(array.includes(resultadoAtual.numberjson[0])) {
                    console.log('GREEN')
                    let entry = await clientRedis.get(`${sygnalBase.estrategiaDetect}_${sygnalBase.roulleteName}`)
                    entry =  JSON.parse(entry)   
                    await sendMsg(-1266295662, replaceForGreen(stringred, resultadoAtual, sygnalBase, entry.msg))                 
               } 
              else if ([0].includes(resultadoAtual.numberjson[0])) {
                  console.log('ZEROOOOO')
                  let entry = await clientRedis.get(`${sygnalBase.estrategiaDetect}_${sygnalBase.roulleteName}`)
                  entry =  JSON.parse(entry)
                  await sendMsg(-1266295662, replaceForGreen(stringred, resultadoAtual, sygnalBase, 'zero'), entry.msg)
             
               } else {
                    console.log('RED')
                    let entry = await clientRedis.get(`${sygnalBase.estrategiaDetect}_${sygnalBase.roulleteName}`)
                    entry =  JSON.parse(entry)
                    await sendMsg(-1266295662, replaceForRed(stringred, resultadoAtual, sygnalBase, 'zero'), entry.msg)       
               }
          }, 35000)
     })  
     await PromiseCromprove
}
          
function stringReplace(string, sygnalBase) {
               const { estrategiaDetect, roulleteName, payload } = sygnalBase
               const test = testStrategy(estrategiaDetect)
               const last1 = payload.numberjson[0].toString()
               const last2 = payload.numberjson[1].toString()
               const last3 = payload.numberjson[2].toString()
               const last4 = payload.numberjson[3].toString()
               const last = `${last1} | ${last2} | ${last3} | ${last4}`
               console.log(last)

               const replace = string.replace(/{rouletteName}/g, roulleteName)
               const replace2 = replace.replace(/{strategyName/g, estrategiaDetect)
               const replace4 = replace2.replace(/{last}/g, last)
               const replace5 = replace4.replace(/{expect}/g, test.expect)
               return replace5
 }    
          

     
console.log("Loading interactive example...");
 const client = new TelegramClient(stringSession, apiId, apiHash, {
            connectionRetries: 5,
});    

await client.start({
     phoneNumber: async () => await input.text("Please enter your number: "),
     password: async () => await input.text("Please enter your password: "),
     phoneCode: async () =>
       await input.text("Please enter the code you received: "),
     onError: (err) => console.log(err),
   });


async function deleteMsg(msg, channel) {
     const result = await client.invoke(
          new Api.messages.DeleteMessages({
            channel : -1266295662,
            id: [msg.updates[0].id],
          })
        );
     console.log(result)
}

const promisseDelete = (msg, channel) =>  new Promise(() => {
     setTimeout(async () => {
          console.log('Timeout')
          deleteMsg(msg, channel)
     }, 172800000)
})



async function proccedAlert (sygnalBase, string) {
     const { estrategiaDetect, roulleteName, payload } = sygnalBase
     console.log(`----------------- Alerta ----------------------`)
     const test = testStrategy(sygnalBase.estrategiaDetect)
     const replace = string.replace(/{rouletteName}/g, roulleteName)
     const replace2 = replace.replace(/{strategyName/g, estrategiaDetect)
     const replace5 = replace2.replace(/{expect}/g, test.expect)
     const place =  replace5.replace(/[0-9]* vezes/g, '')
     const msg2 = await sendMsg(-1266295662, place)
     await clientRedis.del((`${sygnalBase.estrategiaDetect}_${sygnalBase.roulleteName}_${'alert_'}`))
     await clientRedis.set(`${sygnalBase.estrategiaDetect}_${sygnalBase.roulleteName}_${'alert_'}`, JSON.stringify({
          'msg' : msg2
     }), 'EX', 5)

     return
}

const result = await client.invoke( new Api.messages.GetAllChats({
     exceptIds : [43]
}));

for(let i = 0; i < result.chats.length; i++){
   console.log(result.chats[i].id, result.chats[i].title)
}

console.log(client.session.save());

const sala1 = result.chats[0].id

function downNumber (detectString) {
     if(/[0-9]*/.test(detectString)) {
          const result =  detectString.match(/[0-9][0-9]*/gi)
          const replaceStrategy = detectString.replace(/[0-9][0-9]*/gi, (result[0] - 1).toString())
          return replaceStrategy
     }
}


await clientRedis.subscribe('msg', async (message) => {
     const strig =  JSON.parse(message); // 'message'

     console.log('New Strategy')
     console.log(strig.roulleteName, strig.estrategiaDetect)
     if(spectStrategy.includes(strig.estrategiaDetect) && roleta.includes(strig.roulleteName)) {
          console.log('-------------------ALERT-------------------')
          if (!await clientRedis.get(`${strig.estrategiaDetect}_${strig.rouletteName}_${'alert_'}`)) {
          await clientRedis.set(`${strig.estrategiaDetect}_${string.rouletteName}_${'alert_'}`, {
               "alert" : "alert"
          } ,'EX', 4)
          return await proccedAlert(strig, possivelAlert)
          } else {
               console.log(`--------> Tem uma Alerta em processamento <--------`)     
          }
     }


     if(strategyx.includes(strig.estrategiaDetect) && roleta.includes(strig.roulleteName)) {
          console.log(`------------------------------------------------------------`)
          if (!await clientRedis.get(`${strig.estrategiaDetect}_${strig.rouletteName}`)) {
          const estrategiaDetect_ = downNumber(strig.estrategiaDetect) //Esrever esta funçao
          let alert_ = await redisClient.get((`${estrategiaDetect_}_${string.roulletName}_${'alert_'}`))
          alert_ = JSON.parse(alert_)
          await clientRedis.set(`${estrategiaDetect}_${strig.rouletteName}`, JSON.stringify({
               "payload" : strig,
               "msg" : alert_
          }), 'EX', 8);

          return await proccedRoulletAndSend(strig, string)
          }
}
})
   
})();
