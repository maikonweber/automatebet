var amqp = require('amqplib/callback_api');

amqp.connect('amqp://roullet:roullet@localhost:5672', function(err, conn) {
    if(err) {
    throw err;
   }

conn.createChannel(function(err, ch) {
        if (err) {
            throw err;
        }   
  var queue = "RoulletBet365";
ch.assertQueue(queue, {durable: false});
 console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

ch.consume(queue, function(msg) {
  let message = msg.content.toString();
  let regEx = /Entrar/g;
  if (message.match(regEx)) {
    console.log(" [x] Received %s", message);
  } else {
    console.log(" [x] Received %s", message);
  }


}, {noAck: true});

  });
}    
);
