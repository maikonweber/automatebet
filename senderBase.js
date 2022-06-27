
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

if(spectStrategy.includes(strig.estrategiaDetect) && roleta.includes(strig.roulleteName)) {
     console.log('-------------------ALERT-------------------')
     return await proccedAlert(strig, possivelAlert)
}


if(strategyx.includes(strig.estrategiaDetect) && roleta.includes(strig.roulleteName)) {
     console.log(`------------------------------------------------------------`)
    
     return await proccedRoulletAndSend(strig, string)
     }
    
}


    const p = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(console.log('Walting for the next Signal!!!'))
        }, 15000)
    })

    await p
}

})();