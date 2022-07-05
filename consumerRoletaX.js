

const { TelegramClient, Api, client } = require("telegram");
const { StringSession } = require("telegram/sessions");
const input = require("input"); // npm i input
const { getStrategyFilter, getLastNumber18, getLastNumber } = require("./database");
const apiId = 17228434;
const apiHash = 'b05e1c84ad4dd7c77e9965204c016a36';
const stringSession = new StringSession('1AQAOMTQ5LjE1NC4xNzUuNTQBu7jfw1tDzOkH7vrrFyEhVQHcFgx/NY/xgc2zt2nrGFEXZCLizMgd/IZfD4xZYPkq071kVGb64BaBRY13fLFfUOZiUo40jfMokpnuM7+y+V8WGcwYi6cLBCXYaVeyMI/pTbkcHyQOZOoAmD6qh7C3ls+OGjTzrIaWQF27VQmNX73lv6Vg4FjALR7Cpa+Xz3e63tViZ84pph2Zw50q6u9TpNsDfdNTocK9cVODEdczeXrekDCB9D8+bZullp5hsn77lgpWjDHe57eZHC/m7OhR0wLvjnhcqRp5JrWQNMJYV2P1xdGimgzAQGRLn5pAPzuxDkKawdi5ZHjYgXsVQ1lPDOE=');
const { createClient }  = require('redis');
const testStrategy = require('./functions/testStrategy')
const expectNumber = require('./jsonObjects/strategy.js');
const Redis = require("ioredis");
const redis = new Redis();
const amqplib = require('amqplib/callback_api');


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
     'Alternando Primeira e Segunda Colunas - 8 vezes',
     'Alternando Segunda e Primeira Colunas - 8 vezes',
     'Alternando Terceira e Primeira Colunas - 8 vezes',
     'Alternando Primeira e Terceira Colunas - 8 vezes',
     'Alternando Segunda e Primeira Colunas - 8 vezes',
     'Alternando Terceira e Segunda Colunas - 8 vezes',
     'Repetição de 8 vezes do Primeiro Bloco',
     'Repitição de 8 vezes do Segundo Bloco',
     'Repitição de 8 vezes do Terceira Bloco',
     'Repetição de 8 vezes da Primeira Coluna',
     'Repetição de 8 vezes da Segunda Coluna',
     'Repetição de 8 vezes da Terceira Coluna',
     'Ausencia da Segunda Coluna - 9 vezes',
     'Ausencia da Terceira Coluna - 9 vezes',
     'Ausencia da Primeira Coluna  - 9 vezes',
     'Ausencia da Segundo Bloco - 9 vezes',
     'Ausencia da Terceiro Bloco - 9 vezes',
     'Ausencia da Primeiro Bloco - 9 vezes',
     'Ausencia da Primeiro Bloco - 9 vezes',
]

const spectStrategy = [
     'Alternando Primeira e Segunda Colunas - 7 vezes',
     'Alternando Segunda e Primeira Colunas - 7 vezes',
     'Alternando Terceira e Primeira Colunas - 7 vezes',
     'Alternando Primeira e Terceira Colunas - 7 vezes',
     'Alternando Segunda e Primeira Colunas - 7 vezes',
     'Alternando Terceira e Segunda Colunas - 7 vezes',
     'Repetição de 7 vezes do Primeiro Bloco',
     'Repitição de 7 vezes do Segundo Bloco',
     'Repitição de 7 vezes do Terceira Bloco',
     'Repetição de 7 vezes da Primeira Coluna',
     'Repetição de 7 vezes da Segunda Coluna',
     'Repetição de 7 vezes da Terceira Coluna',
     'Ausencia da Segunda Coluna - 8 vezes ',
     'Ausencia da Terceira Coluna - 8 vezes ',
     'Ausencia da Primeira Coluna - 8 vezes ',
     'Ausencia da Segundo Bloco - 8 vezes ',
     'Ausencia da Terceiro Bloco - 8 vezes ',
     'Ausencia da Primeiro Bloco - 8 vezes ',  
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

async function proccedRoulletAndSend(sygnalBase, string) {
     console.log('------------ProcessSend-----------------------')
     const replace = stringReplace(string, sygnalBase)
     return await saveMemorySend(sygnalBase, replace) 
}
          
async function saveMemorySend(sygnalBase, string) {
     console.log('------------SaveMemory-----------------------')
     let result = await redis.get(`${sygnalBase.estrategiaDetect}_${sygnalBase.roulleteName}`)
     console.log(result)
     let resultado = JSON.parse(result)
     const msg1 = await sendMsg(-1266295662, string, resultado.msg)
     redis.set(`${sygnalBase.estrategiaDetect}_${sygnalBase.roulleteName}`, JSON.stringify({
               msg : msg1
          }) ,'EX', 60 * 7).then((result)=> {
               console.log(result)
          })  

     await consultMemory(sygnalBase, string)
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


async function consultMemory (sygnalBase, string) {
 console.log('------------ConsultMemory-----------------------')

setTimeout(async () => {
     const { array, expect } = testStrategy(sygnalBase.estrategiaDetect)
     console.log(array)
     let resultadoAtual = await getLastNumber(sygnalBase.roulleteName)
 
     if(array.includes(resultadoAtual.numberjson[0])) {
     console.log('GREEN')
     let entry = await redis.get(`${sygnalBase.estrategiaDetect}_${sygnalBase.roulleteName}`)
     entry =  JSON.parse(entry)
     await sendMsg(-1266295662, replaceForGreen(stringred, resultadoAtual, sygnalBase), entry.msg)
     await redis.del(`${sygnalBase.estrategiaDetect}_${sygnalBase.roulleteName}`)
 
} 

else if ([0].includes(resultadoAtual.numberjson[0])) {

     console.log('ZEROOOOO')
     let entry = await redis.get(`${sygnalBase.estrategiaDetect}_${sygnalBase.roulleteName}`)
     entry =  JSON.parse(entry)
     await sendMsg(-1266295662, replaceForGreen(stringred, resultadoAtual, sygnalBase, 'zero'), entry.msg)
     await redis.del(`${sygnalBase.estrategiaDetect}_${sygnalBase.roulleteName}`)

} else {
     console.log('RED')  
     await martingale(sendMsg, replaceForGreen, replaceForRed, stringred, sygnalBase)   
                    }
     }, 38000)
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
                    let entry = await redis.get(`${sygnalBase.estrategiaDetect}_${sygnalBase.roulleteName}`)
                    entry =  JSON.parse(entry)   
                    await sendMsg(-1266295662, replaceForGreen(stringred, resultadoAtual, sygnalBase, entry.msg))                 
                    await redis.del(`${sygnalBase.estrategiaDetect}_${sygnalBase.roulleteName}`)
               } 
              else if ([0].includes(resultadoAtual.numberjson[0])) {
                  console.log('ZEROOOOO')
                  let entry = await redis.get(`${sygnalBase.estrategiaDetect}_${sygnalBase.roulleteName}`)
                  entry =  JSON.parse(entry)
                  await sendMsg(-1266295662, replaceForGreen(stringred, resultadoAtual, sygnalBase, 'zero'), entry.msg)
                  await redis.v4.del(`${sygnalBase.estrategiaDetect}_${sygnalBase.roulleteName}`)
               } else {
                    console.log('RED')
                    let entry = await redis.get(`${sygnalBase.estrategiaDetect}_${sygnalBase.roulleteName}`)
                    entry =  JSON.parse(entry)
                    await sendMsg(-1266295662, replaceForRed(stringred, resultadoAtual, sygnalBase, 'zero'), entry.msg)       
               }
          }, 37000)
     })  
     await PromiseCromprove
}
          
function stringReplace(string, sygnalBase) {
               const { estrategiaDetect, roulleteName, payload } = sygnalBase
               console.log(estrategiaDetect,  '--------------------')
               const test = testStrategy(estrategiaDetect)
               const last1 = payload.numberjson[0].toString()
               const last2 = payload.numberjson[1].toString()
               const last3 = payload.numberjson[2].toString()
               const last4 = payload.numberjson[3].toString()
               const last = `${last1} | ${last2} | ${last3} | ${last4}`
     

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

     redis.del((`${sygnalBase.estrategiaDetect}_${sygnalBase.roulleteName}_alert`)).then((deletex) => {
          console.log(deletex)
     })
     
     redis.set(`${sygnalBase.estrategiaDetect}_${sygnalBase.roulleteName}_alert`, JSON.stringify({
          msg : msg2    
     }) , 'EX', 60 * 7)

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

amqplib.connect('amqp://localhost:5672', async  (err, conn) => {
     if (err) throw err;

     conn.createChannel(async (err, ch2) => {
          if(err) throw err;

     ch2.assertExchange('msg', 'fanout', {
               durable: false
     });

     ch2.assertQueue('', {
          exclusive: true
        }, function(error2, q) {
          if (error2) {
            throw error2;
          }

     ch2.bindQueue(q.queue, 'msg', '');

ch2.consume(q.queue, async function(msg) {
     if(msg.content) {
     const msgs = msg.content.toString()
     const strig =  JSON.parse(msgs); // 'message'
     
     if(spectStrategy.includes(strig.estrategiaDetect) && roleta.includes(strig.roulleteName)) {
          console.log('-------------------ALERT-------------------')
          redis.get(`${strig.estrategiaDetect}_${strig.roulleteName}_alert`).then((result) => {
               if(!result) {
                    redis.set(`${strig.estrategiaDetect}_${strig.roulleteName}_alert`, 'alert', 'EX', 60 * 7).then( async (returns) => {
                         if(returns) {
                              return await proccedAlert(strig, possivelAlert)
                         }
                    })
               }
          })        
     }
     
     if(strategyx.includes(strig.estrategiaDetect) && roleta.includes(strig.roulleteName)) {
          console.log(`-------------------------------PROCESS OF SEND -----------------------------`)
          redis.get(`${strig.estrategiaDetect}_${strig.roulleteName}`).then(async (result) => {
               if(!result) {
               const estrategiaDetect_ = downNumber(strig.estrategiaDetect) //Esrever esta funçao
               console.log(estrategiaDetect_)
               let resultado = await redis.get(`${estrategiaDetect_}_${strig.roulleteName}_alert`)
               await redis.set(`${strig.estrategiaDetect}_${strig.roulleteName}`, JSON.stringify({
                    msg: resultado
               }), 'EX', 60 * 7)
               return await proccedRoulletAndSend(strig, string)
               }
          })
       }
     }  else {     
      console.log('Consumer Cancelled by Server')
     }

}, {
  noAck: true
});

        })
     })
})
   
})();
