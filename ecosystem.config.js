module.exports = {
  apps : [{
    name: 'cards',
    script: 'scrapperRobotEvolutionRolation.js',
    wait_ready : true,
    autorestart : true,
    restartDelay: 5
  },
  {
    name: 'cards1',
    script: 'scrapperRobotEvolutionRolationB.js',
    wait_ready: true,
    autorestart: true,
    restartDelay: 60000
  }
],
};
