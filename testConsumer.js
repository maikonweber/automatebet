const amqplib = require('amqplib/callback_api');
const { TelegramClient, Api, client } = require("telegram");
const { StringSession } = require("telegram/sessions");
const { getStrategyFilter, getLastNumber18, getLastNumber, getUsersFilter } = require("./database");
const  testStrategy  = require('./functions/testStrategy')

const {
     downNumber,
     proccedAlert,
     promisseDelete,
     deleteMsg,
     stringReplace,
     martingale,
     consultMemory,
     replaceForRed,
     replaceForGreen,
     saveMemorySend,
     proccedRoulletAndSend,
     sendMsg
} = require('./consumer/consumerRoletaY')

const detectEstrategiaRoleta = require('./ObjectDetect.js')
const users = await getUsersFilter('mafiaroleta@gmail.com')
console.log(users)

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
     let msgs = msg.content.toString()
     msgs = JSON.parse(msgs)  
     const { array, expect } = testStrategy(msgs.estrategiaDetect)
     const ObjectDetect = new detectEstrategiaRoleta(msgs.estrategiaDetect, msgs.lastNumber, 'Salon_Privé_Roulette', array, expect)
     ObjectDetect.init()
     

}
}, { noAck : true} 
);
})
})
})
