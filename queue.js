require('dotenv').config();
const botQueue  = require('./lib/queue');
const job = require('./jobs/job');

botQueue.process(job.handle);