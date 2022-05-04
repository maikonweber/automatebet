var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(err, conn) {
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

        ch.sendToQueue(queue, new Buffer('Hello World!'));
        console.log(" [x] Sent 'Hello World!'");

    });
});
