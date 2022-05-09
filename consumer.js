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
      let lines = message.split("\n");
      let obj = {};
      for(let i = 0; i < lines.length; i++) {
        let line = lines[i];
        obj[i] = line;
      }
      let regEx = /Entrar no:/g;
      if(swh == false) {
      if(regEx.test(obj[1])) {
        let entrada = obj[0].replace(/Entrar no:/g, "");
        insertObject.entrada = entrada;
        let sala = obj[1].replace(/Sala:/g, "");
        insertObject.sala = sala;
        swh = true;
      } else {
        console.log(obj, "não é entrada");
      }
    } else {
      console.log(obj)
      let green = /GREEN/g
      let red = /Esse não deu/g
      let firstgale = /1º Gale/g
      let secondgale = /2º Gale/g
      let zero = /ZEROOO/g
      if(green.test(obj[0]) || zero.test(obj[0])) {
        if (obj[0].includes("ZERO")) {
          insertObject.zero = true;
        }
        insertObject.result = true;
        console.log('Insert Object Win')
        console.log(insertObject)
        let result =  await insertNewSygnal(insertObject.entrada, insertObject.sala, insertObject.result, insertObject.fistGale, insertObject.secondGale, insertObject.zero);
        if(result) {
        insertObject.entrada = "";
        insertObject.sala = "";
        insertObject.fistGale = false;
        insertObject.secondGale = false;
        insertObject.result = false;
        insertObject.zero = false;
        swh = false;
        }
      }
      if(red.test(obj[0])) {
        insertObject.result = false;
        console.log('Insert Object Lose')
        console.log(insertObject)
        let result = await insertNewSygnal(insertObject.entrada, insertObject.sala, insertObject.result, insertObject.fistGale, insertObject.secondGale, insertObject.zero);
        // Clean Object
        if(result) {
        insertObject.entrada = "";
        insertObject.sala = "";
        insertObject.fistGale = false;
        insertObject.secondGale = false;
        insertObject.result = false;
        insertObject.zero = false;
        swh = false;
        }
      }
      if(firstgale.test(obj[0])) {
        console.log('Insert Object FirstGale')
        insertObject.fistGale = true;
      }
      if(secondgale.test(obj[0])) {
        console.log('Insert Object FirstGale')
        insertObject.secondGale = true;
      }
    }
     
      
    }, { noAck: true });
})

});