

const { TelegramClient, Api, client } = require("telegram");
const redis = require('redis');
const { StringSession } = require("telegram/sessions");
const input = require("input"); // npm i input
const { getStrategyFilter, getLastNumber18, getLastNumber } = require("./database");
const apiId = 17228434;
const apiHash = 'b05e1c84ad4dd7c77e9965204c016a36';
const stringSession = new StringSession('1AQAOMTQ5LjE1NC4xNzUuNTQBu7jfw1tDzOkH7vrrFyEhVQHcFgx/NY/xgc2zt2nrGFEXZCLizMgd/IZfD4xZYPkq071kVGb64BaBRY13fLFfUOZiUo40jfMokpnuM7+y+V8WGcwYi6cLBCXYaVeyMI/pTbkcHyQOZOoAmD6qh7C3ls+OGjTzrIaWQF27VQmNX73lv6Vg4FjALR7Cpa+Xz3e63tViZ84pph2Zw50q6u9TpNsDfdNTocK9cVODEdczeXrekDCB9D8+bZullp5hsn77lgpWjDHe57eZHC/m7OhR0wLvjnhcqRp5JrWQNMJYV2P1xdGimgzAQGRLn5pAPzuxDkKawdi5ZHjYgXsVQ1lPDOE=');
const { createClient }  = require('redis');
const testStrategy = require('./functions/testStrategy')
const expectNumber = require('./jsonObjects/strategy.js');
const redisClient =  redis.createClient()
const amqplib = require('amqplib/callback_api');
const queue = 'msg'

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
     'Alternando Primeira e Segunda Colunas - 4 vezes',
     'Alternando Segunda e Primeira Colunas - 4 vezes',
     'Alternando Terceira e Primeira Colunas - 4 vezes',
     'Alternando Primeira e Terceira Colunas - 4 vezes',
     'Alternando Segunda e Primeira Colunas - 4 vezes',
     'Alternando Terceira e Segunda Colunas - 4 vezes',
     'Repetição de 4 vezes do Primeiro Bloco',
     'Repitição de 4 vezes do Segundo Bloco',
     'Repitição de 4 vezes do Terceira Bloco',
     'Repetição de 4 vezes da Primeira Coluna',
     'Repetição de 4 vezes da Segunda Coluna',
     'Repetição de 4 vezes da Terceira Coluna',
     'Ausencia da Segunda Coluna - 6 vezes',
     'Ausencia da Terceira Coluna - 6 vezes',
     'Ausencia da Primeira Coluna  - 6 vezes',
     'Ausencia da Segundo Bloco - 6 vezes',
     'Ausencia da Terceiro Bloco - 5 vezes',
     'Ausencia da Primeiro Bloco - 5 vezes',
     'Ausencia da Primeiro Bloco - 5 vezes'

]

const spectStrategy = [
     'Alternando Primeira e Segunda Colunas - 5 vezes',
     'Alternando Segunda e Primeira Colunas - 5 vezes',
     'Alternando Terceira e Primeira Colunas - 5 vezes',
     'Alternando Primeira e Terceira Colunas - 5 vezes',
     'Alternando Segunda e Primeira Colunas - 5 vezes',
     'Alternando Terceira e Segunda Colunas - 5 vezes',
     'Repetição de 4 vezes do Primeiro Bloco',
     'Repitição de 4 vezes do Segundo Bloco',
     'Repitição de 4 vezes do Terceira Bloco',
     'Repetição de 4 vezes da Primeira Coluna',
     'Repetição de 4 vezes da Segunda Coluna',
     'Repetição de 4 vezes da Terceira Coluna',
     'Ausencia da Segunda Coluna - 5 vezes ',
     'Ausencia da Terceira Coluna - 5 vezes ',
     'Ausencia da Primeira Coluna - 5 vezes ',
     'Ausencia da Segundo Bloco - 5 vezes ',
     'Ausencia da Terceiro Bloco - 5 vezes ',
     'Ausencia da Primeiro Bloco - 5 vezes ',
     'Ausencia da Primeiro Bloco - 3 vezes'     
]

const string = 
`✅ ENTRADA CONFIRMADA ✅
🎰 ROLETA: {roulleteName}
💎 ESTRATÉGIA: {strategyName}
Ultimos Numeros : {last}
✅ENTRAR: {expect}
🎯COBRIR O ZERO`


const string2 = 
`
✅ ENTRADA CONFIRMADA ✅
🎰 Roleta 🎰: {roulleteName}
💎 ESTRATÉGIA: {strategyName}
LastNumber : {last}
👉🏻 Entrada 👈🏻: : {expect}
🎯 Cobrir o zero'
`

const possivelAlert = `⚠️POSSÍVEL ENTRADA⚠️

🎰 ROLETA: {roulleteName}
💎 ESTRATÉGIA: {strategyName}`


const stringred = `
🎰 Roleta 🎰: {roulleteName}
🚀 Estratégia 🚀: {strategyName}
Ultimos Resultados : {last}
✅ GREEN ✅
`


   
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
     },  {
          EX: 7,
          NX: true
     })

     
     consultMemory(sygnalBase, string)
}
          
function replaceForGreen(string, resultadoAtual, sygnalBase, zero) {
               if(!zero) {
               const replace = string.replace(/✅ ENTRADA CONFIRMADA ✅/g, '✅ GREEEEEEEN ✅')
               const replace2 = replace.replace(/{last}/g, `${resultadoAtual.numberjson[0]} || ${resultadoAtual.numberjson[1]} || ${resultadoAtual.numberjson[2]} || ${resultadoAtual.numberjson[3]}`)
               const replace3 = replace2.replace(/{roulleteName}/g, `${sygnalBase.roulleteName}`)
               const replace4 = replace3.replace(/{strategyName}/g, `${sygnalBase.estrategiaDetect}`) 
               return replace4
          } else {
               const replace = string.replace(/✅ ENTRADA CONFIRMADA ✅/g, '✅ GREEEEEEEN NO ZEROOOO ✅')
               const replace2 = replace.replace(/{last}/g, `${resultadoAtual.numberjson[0]} || ${resultadoAtual.numberjson[1]} || ${resultadoAtual.numberjson[2]} || ${resultadoAtual.numberjson[3]}`)
               const replace3 = replace2.replace(/{roulleteName}/g, `${sygnalBase.roulleteName}`)
               const replace4 = replace3.replace(/{strategyName}/g, `${sygnalBase.estrategiaDetect}`) 
               return replace4
          }
}

function replaceForRed(string, resultadoAtual, sygnalBase) {
               const replace = string.replace(/✅ GREEN ✅/g, '🔴 Desta Vez Não Deu! Mas vamos Insistir faz um Martigale 🔴')
               const replace2 = replace.replace(/{last}/g, `${resultadoAtual.numberjson[0]} || ${resultadoAtual.numberjson[1]} || ${resultadoAtual.numberjson[2]} || ${resultadoAtual.numberjson[3]}`)
               const replace3 = replace2.replace(/{roulleteName}/g, `${sygnalBase.roulleteName}`)
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
     let entry = await redisClient.get(`${sygnalBase.estrategiaDetect}_${sygnalBase.roulleteName}`)
     entry =  JSON.parse(entry)
     await sendMsg(-1266295662, replaceForGreen(stringred, resultadoAtual, sygnalBase), entry.msg)
     await redisClient.del(`${sygnalBase.estrategiaDetect}_${sygnalBase.roulleteName}`)
     } 
     else if ([0].includes(resultadoAtual.numberjson[0])) {
     console.log('ZEROOOOO')
     let entry = await redisClient.get(`${sygnalBase.estrategiaDetect}_${sygnalBase.roulleteName}`)
     entry =  JSON.parse(entry)
     await sendMsg(-1266295662, replaceForGreen(stringred, resultadoAtual, sygnalBase, 'zero'), entry.msg)
     await redisClient.del(`${sygnalBase.estrategiaDetect}_${sygnalBase.roulleteName}`)
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
                    let entry = await rediredisClients.get(`${sygnalBase.estrategiaDetect}_${sygnalBase.roulleteName}`)
                    entry =  JSON.parse(entry)   
                    await sendMsg(-1266295662, replaceForGreen(stringred, resultadoAtual, sygnalBase, entry.msg))                 
                    await redisClient.del(`${sygnalBase.estrategiaDetect}_${sygnalBase.roulleteName}`)
               } 
              else if ([0].includes(resultadoAtual.numberjson[0])) {
                  console.log('ZEROOOOO')
                  let entry = await redisClient.get(`${sygnalBase.estrategiaDetect}_${sygnalBase.roulleteName}`)
                  entry =  JSON.parse(entry)
                  await sendMsg(-1266295662, replaceForGreen(stringred, resultadoAtual, sygnalBase, 'zero'), entry.msg)
                  await redis.del(`${sygnalBase.estrategiaDetect}_${sygnalBase.roulleteName}`)
               } else {
                    console.log('RED')
                    let entry = await redisClient.get(`${sygnalBase.estrategiaDetect}_${sygnalBase.roulleteName}`)
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

               const replace = string.replace(/{roulleteName}/g, roulleteName)
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
     const replace = string.replace(/{roulleteName}/g, roulleteName)
     const replace2 = replace.replace(/{strategyName/g, estrategiaDetect)
     const replace5 = replace2.replace(/{expect}/g, test.expect)
     const place =  replace5.replace(/[0-9]* vezes/g, '')
     const msg2 = await sendMsg(-1266295662, place)
     await redisClient.del((`${sygnalBase.estrategiaDetect}_${sygnalBase.roulleteName}_${'alert_'}`))
     await redisClient.set(`${sygnalBase.estrategiaDetect}_${sygnalBase.roulleteName}_${'alert_'}`, JSON.stringify({
          'msg' : msg2
     }),  {
          EX: 5,
          NX: true
     })

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

await redisClient.connect()

amqplib.connect('amqp://myuser:mypassword@localhost:5672', (err, conn) => {
     if (err) throw err;

conn.createChannel((err, ch2) => {
     if(err) throw err;

     ch2.assertQueue('msg');

     ch2.consume('msg', async (message) => {
     if (message !== null) {
     const msg = message.toString()
     const strig =  JSON.parse(msg); // 'message'
     console.log(strig.estrategiaDetect, strig.roulleteName)
     if(spectStrategy.includes(strig.estrategiaDetect) && roleta.includes(strig.roulleteName)) {
          console.log('-------------------ALERT-------------------')
          const get = await redisClient.get(`${strig.estrategiaDetect}_${strig.roulleteName}_${'alert_'}`)
          if (!get) {
          await redisClient.set(`${strig.estrategiaDetect}_${string.roulleteName}_${'alert_'}`, {
               "alert" : "alert"
          } , {
               EX: 7,
               NX: true
          })
          return await proccedAlert(strig, possivelAlert)
          } else {
               console.log(`--------> Tem uma Alerta em processamento <--------`)     
          }
     }
     
     if(strategyx.includes(strig.estrategiaDetect) && roleta.includes(strig.roulleteName)) {
          console.log(`------------------------------------------------------------`)
          const get = await redisClient.get(`${strig.estrategiaDetect}_${strig.roulleteName}`)
          if (!get) {
          const estrategiaDetect_ = downNumber(strig.estrategiaDetect) //Esrever esta funçao
          let alert_ = await redisClient.get((`${estrategiaDetect_}_${strig.roulletName}_${'alert_'}`))
          alert_ = JSON.parse(alert_)
          await redisClient.set(`${strig.estrategiaDetect}_${strig.roulleteName}`, JSON.stringify({
               "payload" : strig,
               "msg" : alert_
          }), 
               {
                    EX: 7,
                    NX: true
               }
          );
          return await proccedRoulletAndSend(strig, string)
          }
     }
}  else {
     console.log('Consumer Cancelled by Server')
}

     ch2.ack(message);
}) // RabbitMq and Task
})
})
   
})();
