
(async () => {

const { getStrategyFilter } = require('./database')

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

const result = await getStrategyFilter(roleta[6])
console.log(result)




    const p = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(console.log('Walting for the next Signal!!!'))
        }, 30000)
    })

    await p
}

})();