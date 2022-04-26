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
        
      let regEx = /Possível Entrada/g;
      let regEx2 = /Abortar/g;
      let regEx3 = /Entrada/g;
      let regEx4 = /Green/g;
      let regEx5= /Red/g;
      let regEx6 = /Vamos para o 1° Gale/g;
      
      if (regEx.test(message)) {
        console.log(message, "regEx");
      }
      if (regEx2.test(message)) {
        console.log(message, "regEx2");
      }
      if (regEx3.test(message)) {
        console.log(message, "regEx3");
      }
      if (regEx4.test(message)) {
        console.log(message, "regEx4");
      }
      if (regEx5.test(message)) {
        console.log(message, "regEx5");
      }
      if (regEx6.test(message)) {
        console.log(message, "regEx6");
      }

    });

})();