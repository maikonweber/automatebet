var cron = require('node-cron');
const  FootBoolScrap = require('./RobotFutbool.js');

cron.schedule('3 * * * * *', async () => {
    console.log('start');
    const footBoolScrap = new FootBoolScrap();
    console.log('start');
    await footBoolScrap.start();
    
});
    