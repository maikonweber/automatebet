

const { TelegramClient, Api, client } = require("telegram");
const redis = require('redis');
const { StringSession } = require("telegram/sessions");
const input = require("input"); // npm i input
const { sendMessage } = require("telegram/client/messages");
const { strategy } = require("sharp");
const { getStrategyFilter, getLastNumber18 } = require("./database");
const expectNumber = require("./jsonObjects/strategy");
const apiId = 17228434;
const apiHash = 'b05e1c84ad4dd7c77e9965204c016a36';
const stringSession = new StringSession('1AQAOMTQ5LjE1NC4xNzUuNTMBu0hSLIOFbU8aIIxTP3DyN8TpvvFzvhWTNyZpI9ab3wx4v99YYIosj0cYMeDFccmzjoAPIVlVgs/cpb+7J7hoablPmB6hQNqCJJfJgy1RgFy711OSiphW1BqXPaa8wwk2Bib+vWTcyPN88TL87cE2lbRHe/Nm8URGzoybg3HqXC6WFPtaRqpy0QJVgIS3vzxg3VskhnThUsRhVpB7cfi1+08TCCWXN0CzHk9m7Nq37BImjQv0+/xThM+8apPNMRH0Q6gtN7IEehczT0MSeDTG2S3vrmuZiRnR/NvpjP3+fjjRHsP8VzERZXu4nhW+GQL6NuY0KcdtEzHuIyUQPbD+fUM=');
const clientRedis = redis.createClient({
     host: '127.0.0.1',
     port: 6379,
});

const roleta = 
     [
     'Turkish_Roulette',
    'UK_Roulette',
    'Roulette',
    'Football_French_Roulette',
    'Spread_Bet_Roulette',
    'Greek_Quantum_Roulette',
    'Deutsches_Roulette',
    'Speed_Roulette',
    'Prestige_Roulette',
    'Mega_Fire_Blaze_Roulette_Live',
    'Football_Roulette',
    'Quantum_Roulette_Live',
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
     'Repitição de x2 a Coluna 2',
   
     'Repetição 5 vezes da 1 ou 18',
     'Reptição 2 vezes da 1 ao 18',
     'Repitição de 3x Colunas',
     'Par 4 vezes',
     'Repetiçao de 6 vezes da Colunas 1',
     'Repetição de x2 a Coluna 1',   
     'Repei=tiçao de 4 vezes da Coluna 1',
     'Impar 3 vezez',
     'Repetição de 3x a Coluna 1',
     'Reptição 2 vezes da 1 ao 18',
     'Repetição de 3x a Coluna 1',
     'Repetição 5 vezes da 1 ou 18',
     'Repitição de 3x Colunas',
     'Par 4 vezes',
     'Repetiçao de 6 vezes da Colunas 1',
      'Repei=tiçao de 4 vezes da Coluna 1',
      'Impar 3 vezez',
      'Reptição 2 vezes da 1 ao 18',
      'Repetição de 3x a Coluna 1',
      'Par 2 vezes'

]

function proccedRoulletAndSend(sygnalBase, string, users) {
     console.log(sygnalBase, "Sygnal")
     const replace = stringReplace(string, sygnalBase)
     //sendMessage(replace)
     console.log(replace, "replace")
     const p = setMemoryResult(sygnalBase, users)
     p.then(result => {  console.log('SetMsg')}
     ).catch(err => { console.log(err) })
     
}


function setMemoryResult(sygnalBase, users) {
    // clientRedis.set(`${sygnalBase.roulleteName}_${sygnalBase.strategy}_${users}`, JSON.stringify(sygnalBase))
     const p = new Promise((resolve, reject) => {
          setTimeout(() => {
               console.log('Timeout 2') 
              // const result = clientRedis.get(`${roulleteName}_${sygnalBase.strategy}_${users}`)
              // const getLastOne = getLastNumber(sygnalBase.roulleteName)
              // console.log(getLastOne.includes(expectNumber[`${result.strategy}`]()))
              //if(getLastOne.includes(expectNumber[`${sygnalBase.strategy}`]())){
                    const setWin = updateStrategy(sygnalBase.roulleteName, sygnalBase.strategy, sygnalBase.users)
                    // Delete Set of Redis
                   // clientRedis.del(`${sygnalBase.roulleteName}_${sygnalBase.strategy}_${users}`)
                //    resolve(setWin)
              // } else {
                 //   const setLose = setLosers(sygnalBase.roulleteName, sygnalBase.strategy, sygnalBase.users)
                  setTimeout(() => {
                       console.log('Timeout 2') 
                 //        const getLastOne2 = getLastNumber(sygnalBase.roulleteName)
                 //        if(getLastOne2.includes(expectNumber[`${sygnalBase.strategy}`])){
                  //            const setWin = updateStrategy(sygnalBase.roulleteName, sygnalBase.strategy, sygnalBase.users)
                  //            resolve(setWin)
                   //      } else {
                    //          const setLose = updateStrategy(sygnalBase.roulleteName, sygnalBase.strategy, sygnalBase.users)
                    //          resolve(setLose)
                   //      }
                  }, 30000);
          }, 30000)
     })

    
     return p
}


function stringReplace(string) {
     // take all $ and replace with space
     const replace = string.replace(/\$/g, "Strategya")
     return replace
}    


(async () => {

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
     
     console.log(client.session.save());

const result = await client.invoke( new Api.messages.GetAllChats({
         exceptIds : [43]
  }));

   for(let i = 0; i < result.chats.length; i++){
       console.log(result.chats[i].id, result.chats[i].title)
    }
  

   


  

while (true) {
    // const users = await getUsersFilter(email);
     for(let i = 0; i < roleta.length; i++) {
          for(let j = 0; j < strategyx.length; j++){
               const sygnalBase = await getStrategyFilter(strategyx[j], roleta[i])
               if(sygnalBase.length > 0){
               proccedRoulletAndSend(sygnalBase, "msg", 1)
               }
          }
     }

    const p = new Promise((resolve, reject) => {
            setTimeout(() => {
               resolve();
            }, 30000);
          }    
     );
     await p;
    }
})();
