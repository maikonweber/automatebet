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
     const mafiaFree = -1734065719

          for(let i = 0; i < result.chats.length; i++){
              console.log(result.chats[i].id, result.chats[i].title)
          }

     
           
     let last = await client.getMessages(junior, {
          limit : 1,
     });

     setInterval(async () => {
     const lastMessage = await client.getMessages(junior, {
          limit: 1,
      }); 
     lastMessage.forEach(
          (chat, index) => {
              if(chat.message.toString() != last[0].message){
                  console.log(chat.message.toString())
                  client.invoke(new Api.messages.SendMessage({
                      peer: mafiaCard,
                      message: chat.message.toString()
                  }))
               setTimeout(() => {
                  client.invoke(new Api.messages.SendMessage({
                    peer: mafiaFree,
                    message: chat.message.toString()
                     }))
                    }, 8000)
                  last = lastMessage
                 }

               }
          )
     }
     i, 15000)

     
     })();

