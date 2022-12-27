
var pg = require('pg');

let clientw = {
    host: 'localhost',
    port: 5532,
    database: 'roullet',
    user: 'roullet',
    password: 'roullet'
};

let pool = new pg.Pool(clientw);


const token = '5697125034:AAETDW7Nem17erD_c5_xsv6WycyYmqn-urM'
const { Telegraf } = require('telegraf');
const bot = new Telegraf(token)
const redis = require('ioredis');
const client = new redis();


