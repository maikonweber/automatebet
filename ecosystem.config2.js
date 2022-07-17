module.exports = {
  apps : [{
    name: 'cards',
    script: 'scrapperRobotCard.js',
    restartDelay: 1000 * 60 * 30  
  },
  {
    name: 'consumerCard.js',
    script: 'consumerCard.js',
  },{
    name: 'connsumerCards.js',
    script: 'consumerCards.js'
  }
],
};
