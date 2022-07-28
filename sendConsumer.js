const amqplib = require('amqplib/callback_api');
const arrayName = require('./jsonObjects/RoleteNames.js')

function getRandomArbitrary(min, max) {
     return Math.random() * (max - min) + min;
 }
 
const strategyx = [
     `Repetição de 8 vezes do Primeiro Bloco`,
     ]


const estrategiaDetect =  {
     estrategiaDetect : strategyx[1],
     roulleteName : arrayName[getRandomArbitrary(1, 18)],
     payload : [ getRandomArbitrary(1,18), getRandomArbitrary(1,18),  getRandomArbitrary(1,18),  getRandomArbitrary(1,18),  getRandomArbitrary(1,18), getRandomArbitrary(1,18),  getRandomArbitrary(1,18),  getRandomArbitrary(1,18)],
     created : new Date().getTime(),
 }


amqplib.connect('amqp://guest:guest@localhost:5672', (err, conn) => {
     if (err) throw err;
     conn.createChannel((err, ch1) => {
          if(err) throw err;
          
     ch1.assertExchange('msg', 'fanout', {
               durable: false
          });
     
     ch1.publish('cards', '', Buffer.from(JSON.stringify(estrategiaDetect)));

     setTimeout(function() {
          conn.close();
           }, 100);
     })
})            
