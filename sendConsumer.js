const amqplib = require('amqplib/callback_api');
const arrayName = require('./jsonObjects/RoleteNames.js')

function generateRandom(maxLimit = 100){
     let rand = Math.random() * maxLimit; 
   
     rand = Math.floor(rand); // 99
   
     return Math.round(rand);
   }


 
const strategyx = [
     `Repetição de 8 vezes do Primeiro Bloco`,
     ]

const estrategiaDetect =  {
     estrategiaDetect : strategyx[0],
     roulletName : 'Türkçe_Lightning_Rulet',
     lastNumber :[generateRandom(39), generateRandom(38), generateRandom(39), generateRandom(39), generateRandom(39), generateRandom(39), generateRandom(39), generateRandom(39), generateRandom(39), generateRandom(39)],
     created : new Date().getTime(),
 }


amqplib.connect('amqp://guest:guest@localhost:5672', (err, conn) => {
     if (err) throw err;
     conn.createChannel((err, ch1) => {
          if(err) throw err;
          
     ch1.assertExchange('msg', 'fanout', {
               durable: false
          });
          
     console.log(estrategiaDetect)
     ch1.publish('cards', '', Buffer.from(JSON.stringify(estrategiaDetect)));

     setTimeout(function() {
          conn.close();
           }, 100);
     })
})            
