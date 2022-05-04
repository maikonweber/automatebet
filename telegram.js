const { TelegramClient, Api } = require("telegram");
const { StringSession } = require("telegram/sessions");
const input = require("input"); // npm i input

var amqp = require('amqplib/callback_api');


const apiId = 17228434;
const apiHash = "b05e1c84ad4dd7c77e9965204c016a36";
const stringSession = new StringSession("1AQAOMTQ5LjE1NC4xNzUuNTQBu6Cot9z8LEumwKaribM4vBZaDBoTSjuYcd+6cJ9pNAdNvPWjhYOQtxBl/VS6uOKawb7KHN9aH/ImIuV3ExfJliWSF/wIXfo48YGzXPUiiDybPISeaxqfgAYeA5KmFH3zCjUcyJI6UK72M2Hw8CMCLPuPbWAycLGDlOkEf1jD0lzlkNPH6CrjzzHVkgI4wKPShiB0F5Ei5pG45mUknHEuP16jrVc4hhvfVGW3GoGf0r2Dk/GsZX+Qn1AUp5mfNJYrglIh8sN8nsBrh9IyMouP3imOob+AgehnBmk0Kf4XKWRUvqctsslBYXfn+FFhlFRcprufmyMt6gQ4x4yd6AX+sFI=");

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
                    
                });
            });
        }
    }
)
}, 5000);

})()