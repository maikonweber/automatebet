const redis = require('redis');
const redisClient = redis.createClient({
    host: 'localhost',
    port: 6379
});
const strategyColumnReapeat = { 
    '1,1,1,1,1,1,1,1' : function(){
        return "Coluna 1";
    },
    '2, 2, 2, 2, 2, 2, 2, 2' : function(){
        return "Coluna 2";
    },
    '3, 3, 3, 3, 3, 3, 3, 3' : function(){
        return "Coluna 3";
    }
}

let string = [1, 1, 1, 1, 1, 1, 1, 1]

let array = string.toString();

console.log(array);


console.log(strategyColumnReapeat[`${array}`]);

    



