module.exports = {
  apps : [{
    name: 'cards',
    script: 'scrapperRobotCard.js',
    restartDelay: 1000 * 60 * 30  
  },
  {
    name: 'RobotBet365.js',
    script: 'RobotBet365.js',
    restartDelay: 1000 * 60 * 60 * 3
  }
],
};
