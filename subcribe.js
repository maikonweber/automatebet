const redis = require('redis');
const Telegram = require('telegram-node-bot');


const chatbot = new Telegram.Telegram(``, {
    polling: true
});



const client = redis.createClient({
    host: 'localhost',
    port: 6379,
    password: "roullet" 
  });

(async () => {
  // Query all the keys
  const keys = await client.keysAsync('*');
  console.log(keys);
  

})();
