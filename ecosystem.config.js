module.exports = {
  apps : [{
    name: 'RobotObserverRoullet',
    script: 'server.js',
    instance: '2',
    exec_mode: "cluster"
  },
  {
    name : 'strategyConsumer',
    script: 'consumer18strategy.js'
  },
  {
    name : "telegramOldConsumer",
    script: "consumerRoletaX.js"
  },
],
};
