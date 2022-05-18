var amqp = require('amqplib/callback_api');



let queue = 'bet365RoulletProcced'
amqp.connect('amqp://roullet:roullet@localhost:5672', function(err, conn) {
    if(err) {
    throw err;
   }

conn.createChannel( async (err, ch) => {
if (err) {
throw err;
}

ch.assertQueue(queue, { durable: false });


ch.consume(queue, async (msg) => {
    
    const lol = JSON.parse(msg.content)

    for(let i = 0; i < lol.length; i++) {
        console.log(lol[i].number)


    }





    
});

});

});

