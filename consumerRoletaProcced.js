
var redis = require('redis');
var redisClient = redis.createClient({
    host: 'localhost',
    port: 6379
});


(async () => {

    await redisClient.connect()

    // Get all key in redis 
    const keys = await redisClient.keys('*')

    keys.forEach(async (key) => {
        // get value from redis
        const value = await redisClient.get(key)
        let jsonRoullet = JSON.parse(value))
        // console.log(jsonRoullet)
    })




})();
