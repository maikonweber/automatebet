module.exports = {
  apps : [{
    name: 'cards',
    script: 'scrapperRobotEvolutionRolation.js',
    autorestart: true,
  }, 
  {
    name: 'cards2',
    script: 'scrapperRobotEvolutionRolation.js',
    autorestart: true,
    restartDelay: 1000 * 60 * 4
  }
],
};
