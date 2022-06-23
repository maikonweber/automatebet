

const { TelegramClient, Api, client } = require("telegram");
const redis = require('redis');
const { StringSession } = require("telegram/sessions");
const input = require("input"); // npm i input
const { getStrategyFilter, getLastNumber18, getLastNumber } = require("./database");
const apiId = 17228434;
const apiHash = 'b05e1c84ad4dd7c77e9965204c016a36';
const stringSession = new StringSession('1AQAOMTQ5LjE1NC4xNzUuNTMBu0hSLIOFbU8aIIxTP3DyN8TpvvFzvhWTNyZpI9ab3wx4v99YYIosj0cYMeDFccmzjoAPIVlVgs/cpb+7J7hoablPmB6hQNqCJJfJgy1RgFy711OSiphW1BqXPaa8wwk2Bib+vWTcyPN88TL87cE2lbRHe/Nm8URGzoybg3HqXC6WFPtaRqpy0QJVgIS3vzxg3VskhnThUsRhVpB7cfi1+08TCCWXN0CzHk9m7Nq37BImjQv0+/xThM+8apPNMRH0Q6gtN7IEehczT0MSeDTG2S3vrmuZiRnR/NvpjP3+fjjRHsP8VzERZXu4nhW+GQL6NuY0KcdtEzHuIyUQPbD+fUM=');
const clientRedis = redis.createClient({
     host: '127.0.0.1',
     port: 6379,
});
const expectNumber = require("./jsonObjects/strategy");
const { get } = require("cheerio/lib/api/traversing");



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
     'Alternar colunas 1 e 2 - 7x vezes',
     'Alternar colunas 2 e 3 - 7x vezes',
     'Alternar colunas 3 e 1 - 7x vezes',
     'Alternar colunas 1 e 3 - 7x vezes',
     'Alternar colunas 2 e 1 - 7x vezes',
     'Alternar colunas 3 e 2 - 7x vezes',
     'Repetiçao de 7 vezes do Bloco 3',
     'Repetiçao de 7 vezes do Bloco 2',
     'Repetiçao de 7 vezes do Bloco 1',
     'Repetiçao de 7 vezes da Coluna 1',
     'Repetiçao de 7 vezes da Coluna 2',
     'Repetiçao de 7 vezes da Coluna 3',

]

const spectStrategy = [
     'Alternar colunas 1 e 2 - 6x vezes',
     'Alternar colunas 2 e 3 - 6x vezes',
     'Alternar colunas 3 e 1 - 6x vezes',
     'Alternar colunas 1 e 3 - 6x vezes',
     'Alternar colunas 2 e 1 - 6x vezes',
     'Alternar colunas 3 e 2 - 6x vezes',
     'Repetiçao de 6 vezes da Bloco 3',
     'Repetiçao de 6 vezes da Bloco 2',
     'Repetiçao de 6 vezes da Bloco 1',
     'Repetiçao de 6 vezes da Coluna 1',
     'Repetiçao de 6 vezes da Coluna 2',
     'Repetiçao de 6 vezes da Coluna 3',
     
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
     if(estrategiaDetect.match(/Repetição da Coluna '/)) {
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
               "array" : expectNumber['Alternancia da Coluna 3 e 2']()
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
     }

 
}
   

async function sendMsg(sala, msg, reply) {
          const salaEntity = await client.getEntity(sala)
          
          if(!reply) {
          return await client.invoke( new Api.messages.SendMessage({
               peer: salaEntity,
               message: msg.toString()
          }))
          } else {
          return await client.invoke(new Api.messages.SendMessage({
               peer : salaEntity,
               message : msg.toString(),
               replyToMsgIdply : reply
          }))
          }
     }

          function proccedRoulletAndSend(sygnalBase, string) {
               const replace = stringReplace(string, sygnalBase)
               //sendMessage(replace)
               
               return saveMemorySend(sygnalBase, replace) 
          }
          
          async function saveMemorySend(sygnalBase, string) {
               await clientRedis.set(`${sygnalBase.roulleteName}_${sygnalBase.estrategiaDetect}`, JSON.stringify(sygnalBase), {
                    EX: 180,
                    NX: true
               })
               const getting  = await clientRedis.get(`-1266295662n_${roulleteName}`)
               console.log(getting)
               const msg1 = await sendMsg(-1266295662, string, getting.updates[0].id)
               console.log(msg1)
               consultMemory(sygnalBase, string)
          }
          
          function consultMemory (sygnalBase, string) {
               console.log(sygnalBase)
               setTimeout(async () => {
                 const {
                      array,
                      expect
                 } = testStrategy(sygnalBase.estrategiaDetect)
                 let resultadoAtual = await getLastNumber(sygnalBase.roulleteName)

                 if(array.includes(resultadoAtual.numberjson[0])) {
                      console.log('GREEN')
                    function replaceForGreen(string, resultadoAtual, sygnalBase) {
                         const replace = string.replace(/✅ ENTRADA CONFIRMADA ✅/g, '✅ GREEEEEEEN ✅')
                         const replace2 = replace.replace(/{last}/g, `${resultadoAtual.numberjson[0]} || ${resultadoAtual.numberjson[1]} || ${resultadoAtual.numberjson[2]} || ${resultadoAtual.numberjson[3]}`)
                         const replace3 = replace2.replace(/{rouletteName}/g, `${sygnalBase.roulleteName}`)
                         const replace4 = replace3.replace(/{strategyName}/g, `${sygnalBase.estrategiaDetect}`)
                         return replace4
                    }
                      await sendMsg(-1266295662, replaceForGreen(stringred, resultadoAtual, sygnalBase))                     
                 } else {
                      console.log('RED')
                      function replaceForRed(string, resultadoAtual, sygnalBase) {
                           const replace = string.replace(/✅ GREEN ✅/g, '🔴 RED 🔴')
                           const replace2 = replace.replace(/{last}/g, `${resultadoAtual.numberjson[0]} || ${resultadoAtual.numberjson[1]} || ${resultadoAtual.numberjson[2]} || ${resultadoAtual.numberjson[3]}`)
                           const replace3 = replace2.replace(/{rouletteName}/g, `${sygnalBase.roulleteName}`)
                           const replace4 = replace3.replace(/{strategyName}/g, `${sygnalBase.estrategiaDetect}`)
                           return replace4
                      }
                      const msg = await sendMsg(-1266295662, replaceForRed(stringred, resultadoAtual, sygnalBase))
                      console.log(msg)
                      async function martingale(sygnalBase, stringRed, stringGreen, lastResult, msg) {
                         setTimeout( async () => {
                              let resultadoAtual = await getLastNumber(sygnalBase.roulleteName)
                              const {
                                   array,
                                   expect
                              } = testStrategy(sygnalBase.estrategiaDetect)

                              if(array.includes(resultadoAtual.numberjson[0])) {
                                   const msg = await sendMsg(-1266295662, replaceForGreen(stringGreen, resultadoAtual, sygnalBase))
                              } else {
                                   const msg2 = await sendMsg(-1266295662, replaceForRed(stringRed, resultadoAtual, sygnalBase))
                              }
                         }, 45000)
                      }
                      martingale(sygnalBase, stringred, stringreen, resultadoAtual.numberjson[0])
                     }
               }, 45000)
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
          
     
     
clientRedis.connect()
const sub = clientRedis.duplicate();
 await sub.connect();
     
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


async function proccedAlert (sygnalBase, string) {
     const { estrategiaDetect, roulleteName, payload } = sygnalBase
     console.log(`----------------- Alerta ----------------------`)
     const {
          array,
          expect
     } = testStrategy(sygnalBase.estrategiaDetect)

     const replace = string.replace(/{rouletteName}/g, roulleteName)
     const replace2 = replace.replace(/{strategyName/g, estrategiaDetect)

     const replace5 = replace2.replace(/{expect}/g, expect)
     const place =  replace5.replace(/[0-9]*/g, '')
     const re = place.replace(/vezes/g, '')

    
     const msg1 = await sendMsg(-1266295662,re)
     console.log(msg1)

     clientRedis.set(`${msg1.chats[0].id}_${roulleteName}`, JSON.stringify(msg1.chats[0].id), {
          EX: 180,
          NX: true
     }) 

     return replace5
}


 


const result = await client.invoke( new Api.messages.GetAllChats({
     exceptIds : [43]
}));

for(let i = 0; i < result.chats.length; i++){
   console.log(result.chats[i].id, result.chats[i].title)
}


console.log(client.session.save());


const sala1 = result.chats[0].id



          
await sub.subscribe('msg', async (message) => {

    
     const strig =  JSON.parse(message); // 'message'
     console.log(strig.roulleteName, strig.estrategiaDetect)
     const result = await clientRedis.get(`${strig.roulleteName}_${strig.estrategiaDetect}`)
     if(!result) {
     console.log("Strategy Detect")

     if(spectStrategy.includes(strig.estrategiaDetect) && roleta.includes) {
          console.log('-------------------ALERT-------------------')
          proccedAlert(strig, possivelAlert)
     }


     if(strategyx.includes(strig.estrategiaDetect) && roleta.includes(strig.roulleteName)) {
          console.log(`------------------------------------------------------------`)
          proccedRoulletAndSend(strig, string)
          return 
          }

     } else {
          console.log('Resultado não processado')
     }
});
   
})();
