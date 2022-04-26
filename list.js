const redis = require('redis');

(async () => {

  const client = redis.createClient({
    host: 'localhost',
    port: 6379,
    password: "roullet" 
  });

  const subscriber = client.duplicate();

  await subscriber.connect();

    await subscriber.subscribe('roulleteEventsTelegram', (message) => {
    console.log(message); // 'message'
    });

})();