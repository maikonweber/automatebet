

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



(async () => {
const roleta = 
     [
    'Greek_Roulette',
    'Roleta_Brasileira',
    'Roulette_Italiana',
    'French_Roulette',
    'Hindi_Roulette',
    'Roulette_Italiana',
    'Bucharest_Roulette',
    'American_Roulette',
     ]

const strategyx = [
     'Alternar colunas 1 e 2 - 2x vezes',
     'Alternar colunas 2 e 3 - 2x vezes',
     'Alternar colunas 3 e 1 - 2x vezes',

]


const string = 
`
✅ ENTRADA CONFIRMADA ✅
🎰 Roleta 🎰: {rouletteName}
🚀 Estratégia 🚀: {strategyName}
LastNumber : {last}
👉🏻 Entrada 👈🏻: : {expect}
🎯 Cobrir o zero'
`

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
     } else if (estrategiaDetect.match(/19 ao 36/g)) {
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
               "expect" : "Quebra na Colunas 2 ou Colunas 1",
               "array" : expectNumber['Alternancia da Coluna 2 e 1']()
          }
     } else if (estrategiaDetect.match(/Alternar colunas 3 e 2/g)) {
          console.log('Não encontrado')
          return {
               "expect" : "Quebra na Colunas 3 ou Colunas 2",
               "array" : expectNumber['Alternancia da Coluna 3 e 2']()
          }
     } else if (estrategiaDetect.match(/Alternar colunas 1 e 3/g)) {
          console.log('Não encontrado')
          return {
               "expect" : "Quebra na Colunas 1 ou Colunas 3",
               "array" : expectNumber['Alternancia da Coluna 1 e 3']()

          }
     } else if (estrategiaDetect.match(/Alternar colunas 1 e 2/g)) {
          console.log('Não encontrado')
          return {
               "expect" : "Quebra na Colunas 1 ou Colunas 2",
               "array" : expectNumber['Alternancia da Coluna 1 e 2']()
          }
     } else if (estrategiaDetect.match(/Alternar colunas 2 e 3/g)) {
          console.log('Não encontrado')
          return {
               "expect" : "Quebra na Colunas 2 ou Colunas 3",
               "array" : expectNumber['Alternancia da Coluna 2 e 3']()
          }
     }

 
}
   

async function sendMsg(sala, msg) {
          const salaEntity = await client.getEntity(sala)
          await client.invoke( new Api.messages.SendMessage({
               peer: salaEntity,
               message: msg.toString()
          }) );
          }

          function proccedRoulletAndSend(sygnalBase, string) {
               const replace = stringReplace(string, sygnalBase)
               //sendMessage(replace)
               return saveMemorySend(sygnalBase, replace) 
          }
          
          async function saveMemorySend(sygnalBase, string) {
               clientRedis.set(`${sygnalBase.roulletname}_${sygnalBase.estrategiaDetect}`, JSON.stringify({
                    sygnalBase: sygnalBase
               }))
               consultMemory(sygnalBase, string)
               await sendMsg(-1593932898, string)
               await sendMsg(-1266295662, string)
               await sendMsg(-1150553286, string)   
     
          }
          
          function consultMemory (sygnalBase, string) {
               console.log(sygnalBase)
               setTimeout(async () => {
               try {
                 const last = await clientRedis.get(`${sygnalBase.roulletname}_${string.estrategiaDetect}`)
                    console.log('lst', last)
                 const {
                      array,
                      expect
                 } = testStrategy(sygnalBase.estrategiaDetect)
               console.log(array, expect, "expect")
                 let resultadoAtual = await getLastNumber(sygnalBase.roulleteName)
                 console.log(sygnalBase)
                 console.log(resultadoAtual.numberjson, "resultadoAtual")
                 if(array.includes(resultadoAtual.numberjson[0])) {
                      console.log('GREEN')
                      await clientRedis.del(`${sygnalBase.roulleteName}_${sygnalBase.estrategiaDetect}`)
                      function replaceForGreen(string, resultadoAtual, sygnalBase) {
                         const replace = string.replace(/✅ ENTRADA CONFIRMADA ✅/g, '✅ GREEEEEEEN ✅')
                         const replace2 = replace.replace(/{last}/g, `${resultadoAtual.numberjson[0]} || ${resultadoAtual.numberjson[1]} || ${resultadoAtual.numberjson[2]} || ${resultadoAtual.numberjson[3]}`)
                         const replace3 = replace2.replace(/{rouletteName}/g, `${sygnalBase.roulleteName}`)
                         const replace4 = replace3.replace(/{strategyName}/g, `${sygnalBase.estrategiaDetect}`)
                         return replace4
                    }
                      await sendMsg(-1593932898, replaceForGreen(stringred, resultadoAtual, sygnalBase))  
                      await sendMsg(-1266295662, replaceForGreen(stringred, resultadoAtual, sygnalBase))
                      await sendMsg(-1150553286, replaceForGreen(stringred, resultadoAtual, sygnalBase))                        
                 } else {
                      console.log('RED')
                      await clientRedis.del(`${sygnalBase.roulleteName}_${sygnalBase.estrategiaDetect}`)
                      function replaceForRed(string, resultadoAtual, sygnalBase) {
                           const replace = string.replace(/✅ GREEN ✅/g, '🔴 RED 🔴')
                           const replace2 = replace.replace(/{last}/g, `${resultadoAtual.numberjson[0]} || ${resultadoAtual.numberjson[1]} || ${resultadoAtual.numberjson[2]} || ${resultadoAtual.numberjson[3]}`)
                           const replace3 = replace2.replace(/{rouletteName}/g, `${sygnalBase.roulleteName}`)
                           const replace4 = replace3.replace(/{strategyName}/g, `${sygnalBase.estrategiaDetect}`)
                           return replace4
                      }
                      await sendMsg(-1593932898, replaceForRed(stringred, resultadoAtual, sygnalBase))
                      await sendMsg(-1266295662, replaceForRed(stringred, resultadoAtual, sygnalBase))
                      await sendMsg(-1150553286, replaceForRed(stringred, resultadoAtual, sygnalBase))  
                      function martingale(sygnalBase, string, lastResult) {

                      }   
                 }
               } catch (error) {
                    console.log(error)
               }

               }, 22000 )
          
          }
          
          
          function stringReplace(string, sygnalBase) {
               const { estrategiaDetect, roulleteName, payload } = sygnalBase
               console.log(estrategiaDetect, payload.numberjson, "estrategiaDetect", roulleteName)

               const test = testStrategy(estrategiaDetect)
               console.log(test.expect, "-----------------------------------------------")

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
     if(strategyx.includes(strig.estrategiaDetect) && roleta.includes(strig.roulleteName)) {
          console.log(await clientRedis.get(`${string.roulleteName}_${string.estrategiaDetect}`))
          return proccedRoulletAndSend(strig, string)
          }

});
   
})();
