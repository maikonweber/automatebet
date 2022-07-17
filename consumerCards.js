obj =  {
     'H,A,H,A,H' : () => {
          return "Alternando H"
     },
     'A,H,A,H,A' : () => {
          return 'Alternando A'
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
                   lastResult : result,
                   created : new Date().getTime()
               }
               
               const created = estrategiaDetect.created;
               // Make division mock 1 minutes
               const mock = created / 1000 / 60;
               const mockDivision = Math.floor(mock);
     
               
               console.log('=========================================================================')
               console.log(estrategiaDetect.estrategiaDetect, estrategiaDetect.roulleteName)
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

     
const amqplib = require('amqplib/callback_api');
const { getCards } = require('./database')

function getStrategy(strategy, value, number){
          // Received the number of element need remove to value array
          // Return the array with the element removed
  

const StringValue = value.toString()
     console.log(StringValue)
if(strategy[`${StringValue}`]) {
     return strategy[`${StringValue}`]();
     } 
     return `Não identificado ${StringValue}` ;
}
     

setInterval(async ()=> {
     // Consultar na Base os Ultimos 5 registros 
     const getDatabaseOfCard = await getCards(5) 
     console.log(getDatabaseOfCard)
     let strategy  = []
     getDatabaseOfCard.forEach(function (element) {
          strategy.push(element.lastnumber)
     })
     let kkk;
     console.log(strategy)
     const returns = getStrategy(obj, strategy, 5)
     console.log(returns)

     await regExe(returns, strategy)
     // Jogar para uma fila RabbitMq.
     // c

}, 7000)