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
const stringSession = new StringSession("1AQAOMTQ5LjE1NC4xNzUuNTQBu4koD9vmeJ6R3223K8S6u/rPXb/Ja6jCUR7FRjbKqg1Rn3xbQcZneRJMCt9tnq5wNK/30AIMt6m0HL85vMYrj8efXu8q8Wirpybvr2rmEc+UNGKh6WOLXJrHP74K49Scu5kyQim/DYJFtvkrM+WzwyVnt4JjTSvfLBLa6hOaENcVRcpssQODlVK+NTKMvwn2bwPpTTcvwm3VLuNRgKr1+40Sf+o+duk0f6zZwg7GxQhl5xcxGJU8J9DvkUp8hii8QGYrXIPNx9TBiAg8VJJ9GQgqsKJDMpACz9sgdcTqIqQl638dTNkxnmfxNnVqSKIadf0DKVyztmcoeQXulB+RJ2g=");
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
                   if (entry === true) {
                    console.log("===========================================================");
                    console.log("==========================/Entry = True/===============================");
                    console.log("===========================================================");
                    let regEx2 = /Abortar possível entrada/g
                   if (regEx2.test(lastMessage)) {
                        await publisher.publish("roulletsEvents", "Abortar possível entrada");
                        console.log("Entrada negada!");
                        console.log("==========================/Entry = True/===============================");
                        console.log("==========================/Entrada Abortada ===============================");
                        entry = false;
                    } else  {   
                        console.log("===========================================================");
                          console.log("==========================/Entry = True/===============================");
                          console.log("===========================================================");
                        const line = lastMessage.split("\n")
                        let object = {
                            name : line[0],
                            id : line[1],
                            time : line[2]
                        }
                        console.log(object);
                        await publisher.publish("roulletsEvents", JSON.stringify(object));
                        entry = false;
                        last = lastMessage
                    } 
                    } else {
                    console.log("===========================================================");
                    console.log("==========================/Entry = False/===============================");
                    let regEx = /Possível entrada/g
                    let result = lastMessage.match(regEx)
                    if(result != null) {
                    console.log("Possível entrada!");
                    const lines = lastMessage.split("\n")
                    console.log(lines[2])
                    sala = lines[2]
                    await publisher.publish("roulletsEvents", lines[2]);
                    entry = true
                    
                                    } else {
                                            console.log("Não foi possível identificar um entrada")
                                             }
                        last = lastMessage   
                }
            }
        }
        )



        }), 35000);

        





        

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



