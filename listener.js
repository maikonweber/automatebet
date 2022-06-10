var cron = require('node-cron');
const  FootBoolScrap = require('./Robots/RobotFutbool.js');
const deleteSygnal = require('./database');
const deleteRolete = require('./database');

//cron.schedule('3 * * * * *', async () => {
    //console.log('start');
    //const footBoolScrap = new FootBoolScrap();
   // console.log('start');
  //  await footBoolScrap.start();
//});

// Cron every day
cron.schedule('0 0 * * *', async () => {
    console.log('start');
    // Falta escrever a query
    deleteRolete(   );
    deleteSygnal(   );
    console.log('start');
    await footBoolScrap.start();
});

    