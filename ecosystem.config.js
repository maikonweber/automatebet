module.exports = {
  apps : [{
    name: 'cards',
    script: 'index.js',
    wait_ready : true,
    autorestart : true,
    restartDelay: 5
  },
  {
    name: 'roleta',
    script: './consumer/consumer18strategy.js',
    wait_ready : true,
    autorestart : true,
    restartDelay: 5
  }]
};
