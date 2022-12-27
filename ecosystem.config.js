module.exports = {
  apps : [{
    name: 'autoroullet-server',
    script: './server.js',
  },
  {
    name: 'scrapperClass',
    script: './index.js',
    cron_restart: "*/5 * * * *",
  }, 
  {
    name : 'detectStrategyClass',
    script : './index_.js'
  },
  {
    name : 'consumerTest',
    script : './testConsumer.js'
  }
  ]
};
