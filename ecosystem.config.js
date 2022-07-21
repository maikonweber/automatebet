module.exports = {
  apps : [{
    name: 'cards',
    script: 'scrapperRobotCard.js',
    cron_restart: '0,35 * * * *'
  },
  {
    name: 'RobotBet365.js',
    script: 'RobotBet365.js',
    cron_restart: '* 6 * * *'
  },
  {
    name: 'ConsumerRoleta',
    script: 'consumerRoletaProcced.js'
  }
],
};
