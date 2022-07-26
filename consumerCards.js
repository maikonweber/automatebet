const { getLastCard } = require('./database')


const input = require("input"); // npm i input
const { createClient }  = require('redis');
const Redis = require("ioredis");
const redis = new Redis();
const amqplib = require('amqplib/callback_api');

obj =  {
     'H,A,H,A,H' : () => {
          return "Alternando Home - 5 vezes"
     },
     'A,H,A,H,A' : () => {
          return 'Alternando Away -  5 vezes'
     },
     'H,A,H,A' : () => {
          return 'Alterando Home - 4 Vezes'
     },
     'A,H,A,H' : () => {
          return 'Alternando Away - 4 Vezes'
     }
}

async function regExe(string, result) {
          // RegEx Nao Intendificado
          // if true return false
          const regEx = /Não identificado/g;
          if (regEx.test(string)) {
               return false
          } else {
             const estrategiaDetect =  {
                   estrategiaDetect : string, 
                   lastResult : result.number,
                   name: result.name,
                   created : new Date().getTime()
               }
               
               const created = estrategiaDetect.created;
               // Make division mock 1 minutes
               const mock = created / 1000 / 60;
               const mockDivision = Math.floor(mock);
               
               console.log(JSON.stringify(estrategiaDetect))               
               console.log('=========================================================================')
               console.log(estrategiaDetect.estrategiaDetect, estrategiaDetect.name)
               console.log('=========================================================================')
               amqplib.connect('amqp://guest:guest@localhost:5672', (err, conn) => {
                    if (err) throw err;
                    conn.createChannel((err, ch1) => {
                         if(err) throw err;        
                    ch1.assertExchange('cards', 'fanout', {
                              durable: false
                         });
                    ch1.publish('cards', '', Buffer.from(JSON.stringify(estrategiaDetect)));
     
                    setTimeout(function() {
                         conn.close();
                          }, 200);
                    })
               })         
          }
     }

function getStrategy(strategy, value, number){
          // Received the number of element need remove to value array
    // Return the array with the element removed
console.log(strategy, value, number)
const array2 = new Array(...value)  // Copy the array     
    // remove the element from the array
for(number; number > 0; number--) {
         array2.pop()     
}
  

const StringValue = array2.toString()
     console.log(StringValue)
if(strategy[`${StringValue}`]) {
     console.log(strategy[`${StringValue}`]())
     return strategy[`${StringValue}`]();
     } 
     return `Não identificado ${StringValue}` ;
}

const name = [
     'Football_studio',
     'Türkçe_Futbol_Stüdyosu'
]

setInterval(async ()=> {
     // Consultar na Base os Ultimos 5 registros 
     name.forEach(async (elem) => { 
     const getDatabaseOfCard = await getLastCard(elem) 
     console.log(elem)
     const returns = getStrategy(obj, getDatabaseOfCard[0].number, 6)
     const returns4 = getStrategy(obj, getDatabaseOfCard[0].number, 5)
     await regExe(returns, getDatabaseOfCard)
     await regExe(returns4, getDatabaseOfCard)
     // Jogar para uma fila RabbitMq.
     // c
     })

}, 7000)

  
