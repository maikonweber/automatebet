const { TelegramClient, Api } = require("telegram");
const { StringSession } = require("telegram/sessions");
const input = require("input"); // npm i input

var amqp = require('amqplib/callback_api');


const apiId = 17228434;
const apiHash = "b05e1c84ad4dd7c77e9965204c016a36";
const stringSession = new StringSession("1AQAOMTQ5LjE1NC4xNzUuNTIBuyQumXHrrEazI1qW67uMjnbsM8CgI/GHy4nrzJjOIXalXrWwlnLwfLoypAPX75Mz+IvQgRIECVnnS/aGoe03mMZksfaFokDA9v7gfbkCGSlh/ryfT0qyRnhLb+fPLZWpFCLtyT/bbq3pxnU/O7/cs1rEvp3uUAJTWZUz5prpU86Voux3aJJQ4yqax+0lfmtPNsmrYGgR8n69QUkdtfea5OQq1/mFycltxwcjIW5yD92yMxlrzU0HeSswVX6K2fcbMdoluSs6VlWn+T+tp/RXHpl7wHJpWl0vZXXARr9RhxHc7GRCAB//UX71fqcYJq0qQqY6si8Ag6SBgvWcvOb4rWY=");

(async () => {
var queue = "RoulletBet365";
console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
console.log("Loading interactive example...");
  
const client = new TelegramClient(stringSession, apiId, apiHash, {
    connectionRetries: 5,
  });
                                                                                                                                                                                                                                                                                                                                                                   
await client.start({
    phoneNumber: async () => await input.text("Please enter your number: "),
    password: async () => await input.text("Please enter your password: "),
    phoneCode: async () =>
      await input.text("Please enter the code you received: "),
    onError: (err) => console.log(err),
  });
console.log("You should now be connected.");
console.log(client.session.save()); // Save this string to avoid logging in again
  await client.connect();
    console.log("You should now be logged in.");


const result = await client.invoke( new Api.messages.GetAllChats({
        exceptIds : [43]
    }) );

 
const thx = await client.getInputEntity(-1575582320);

const chat = await client.getMessages(thx, {
            limit : 1
        });
let last;
chat.forEach(
(chat, index) => {
last = chat.message.toString()
            }   
        )

        console.log(chat);

setInterval(async () => {   
const chat2 = await client.getMessages(thx, {
                limit : 1,
            }
        )
chat2.forEach(
    async (chat, index) => {   
        if(chat.message.toString() != last) {
            const lastMessage = chat.message.toString()
            console.log(lastMessage)
            last = lastMessage
        amqp.connect('amqp://roullet:roullet@localhost:5672', function(err, conn) {
                conn.createChannel(function(err, ch) {
                    ch.assertQueue(queue, {durable: false});
                    ch.sendToQueue(queue, Buffer.from(lastMessage));
                    console.log(" [x] Sent %s", lastMessage);
                    setTimeout(function() {
                        conn.close();
                    }, 500);
                });
            });
        }
    }
)
}, 5000);

})()