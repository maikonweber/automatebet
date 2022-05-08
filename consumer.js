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
    let gale2 = false;
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
      console.log(message);
      if (swh = false) {
        if (message.match(regEx)) {
          let lines = message.split("\n");
          let line1 = lines[0];
          let line2 = lines[1];
          let line3 = lines[2];
          let salEx = /Sala: /g;
          let salEx2 = /Entrar no: /g;
          let sal = line1.replace(salEx, "");
          let sal2 = line2.replace(salEx2, "");
          insertObject.sala = sal;
          insertObject.entrada = sal2;
          console.log(insertObject);
          swh = true;
      } else {
        console.log("Não é entrada esperada", message, "lines 66");
      }
    } else {
      if (gale = false ) {
      if (message.match(green)) {
        insertObject.result = true;
        // Insert into database
        let result = await insertNewSygnal(insertObject.sala, insertObject.entrada, true, false, false, false);
        console.log("Green", "lines 73", insertObject.entrada, insertObject.sala);
        swh = false;
        gale = false;
        insertObject.entrada = "";
        insertObject.sala = "";
        insertObject.fistGale = false;
        insertObject.secondGale = false;
        insertObject.result = false;
        insertObject.zero = false;


      } else if (message.match(gale)) {
        insertObject.fistGale = true;
        gale = true;
      } else {
        if (message.match(ZERO)) {
          insertObject.zero = true;
          let result = await insertNewSygnal(insertObject.sala, insertObject.entrada, true, false, false, true);
          console.log("Zero", "lines 83", insertObject.entrada, insertObject.sala);
          swh = false;
          gale = false;
          // Clear Object 
          insertObject.entrada = "";
          insertObject.sala = "";
          insertObject.fistGale = false;
          insertObject.secondGale = false;
          insertObject.result = false;
          insertObject.zero = false;
        }
      }
    } else {
      if (gale2 = false) {
      if (message.match(green)) {
        insertObject.result = true;
        result = await insertNewSygnal(insertObject.sala, insertObject.entrada, true, true, false, false);
        gale = false;
        swh = false;

        insertObject.entrada = "";
        insertObject.sala = "";
        insertObject.fistGale = false;
        insertObject.secondGale = false;
        insertObject.result = false;


      } else if (message.match(gale2)) {
        insertObject.secondGale = true;
        gale2 = true;
      } else {
        if (message.match(ZERO)) {
          insertObject.zero = true;
          let result = await insertNewSygnal(insertObject.sala, insertObject.entrada, true, true, false, true);
          swh = false;
          gale = false;

          insertObject.entrada = "";
          insertObject.sala = "";
          insertObject.fistGale = false;
          insertObject.secondGale = false;
          insertObject.result = false;

        } 
    }
  } else {
      if (message.match(red)) {
        insertObject.result = false;
        let result = await insertNewSygnal(insertObject.sala, insertObject.entrada, false, true, true, false);
        console.log("Red", "lines 89", insertObject.entrada, insertObject.sala);
        swh = false;
        gale = false;
        gale2 = false;

        // Clear Object
        insertObject.entrada = "";
        insertObject.sala = "";
        insertObject.fistGale = false;
        insertObject.secondGale = false;
        insertObject.result = false;

      } else if (message.match(green)) {
        insertObject.result = true;
        let result = await insertNewSygnal(insertObject.sala, insertObject.entrada, true, true, true, false);
        console.log("Green", "lines 94", insertObject.entrada, insertObject.sala);
        swh = false;
        gale = false;
        gale2 = false;

        insertObject.entrada = "";
        insertObject.sala = "";
        insertObject.fistGale = false;
        insertObject.secondGale = false;
        insertObject.result = false;

      } else {
        if (message.match(ZERO)) {
          insertObject.zero = true;
          let result = await insertNewSygnal(insertObject.sala, insertObject.entrada, true, true, true, false);
          swh = false;
          gale = false;
          gale2 = false;

          insertObject.entrada = "";
          insertObject.sala = "";
          insertObject.fistGale = false;
          insertObject.secondGale = false;
          insertObject.result = false;
        }
      }
    }
  }
}      
}, { noAck: true });
})

});