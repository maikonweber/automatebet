require('dotenv').config();
const Queue =  require('bull');
const { config } = require('../config/config');
const job  = require('../jobs/job.js');

const botQueue = new Queue(job.key , config);

module.exports = botQueue;

  