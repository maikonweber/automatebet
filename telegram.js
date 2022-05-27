// const { TelegramClient, Api } = require("telegram");
// const { StringSession } = require("telegram/sessions");
// const input = require("input"); // npm i input

// var amqp = require('amqplib/callback_api');


// const apiId = 17228434;
// const apiHash = "b05e1c84ad4dd7c77e9965204c016a36";
// const stringSession = new StringSession("1AQAOMTQ5LjE1NC4xNzUuNTkBu56ALdSaYUL23O5CFsgt2+z5IxJET8cjyhEeB2j+7YBtgUQvbVHh8+BhMN1+IZs/nnFtEwFpxwZnHm7P59qvCh7epulQG51Mbhw3/mO5V2xUL/vhoeYBwc5PZwrDxZ38MiYox8Y3CTK/rpvn4oKK8BbXJoJ4+XWO+5+uQj4TOQmzWM9ahDxAaFjPj9IWFqiN3LvcAJFJ1k3Q8TdSTaJQghTRIP1afQ7TdD8o5DQozl307Lg/s05Q+neNey1QghMvsUXwWfyrvzkQAqx2ma5Nl7ZhVtRhr7GxzSXQmoLtLcZGdlVky/fBtq2XsyKqXvs1GKQWftURsUb6uCdSN/XSx+w=");

// (async () => {
// var queue = "RoulletBet365";
// console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
// console.log("Loading interactive example...");
  
// const client = new TelegramClient(stringSession, apiId, apiHash, {
//     connectionRetries: 5,
//   });
                                                                                                                                                                                                                                                                                                                                                                   
// await client.start({
//     phoneNumber: async () => await input.text("Please enter your number: "),
//     password: async () => await input.text("Please enter your password: "),
//     phoneCode: async () =>
//       await input.text("Please enter the code you received: "),
//     onError: (err) => console.log(err),
//   });
// console.log("You should now be connected.");
// console.log(client.session.save()); // Save this string to avoid logging in again
//   await client.connect();
//     console.log("You should now be logged in.");


// const result = await client.invoke( new Api.messages.GetAllChats({
//         exceptIds : [43]
//     }) );

//     for(let i = 0; i < result.chats.length; i++){
//         console.log(result.chats[i].id, result.chats[i].title)
    
//     }



// const chatInvest = await client.getInputEntity(-1785323314)
// const mafiaRoleta = await client.getInputEntity(-1267429660)

// const lastMessage = await client.getMessages(chatInvest, {
//     limit: 1,
// });

// let last;

// lastMessage.forEach(
//     (chat, index) => {
//         last = chat.message.toString();
//     })

// const lastMsg = await client.getMessages(
//     chatInvest, {
//         limit: 1,
//     }
// )

// lastMsg.forEach(
//     (chat, index) => {
//         if(chat.message.toString() != last){
//             console.log(chat.message.toString())
//             client.invoke(new Api.messages.SendMessage({
//                 peer: mafiaRoleta,
//                 message: chat.message.toString()
//             }))
//         }
//     }
// )




// // const chat = await client.getMessages(thx, {
// //             limit : 1
// //         });
// // let last;
// // chat.forEach(
// // (chat, index) => {
// // last = chat.message.toString()
// //             }   
// //         )

// //         console.log(chat);

// // setInterval(async () => {   
// // const chat2 = await client.getMessages(thx, {
// //                 limit : 1,
// //             }
// //         )
// // chat2.forEach(
// //     async (chat, index) => {   
// //         if(chat.message.toString() != last) {
// //             const lastMessage = chat.message.toString()
// //             console.log(lastMessage)
// //             last = lastMessage
// //         amqp.connect('amqp://roullet:roullet@localhost:5672', function(err, conn) {
// //                 conn.createChannel(function(err, ch) {
// //                     ch.assertQueue(queue, {durable: false});
// //                     ch.sendToQueue(queue, Buffer.from(lastMessage));
// //                     console.log(" [x] Sent %s", lastMessage);
// //                     setTimeout(function() {
// //                         conn.close();
// //                     }, 500);
// //                 });
// //             });
// //         }
// //     }
// // )
// // }, 5000);

// })()