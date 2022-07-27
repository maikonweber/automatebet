const amqplib = require('amqplib/callback_api');
const arrayName = require('jsonObjects/RoleteNames.js')

function getRandomArbitrary(min, max) {
     return Math.random() * (max - min) + min;
 }
 


const strategyx = [
     `Repetição de ${getRandomArbitrary(1,18)} vezes do Primeiro Bloco`,
     `Repitição de  ${getRandomArbitrary(1,18)} vezes do Segundo Bloco`,
     `Repitição de  ${getRandomArbitrary(1,18)}vezes do Terceira Bloco`,
     `Repetição de  ${getRandomArbitrary(1,18)} vezes da Primeira Coluna`,
     `Repetição de  ${getRandomArbitrary(1,18)}vezes da Segunda Coluna`,
     `Repetição de  ${getRandomArbitrary(1,18)} vezes da Terceira Coluna`,
      `Ausencia da Primeira Coluna  -  ${getRandomArbitrary(1,18)} vezes `,
      `Ausencia da Segunda Coluna  -  ${getRandomArbitrary(1,18)} vezes `,
      `Ausencia da Terceira Coluna  -  ${getRandomArbitrary(1,18)} vezes `,
      `Ausencia da Segundo Bloco -  ${getRandomArbitrary(1,18)} vezes `,
      `Ausencia da Terceiro Bloco -  ${getRandomArbitrary(1,18)} vezes `,
      `Ausencia da Primeiro Bloco -  ${getRandomArbitrary(1,18)} vezes `,
      `Alternando Terceira e Primeira Colunas - ${getRandomArbitrary(1,18)} vezes `,
      `Alternando Segunda e Primeira Colunas - ${getRandomArbitrary(1,18)} vezes `,
      `Alternando Primeira e Segunda Colunas - ${getRandomArbitrary(1,18)} vezes `,
      `Par ${getRandomArbitrary(1,18)} vezes`,
      `Impar ${getRandomArbitrary(1,18)} vezes`
      `Repetição ${getRandomArbitrary(1,18)} vezes da Black`,
      `Repetição ${getRandomArbitrary(1,18)} vezes da Red`,
      `Repetição ${getRandomArbitrary(1,18)} vezes da Black`,
     ]


console.log(strategyx)




const estrategiaDetect =  {
     estrategiaDetect : strategyx[getRandomArbitrary(1, 10)],
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
     
     ch1.publish('msg', '', Buffer.from(JSON.stringify(estrategiaDetect)));

     setTimeout(function() {
          conn.close();
           }, 100);
     })
})            
