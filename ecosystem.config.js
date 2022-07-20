module.exports = {
  apps : [
  {
    name: 'cards',
    script: 'scrapperRobotCard.js',
    restartDelay: 1000 * 60 * 60 * 2  
  },
  {
    name: 'RobotBet365.JS',
    script: 'RobotBet365.js',
    restartDelay: 1000 * 60 *  60 * 8
  }
],
};
