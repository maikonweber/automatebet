const redis = require('redis');
const { getLastNumber } = require('./database');
const { users, message } = require('telegram/client');
const clientRedis = redis.createClient({
     host: '127.0.0.1',
     port: 6379,
     expire: 180
});


const { TelegramClient, Api } = require("telegram");
const { StringSession } = require("telegram/sessions");
const input = require("input"); // npm i input
 const apiId = 17228434;
 const apiHash = 'b05e1c84ad4dd7c77e9965204c016a36';
 const stringSession = new StringSession('1AQAOMTQ5LjE1NC4xNzUuNTMBu0hSLIOFbU8aIIxTP3DyN8TpvvFzvhWTNyZpI9ab3wx4v99YYIosj0cYMeDFccmzjoAPIVlVgs/cpb+7J7hoablPmB6hQNqCJJfJgy1RgFy711OSiphW1BqXPaa8wwk2Bib+vWTcyPN88TL87cE2lbRHe/Nm8URGzoybg3HqXC6WFPtaRqpy0QJVgIS3vzxg3VskhnThUsRhVpB7cfi1+08TCCWXN0CzHk9m7Nq37BImjQv0+/xThM+8apPNMRH0Q6gtN7IEehczT0MSeDTG2S3vrmuZiRnR/NvpjP3+fjjRHsP8VzERZXu4nhW+GQL6NuY0KcdtEzHuIyUQPbD+fUM=');
const expectNumber = require('./jsonObjects/strategy');


async function sendMensagem(message, messageBody, chatId) {
     const telegramClient = new TelegramClient(apiId, apiHash, stringSession);
     const api = new Api(telegramClient);
     messageReplace = replaceMsg(messagem, messageBody);
     const chat = await api.invoke("sendMessage", {
          chat_id: chatId,
          text: message
     });
     console.log(chat);
}


async function replaceMsg(msg, bodyToReplace) {
     
     return msgToReplace;
     }

function regExe(string, objetoRolleta, strategyArg) {
          // RegEx Nao Intendificado
          // if true return false
          const regEx = /Não identificado/g;
          if (regEx.test(string)) {
               return false
          } else {
               console.log('RegExe: ', string, objetoRolleta.name)
          return true
          }

}

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


(async () => {
     
const subcribe =  await clientRedis.duplicate()


await subcribe.connect();


await subcribe.subscribe('BetRollet', (message) => {
     const msg = JSON.parse(message)
  
     msg.detectStrategy.colunasRepeat.forEach(async (coluna) => {
         
          console.log(regExe(coluna.coluna, msg.objsResult, msg.objsResult.name))


     })


    // message.header recebe um filtro para o tipo de mensagem
     // message.body recebe o corpo da mensage
     //for(let i = 0; i < User.length; i++){
       //   if(header.msg.roullete.include(User[i].roulletPermit) && header.msg.strategy.include(User[i].strategyPermit) ){
           //    User[i].sendMessage(message.body)
         // }
     //}
})




})();