module.exports = {
  apps : [{
    name: 'Telegram-Routelet',
    script: 'node telegram.js',
  }, {
    name: 'RobotObserverRoullet',
    script: 'node server.js',
  },
  {
    name: 'Robot',
    script: 'node consumer.js',
  },
  {
    name: 'RobotBet365',
    script: 'node Robots/RobotBet365.js',
  },
  {
    name: 'Consumer Roullet',
    script: 'node consumerRoleta.js',
  },
],
};
