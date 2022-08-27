module.exports = {
  apps : [{
    name: 'autoroullet-server',
    script: './server.js',
  },
  {
    name: 'scrapperClass',
    script: './index.js',
    restart: 1000 * 60 * 10
  }]
};
