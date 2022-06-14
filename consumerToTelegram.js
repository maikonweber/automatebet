const redis = require('redis');
const { getLastNumber } = require('./database');
const { users, message } = require('telegram/client');
const clientRedis = redis.createClient({
     host: '127.0.0.1',
     port: 6379,
});

const redisPublisher = redis.createClient({
     host: '127.0.0.1',
     port: 6379,
});




const { TelegramClient, Api } = require("telegram");
const { StringSession } = require("telegram/sessions");
const input = require("input"); // npm i input
 const apiId = 17228434;
 const apiHash = 'b05e1c84ad4dd7c77e9965204c016a36';
 const stringSession = new StringSession('1AQAOMTQ5LjE1NC4xNzUuNTMBu0hSLIOFbU8aIIxTP3DyN8TpvvFzvhWTNyZpI9ab3wx4v99YYIosj0cYMeDFccmzjoAPIVlVgs/cpb+7J7hoablPmB6hQNqCJJfJgy1RgFy711OSiphW1BqXPaa8wwk2Bib+vWTcyPN88TL87cE2lbRHe/Nm8URGzoybg3HqXC6WFPtaRqpy0QJVgIS3vzxg3VskhnThUsRhVpB7cfi1+08TCCWXN0CzHk9m7Nq37BImjQv0+/xThM+8apPNMRH0Q6gtN7IEehczT0MSeDTG2S3vrmuZiRnR/NvpjP3+fjjRHsP8VzERZXu4nhW+GQL6NuY0KcdtEzHuIyUQPbD+fUM=');
const expectNumber = require('./jsonObjects/strategy');
const { sendMessage } = require('telegram/client/messages');
const {
     insertSygnal
} = require('./database')



async function regExe(string, objetoRolleta, strategyArg) {
          // RegEx Nao Intendificado
          // if true return false
          const regEx = /Não identificado/g;
          if (regEx.test(string)) {
               return false
          } else {
             const estrategiaDetect =  {
                   estrategiaDetect : string, 
                   roulleteName : strategyArg, 
                   payload : objetoRolleta,
                   created : new Date().getTime()
               }
               await insertSygnal(objetoRolleta.numberjson, string, strategyArg)
               return true
          }

}








(async () => {
     
const subcribe =  await clientRedis.duplicate()
await subcribe.connect();


await subcribe.subscribe('BetRollet', (message) => {
     const msg = JSON.parse(message)
     console.log(msg.objsResult.name)

     msg.detectStrategy.colunasRepeat.forEach(async (coluna) => {
     await regExe(coluna.coluna, msg.objsResult, msg.objsResult.name)
     })

     msg.detectStrategy.blocosRepeat.forEach(async (bloco) => {
     await  regExe(bloco.blocosRepeat, msg.objsResult, msg.objsResult.name)
     })

     msg.detectStrategy.parOrImpar.forEach(async (parImpar) => {
     await  regExe(parImpar.parOrImpar, msg.objsResult, msg.objsResult.name)
     })

     msg.detectStrategy.minorMajor.forEach(async (minorMajor) => {
     await  regExe(minorMajor.minorMajor, msg.objsResult, msg.objsResult.name) 
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