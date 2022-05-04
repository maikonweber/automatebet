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
],
};
