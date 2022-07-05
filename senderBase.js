
(async () => {

const Redis  = require('ioredis') 
const { getStrategyFilter } = require('./database')

const redis =  new Redis();
while (true) {

const roleta = 
     [
          'Roulette',
          'Football_French_Roulette',
          'Deutsches_Roulette',
          'Speed_Roulette',
          'Prestige_Roulette',
          'Mega_Fire_Blaze_Roulette_Live',
          'Greek_Roulette',
          'Roleta_Brasileira',
          'Auto_Roulette',
          'French_Roulette',
          'Hindi_Roulette',
          'Roulette_Italiana',
          'Bucharest_Roulette',
          'American_Roulette',
     ]

const strategyx = [
     'Repetição 10 vezes da Black',
     'Repetição 10 vezes da Red',
]   

const spectStrategy = [
     'Repetição 9 vezes da Black',
     'Repetição 9 vezes da Red',
]
const users = await getUsersFilter('email')
const result = await getStrategyFilter()

// user.roletas users.strategy


const p = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(console.log('Walting for the next Signal!!!'))
        }, 5000)
    })

    await p
}

})();