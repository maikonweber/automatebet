

const { TelegramClient, Api } = require("telegram");
const redis = require('redis');
const { StringSession } = require("telegram/sessions");
const { getUsersFilter } = requre('./database');
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

function proccedRoulletAndSend(sygnalBase, string, users) {
     const replace = stringReplace(string, sygnalBase)
     setMemoryResult(sygnalBase, users)
     sendMessage(replace)
}


function setMemoryResult(sygnalBase, users) {
     const result = await clientRedis.get(`${users}_${detectstretegy}`)
     if (result) {
          const result = getLastNumber18(result)
          if (expectNumber[`${sygnalBase}`](result.numberjson[0])) {
               sendMessage(Win)
               clientRedis.del(`${users}_${detectstretegy}`)
               return true
          } else {
               sendMessage(Lose)
               clientRedis.del(`${users}_${detectstretegy}`)
               clientRedis.set(`${users}_${detectstretegy}_${martingale}`, result.numberjson[0])
          }

     } else {
          clientRedis.set(`${users}_${sygnalBase}_${roulleta}`, JSON.stringify(sygnalBase))
          
     }
}

function stringReplace(string) {


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
  

    const users = await getUsersFilter();
    console.log(users);



  

while (true) {
     const users = await getUsersFilter(email);
     for(let i = 0; i < roulleta.length; i++) {
          for(let j = 0; j < strategy.length; j++){
               const sygnalBase = await getStrategyFilter(strategy[j], roulleta[i])
               proccedRoulletAndSend(sygnalBase, users[0].string, users[0].id)
          }
     }

    const p = new Promise((resolve, reject) => {
            setTimeout(() => {
               resolve();
            }, 8000);
          }    
     );
     await p;
    }
})();
