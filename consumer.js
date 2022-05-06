var amqp = require('amqplib/callback_api');
var redis = require('redis');
var { 
  insertNewSygnal
} = require('./database');


// Cache redis
var redisClient = redis.createClient({  
    host: 'localhost',
    port: 6379,
    password: "roullet"
  });



amqp.connect('amqp://roullet:roullet@localhost:5672', function(err, conn) {
    if(err) {
    throw err;
   }

conn.createChannel( async (err, ch) => {
    if (err) {
      throw err;
    }
    var queue = "RoulletBet365";
    let insertObject = {
      entrada: "",
      sala: "",
      fistGale: false,
      secondGale: false,
      result: false,
      zero: false
    };

    let swh = false;
    let gale = false;
    ch.assertQueue(queue, { durable: false });
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

    ch.consume(queue, async (msg) => {
      let message = msg.content.toString();
      let regEx = /Entrar/g;
      let green = /GREEN PAPAI/g;
      let gale = /Vamos para o 1° Gale/g;
      let gale2 = /Vamos para o 2° Gale/g;
      let ZERO =  /ZEROOOOO!!!/g;
      let red = /Esse não deu!"/g;
      let red2 = /Dê um tempo e volte mais tarde!"/g;

      if (regEx.test(message)) {
        console.log("Entrada", message);
        //Break lines of message
        let lines = message.split("\n");
        let line1 = lines[0];
        let line2 = lines[1];
        let line3 = lines[2];
        // test line 3 if ZERO
        // Remove the match RegEx fot line1
        let salEx = /Sala: /g;
        let salEx2 = /Entrar no: /g;
        let sal = line1.replace(salEx, "");
        let sal2 = line2.replace(salEx2, "");
        insertObject.sala = sal;
        insertObject.entrada = sal2;
        console.log(insertObject);
        swh = true;
      } else {
        console.log("Possível Entrada ou Mensagem não é reconhecida")
      }
      if (swh === true) {
        if (green.test(message) || ZERO.test(message)) {
          console.log("Green")
          if (ZERO.test(message)) {
            insertObject.zero = true;
          }
          insertObject.result = true;
        
          let result = await insertNewSygnal(insertObject.sala, insertObject.entrada, insertObject.result, insertObject.fistGale, insertObject.secondGale, insertObject.zero);
          console.log(result.rows[0].id, 'Result');
          insertObject = {
            entrada: "",
            sala: "",
            fistGale: false,
            secondGale: false,
            result: false,
            zero: false
        }
            swh = false;
       } else if (gale.test(message)) {
          console.log("1° Gale ", message);
          insertObject.fistGale = true;
          swh = true;
        } else if (gale2.test(message)) {
          console.log("2 Galee", message);
          insertObject.secondGale = true;
          swh = true;
          console.log(insertObject);

        } else if (red.test(message) || red2.test(message)) {
          if (ZERO.test(message)) {
            insertObject.zero = true;
          }
          let result = await insertNewSygnal(insertObject.sala, insertObject.entrada, false, insertObject.fistGale, insertObject.secondGale, insertObject.zero);
          console.log(result.rows[0].id, 'Result');
          insertObject = {
            entrada: "",
            sala: "",
            fistGale: false,
            secondGale: false,
            result: false,
            zero: false
          };

          console.log("Resultado Negativo")
          swh = false;
        } else {
          console.log("Não é reconhecido");
      }
    }
}, { noAck: true });




  });
}    
);
