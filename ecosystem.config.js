module.exports = {
  apps : [{
    name: 'cards',
    script: 'scrapperRobotEvolutionRolation.js',
    cron_restart: '0,20 * * * *',
    autorestart: true
  }
],
};
