const consumerRoleta = require('./consumerFinished');
const Redis = require('ioredis');
const redis = new Redis()
var pg = require('pg');


let client = {
    host: 'localhost',
    port: 5532,
    database: 'roullet',
    user: 'roullet',
    password: 'roullet'
};


let pool = new pg.Pool(client);

const consumer = new  consumerRoleta(pool, redis,'telegram');

consumer.intervalInit();
