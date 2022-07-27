module.exports = {
  apps : [{
    name: 'cards',
    script: 'scrapperRobotEvolutionRolation.js',
    wait_ready : true
  }, 
  {
    name: 'cards2',
    script: 'scrapperRobotEvolutionRolationB.js',
    autorestart: true,
    restartDelay: 1000 * 60 * 4

  }
],
};