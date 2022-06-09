const redis = require('redis')
const clientRedis = redis.createClient({
     host: '127.0.0.1',
     port: 6379,
     expire: 180
});

const subcribe =  clientRedis.duplicate()

await subcribe.connect();

await subcribe.subscribe('TelegramCallFilter', (message) => {
     console.log('TelegramCallFilter', message) 
});