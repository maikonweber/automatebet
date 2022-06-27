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
    name : 'RobotBet',
    script: 'consumer18strategy.js'
  },
  {
    name : "ConsumerEX",
    script: "consumerRoletaX.js"
  },
  {
    name : 'RobotConsumerProcced',
    script : 'consumerRoletaProcced.js',
  }
],
};
