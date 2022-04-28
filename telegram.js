const { TelegramClient, Api } = require("telegram");
const { StringSession } = require("telegram/sessions");
const input = require("input"); // npm i input
const Redis = require("redis");
const publisher = Redis.createClient({
    host: "localhost",
    port: 6379,
    password: "roullet",
});


const apiId = 17228434;
const apiHash = "b05e1c84ad4dd7c77e9965204c016a36";
const stringSession = new StringSession("1AQAOMTQ5LjE1NC4xNzUuNTQBuyL3+ODWpT1HqawZpif444I42IkhMfmac8R19bptwTgCpYQMsMGb8XSFs47CBnHDo+dMA2BFomEjTKNqkG7h1PrJV/I7zjK2eA3EeLteWxzgixZCtiSGt9qO3Q2dMxXgdb7N7iSp3SpbTBgwyKVFCDf4mje486TVC14Jv354CPs5NQJJFOetZE4HTmPyLjY4yFefAPl/jCUnNDmTxv6ktdtnxOaTZPYACxDWFmTTdN9TQBLK4cmV1n98dlD7hmTqupFsUsSUsZSJfeYOqRAG8z3+fnJ7/o+UlVUaMu2820lq6TQooRN5tNrxZYwO+Jbh48kcbjt+kfs0dRKoOB4cmLQ=");
 // fill this later with the value from session.save()

(async () => {

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

    console.log(result);

    const channels = []
    let sala;   
    let entry;

    await publisher.connect();
 
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

        setInterval((async () => {
            
        const chat2 = await client.getMessages(
            thx, {
                limit : 1,
            }
        )

        chat2.forEach(
           async (chat, index) => {   
                if(chat.message.toString() != last) {
                   const lastMessage = chat.message.toString()
                    console.log(lastMessage)
                    publisher.publish("roulleteEventsTelegram", lastMessage);
                    last = lastMessage
                }
            }
        )



        }), 8000);

        





        

        // setInterval((async () => {
        // const chat = await client.getMessages(thx, {
        //     limit: 1,
        
        // });
    
        // chat.forEach(
        //     (message, index) => {
        //         if (last != message.id) {
        //             console.log(message.message);
        //             last = message
        //         }  
        // })


    // }), 7000);

    })();



