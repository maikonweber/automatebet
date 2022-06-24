const redis = require('redis');
const { getLastNumber } = require('./database');
const { users, message } = require('telegram/client');
const clientRedis = redis.createClient({
     host: '127.0.0.1',
     port: 6379,
});
const clientPublisher = redis.createClient({
     host: '127.0.0.1',
     port: 6379,
})

const { TelegramClient, Api } = require("telegram");
const { StringSession } = require("telegram/sessions");
const input = require("input"); // npm i input
 const apiId = 17228434;
 const apiHash = 'b05e1c84ad4dd7c77e9965204c016a36';
 const stringSession = new StringSession('1AQAOMTQ5LjE1NC4xNzUuNTkBu4wJn7a2aFmB8O1STHkyvsob81Tu2qFA5+xrilx/4dBq7w+Mf8Bmq2fQvbT8RstllplnDHFw2LbwaiVj1Y3uhJrYzYfV75b73Fe3o7B1jZvC3odx3eAefT22iFBK2Lyj6Fk/7XgngubsHBWRd3lmGY1Ly4N7S5bc7n4ncLFEQBQxRXq4WnaHPAUZQ5NEcAJtGjp+0S16OAlEJG2uSXITkUsNSavJg/++ibtGPs3H5CI/6mrNMY4DV3ZWv64EN7Mmp5lKEkVkXXsqIaMDNFIYVXe3u9lysIW6I2Tzsg4T4dPGCMIKhOcq2Ox7/hkCaFkTG5qJaSDdzLyZICMnaFRdLR0=');
const expectNumber = require('./jsonObjects/strategy');
const { sendMessage } = require('telegram/client/messages');
const {
     insertSygnal,
     updateStrategy,
     updateStrategyFilter

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
               
               const created = estrategiaDetect.created;
               // Make division mock 1 minutes
               const mock = created / 1000 / 60;
               const mockDivision = Math.floor(mock);
               
               console.log('=========================================================================')
               console.log(estrategiaDetect.estrategiaDetect, estrategiaDetect.roulleteName)
               const insert = await insertSygnal(estrategiaDetect.payload.concat, estrategiaDetect.estrategiaDetect, estrategiaDetect.roulleteName)
               console.log(insert)
               estrategiaDetect.id =  insert
               return await clientPublisher.publish('msg', JSON.stringify(estrategiaDetect));
               
               return true
          }

}









(async () => {
     
const subcribe =  await clientRedis.duplicate()
await subcribe.connect();
await clientPublisher.connect();
// uPublicar esta msg no redis


await subcribe.subscribe('BetRollet', (message) => {
     const msg = JSON.parse(message)
     msg.detectStrategy.colunasRepeat.forEach(async (coluna) => {
     await regExe(coluna.coluna, msg, msg.objsResult.name)
     })

     msg.detectStrategy.blocosRepeat.forEach(async (bloco) => {
     await  regExe(bloco.blocosRepeat, msg, msg.objsResult.name)
     })

     msg.detectStrategy.parOrImpar.forEach(async (parImpar) => {
     await  regExe(parImpar.parOrImpar, msg, msg.objsResult.name)
     })

     msg.detectStrategy.minorMajor.forEach(async (minorMajor) => {
     await  regExe(minorMajor.minorMajor, msg, msg.objsResult.name) 
     })

     msg.detectStrategy.alternateColumns.forEach(
     async (alternateColumns) => {
          await regExe(alternateColumns.alternateColumns, msg, msg.objsResult.name)
     
     })

     msg.detectStrategy.colorRepeat.forEach(
          async (color) => {
               console.log(color)
               await regExe(color.color, msg, msg.objsResult.name)
          }
     )


    // message.header recebe um filtro para o tipo de mensagem
     // message.body recebe o corpo da mensage
     //for(let i = 0; i < User.length; i++){
       //   if(header.msg.roullete.include(User[i].roulletPermit) && header.msg.strategy.include(User[i].strategyPermit) ){
           //    User[i].sendMessage(message.body)
         // }
     //}
})




})();