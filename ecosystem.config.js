module.exports = {
  apps : [{
    name: 'RobotObserverRoullet',
    script: 'server.js',
  },
  {
    name: 'RobotObserverRoulletScrapper',
    script: 'RobotBet365.js',
  },
  {
    name : 'RobotFutebolCron',
    script : 'listener.js',
  },
  {
    name : 'RobotConsumerProcced',
    script : 'consumerRoletaProcced.js',
  }
],
};
