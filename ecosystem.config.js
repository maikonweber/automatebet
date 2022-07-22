module.exports = {
  apps : [{
    name: 'cards',
    script: 'scrapperRobotCard.js',
    cron_restart: '0,15 * * * *',
    restartDelay: 100
  },
  {
    name: 'RobotBet365.js',
    script: 'RobotBet365.js',
    cron_restart: '* 3 * * *',
    restartDelay: 400
  },
  {
    name: 'ConsumerRoleta',
    script: 'consumerRoletaProcced.js'
  }
],
};
