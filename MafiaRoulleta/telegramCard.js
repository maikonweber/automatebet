const { TelegramClient, Api } = require('telegram');
const { StringSession } = require('telegram/sessions');
const input = require('input'); // npm i input

const apiId = 17228434;
const apiHash = 'b05e1c84ad4dd7c77e9965204c016a36';
const stringSession = new StringSession('1AQAOMTQ5LjE1NC4xNzUuNTgBu4y2G0FNJMZ7ojvQOwd1h4LcO4gTWsywvhcBkdxfBkSbJCWaPrZj+Ex3oJHSZoRd8Su8VvuMh5IN93KqJxfPO3ko63GWuaV3dIoSJxpMNQoJwHGt5ifMpIEB/qNJsDrPLCjEznly98GVjh+2DghFSQ/IavdSkixa2gDBbVN6DDy3IjkeFOL3+uRA24OgLPyL3abaxDTaEbEPC++2k8ODlWIhpOQTf5KtCTEB7+vN5zYv08WUwLKqymn6cU8fzJUlRaPlEZ3Ff91r/v3FRABO5AHlb2V8BECPGappp3Bp5l0K/JDzk6CCXHDFF7hWAgRyhUrHdby6kVUZOb7YrkHKl98=');

(async () => {
     var queue = 'RoulletBet365';
     console.log(' [*] Waiting for messages in %s. To exit press CTRL+C', queue);
     console.log('Loading interactive example...');
       
     const client = new TelegramClient(stringSession, apiId, apiHash, {
         connectionRetries: 5,
       })
       await client.start({
          phoneNumber: async () => await input.text('Please enter your number: '),
          password: async () => await input.text('Please enter your password: '),
          phoneCode: async () =>
            await input.text('Please enter the code you received: '),
          onError: (err) => console.log(err),
        });

      console.log('You should now be connected.');
      console.log(client.session.save()); // Save this string to avoid logging in again
        await client.connect();
          console.log('You should now be logged in.');
      
      
      const result = await client.invoke( new Api.messages.GetAllChats({
              exceptIds : [43]
          }) );
      
     const mafiaCard = -1745267675;
     const junior = -1418171934;
     const mafiaCardFree = -1734065719;

     for(let i = 0; i < result.chats.length; i++){
              console.log(result.chats[i].id, result.chats[i].title)
     }

     async function sendMsg(sala, msg) {
      const salaEntity = await client.getEntity(sala)
 
     console.log(salaEntity)
 
     await client.invoke( new Api.messages.SendMessage({
          peer: salaEntity,
          message: msg.toString()
     }) );
    }

     let last = await client.getMessages(junior, {
            limit: 1,
     })

     const lastMessage = last[0].message.toString()
     console.log(lastMessage)


     while (true) {

          let lastMessage = await client.getMessages(junior, {
               limit: 1,
          });

          console.log(typeof last[0].message)

          console.log(last[0].message, lastMessage[0].message)
          console.log(lastMessage[0].message != last[0].message)

    if(lastMessage[0].message.text != last[0].message.text){
      console.log("New Message")
      const lastmsg = lastMessage[0].message
      console.log(lastmsg)
      sendMsg(mafiaCard, lastmsg)
      sendMsg(mafiaCardFree, lastmsg)


      last = lastMessage
     }


     const p = new Promise((resolve, reject) => {
          setTimeout(() => {
              resolve();
          }, 15000);
      }
     );

     await p;

     }

     })();