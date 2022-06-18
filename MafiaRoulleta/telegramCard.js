const { TelegramClient, Api } = require('telegram');
const { StringSession } = require('telegram/sessions');
const input = require('input'); // npm i input
const redis = require('redis');
const clientRedis = redis.createClient({
  host: '127.0.0.1',
  port: 6379,
});

clientRedis.connect();

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
      const salaJunior = await client.getEntity(sala);
      const result = await client.invoke( new Api.messages.SendMessage({
          peer: sala,
          message: msg.toString(),      
     }));
     console.log(result);
}


     let last = await client.getMessages(junior, {
            limit: 1,
     })

     const lastMessage = last[0].message.toString()
    

  

     while (true) {

          let lastMessage = await client.getMessages(junior, {
               limit: 1,
          });

          function replace(msg) {
            // Search for string replace the string 'Então Júnior Cards' and Replace to Mafia da Cartas"
            let newMsg = msg.replace(/Então Júnior Cards/g, 'Máfia da Cartas');
            return newMsg; 
          }

          function replaceRed(msg) {
            // Search for string replace the string 'Então Júnior Cards' and Replace to Mafia da Cartas"
            let newMsg = msg.replace(/Redzin/g, '- RED -');
            return newMsg;
          }

        function seeIfHaveObjectInsideMsg(msg) {
      
              if(msg[0].replyTo) {
                
                return msg[0].replyTo;
                  
              }
                return false;
          }


    if(lastMessage[0].date != last[0].date){
          console.log('New message')
          console.log('-------------------------------------------------------')
          console.log('=======================================================')
          console.log(await seeIfHaveObjectInsideMsg(lastMessage))
          const lastmsg = lastMessage[0].message
          const regEx = /Entrada Confirmada/g
          const regEx2 = /GREEN/g

          if(lastmsg.match(regEx)){
            console.log('Entrada Confirmada')
            const lastMessageid = lastMessage[0].id
            console.log(lastMessageid)
            // Set this in redis variable with lastmsg string
            clientRedis.set(`${lastMessageid}`, lastmsg)
            console.log('-------------------------------------------------------')
            console.log('=======================================================')
            sendMsg(mafiaCard, replace(lastmsg))
            sendMsg(mafiaCardFree,  replace(lastmsg))

          } else if (lastmsg.match(regEx2)){
            console.log('GREEN')
            const see = await seeIfHaveObjectInsideMsg(lastMessage)
            if(see){ 
              const seeId = see.replyToMsgId
              const string = await clientRedis.get(`${seeId}`)
              
              // Concat the string with the new string
              const newString2 = string + '\n' + lastmsg
              sendMsg(mafiaCard, replace(newString2))
              sendMsg(mafiaCardFree, replace(newString2))
            }
            console.log('-------------------------------------------------------')
            console.log('=======================================================')
            console.log('-------------------------------------------------------')
            console.log('=======================================================')
         
          } else if (lastmsg.match(/Atenção/g)){
            console.log('Atenção')
            console.log('-------------------------------------------------------')
            console.log('=======================================================')
            sendMsg(mafiaCard, replace(lastmsg))

          } else if (lastmsg.match(/Redzin/g)){
            console.log('Redzin')
            console.log('-------------------------------------------------------')
            const see = await seeIfHaveObjectInsideMsg(lastMessage)
            if(see){ 
              const seeId = see.replyToMsgId
              const string = await clientRedis.get(`${seeId}`)
              console.log(string)
              replaceRed(lastmsg)
              // Concat the string with the new string
              const newString2 = string + '\n' + lastmsg
              sendMsg(mafiaCard, replace(newString2))
              sendMsg(mafiaCardFree, replace(newString2))
            }

            console.log('=======================================================')
            
          } else if (lastmsg.match(/Vamos para primeiro martingale/g)){ 
            console.log('Vamos para primeiro martingale')
            console.log('-------------------------------------------------------')
            const see = await seeIfHaveObjectInsideMsg(lastMessage)
            if(see){ 
              const seeId = see.replyToMsgId
              const string = await clientRedis.get(`${seeId}`)
              console.log(string)
              // Concat the string with the new string
              const newString2 = string + '\n' + lastmsg
              console.log(newString2)
              sendMsg(mafiaCard, replace(newString2))
              sendMsg(mafiaCardFree, replace(newString2))
            }
            console.log('=======================================================')
          } else if (lastmsg.match(/Vamos para o segundo martingale/g)) {

            console.log('Vamos para o segundo martingale')
            console.log('-------------------------------------------------------')
            const see = await seeIfHaveObjectInsideMsg(lastMessage)
            if(see){ 
              const seeId = see.replyToMsgId
              const string = await clientRedis.get(`${seeId}`)
              console.log(string)
              // Concat the string with the new string
              const newString2 = string + lastmsg
              sendMsg(mafiaCard, replace(newString2))
              sendMsg(mafiaCardFree, replace(newString2))
            }
            
            console.log('=======================================================')
          }
          console.log('=======================================================')
          console.log('-------------------------------------------------------')
          

      last = lastMessage
     }


     const p = new Promise((resolve, reject) => {
          setTimeout(() => {
              resolve();
          }, 5000);
      }
     );

     await p;

     }

     })();