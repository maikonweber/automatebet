const amqplib = require('amqplib/callback_api');

amqplib.connect('amqp://localhost:5672', async  (err, conn) => {
     if (err) throw err;

     conn.createChannel(async (err, ch2) => {
          if(err) throw err;

     ch2.assertExchange('cards', 'fanout', {
               durable: false
     });

     ch2.assertQueue('', {
          exclusive: true
        }, function(error2, q) {
          if (error2) {
            throw error2;
          }

     ch2.bindQueue(q.queue, 'cards', '');

ch2.consume(q.queue, async function(msg) {
     if(msg.content) {
     const msgs = msg.content.toString()
     const strig =  JSON.parse(msgs); // 'message'
     console.log(strig)     



     }
}, { noAck : true} 
);

        })
     })
})
