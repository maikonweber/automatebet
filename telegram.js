const { TelegramClient, Api } = require("telegram");
const { StringSession } = require("telegram/sessions");
const input = require("input"); // npm i input
const { getStrategyByRoullet } = require('./database')


var amqp = require('amqplib/callback_api');

const arrayName = [
"UK_Roulette",
"Roleta_Brasileira",
 "Football_French_Roulette",
 "Who_Wants_To_Be_a_Millionaire?_Roulette",
 "Speed_Auto_Roulette",
 "Prestige_Roulette",
 "Age_Of_The_Gods_Bonus_Roulette",
 "Roulette_Italiana",
 "Triumph_French_Roulette",
 "French_Roulette",
 "American_Roulette",
 "Triumph_Roulette",
 "Turkish_Roulette",
 "Hindi_Roulette",
 "Mega_Fire_Blaze_Roulette_Live",
 "Spread_Bet_Roulette",
 "Roulette",
 "Auto_Roulette",
 "Deutsches_Roulette",
 "Greek_Roulette",
 "Super_Spin_Roulette",
 "bet365_Roulette",
 "Greek_Quantum_Roulette",
 "Roleta_Brasileira",
 "Football_Roulette",
 "Speed_Roulette",
 "Prestige_Roulette",
 "Speed_Auto_Roulette",
 "UK_Roulette",
 "bet365_Dutch_Roulette",
 "Deutsches_Roulette"
]
// */


const apiId = 17228434;
const apiHash = "b05e1c84ad4dd7c77e9965204c016a36";
const stringSession = new StringSession("1AQAOMTQ5LjE1NC4xNzUuNTMBu0hSLIOFbU8aIIxTP3DyN8TpvvFzvhWTNyZpI9ab3wx4v99YYIosj0cYMeDFccmzjoAPIVlVgs/cpb+7J7hoablPmB6hQNqCJJfJgy1RgFy711OSiphW1BqXPaa8wwk2Bib+vWTcyPN88TL87cE2lbRHe/Nm8URGzoybg3HqXC6WFPtaRqpy0QJVgIS3vzxg3VskhnThUsRhVpB7cfi1+08TCCWXN0CzHk9m7Nq37BImjQv0+/xThM+8apPNMRH0Q6gtN7IEehczT0MSeDTG2S3vrmuZiRnR/NvpjP3+fjjRHsP8VzERZXu4nhW+GQL6NuY0KcdtEzHuIyUQPbD+fUM=");



(async () => {
var queue = "RoulletBet365";
console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
console.log("Loading interactive example...");
  
const client = new TelegramClient(stringSession, apiId, apiHash, {
    connectionRetries: 5,
  })



const obj = {
     "MesaVip" : function (estrategia) {
          return `✅ ENTRADA CONFIRMADA ✅
          🎰 Roleta 🎰: ${estrategia.name}
          🚀 Estratégia 🚀: ${estrategia.typestregia}
          👉🏻 Entrada 👈🏻: ${estrategia} 
          ${estrategia.fistNumber} | ${estrategia.secondNumber} | ${estrategia.threeNumber} 
          🎯 Cobrir o zero"`
     }
}


async function clientSendMsgGrupo (client, grupoId, mensagem) {
     const sala = await client.getInputEntity(messageId)
     
     return   client.invoke(new Api.messages.SendMessage({
                          peer: sala,
                          message: chat.message.toString()
                      }))

}


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


    for(let i = 0; i < result.chats.length; i++){
        console.log(result.chats[i].id, result.chats[i].title)
    }

// 1150553286n } MÁFIA DA ROLETA - [VIP] 🎰💰
// Integer { value: 1266295662n } VR BOT
// Integer { value: 1267429660n } MÁFIA DA ROLETA - [FREE] 🎰💰
// Integer { value: 1581808712n } NOVA MINING INVESTMENT
// Integer { value: 1614635356n } Mesa VIP | Bot Cassino 🎰
// Integer { value: 1629499483n } RoosterBattle - Brazilian Community
setInterval(() => {
     arrayName.forEach(async (Element) => {
          const result = await getStrategyByRoullet(Element)
          if (typeof result != 'undefined') {
               console.log("result undefined")
          } else {
               console.log(result)
          }
     })


}, 35000 / 2)



})()






// const mafiaRoleta = await client.getInputEntity(-1267429660)

// setInterval(async () => {


//                }, 5000)

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

