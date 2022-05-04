var amqp = require('amqplib/callback_api');
var amqp = require('amqplib');

// create connection to rabbitmq
amqp.connect('amqp://roullet:roullet@localhost:5672', function(err, conn) {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    // create channel
    conn.createChannel(function(err, ch) {
        if (err) {
            console.log(err);
            process.exit(1);
        }
        // create queue
        ch.assertQueue('', {
            durable: false
        });
        // send message to queue
        ch.sendToQueue('hello', new Buffer('Hello World!'));
        // consume message from queue
        ch.consume('hello', function(msg) {
            console.log(" [x] Received %s", msg.content.toString());
        }
        );
    });
}
);

