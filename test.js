const { getResultDatabase } = require('./database')
const ObjectsToCsv = require('objects-to-csv')


const arrayName = [
     'Turkish_Roulette',
     'UK_Roulette',
     'Roulette',
     'Football_French_Roulette',
     'Spread_Bet_Roulette',
     'Greek_Quantum_Roulette',
     'Deutsches_Roulette',
     'Speed_Roulette',
     'Prestige_Roulette',
     'Mega_Fire_Blaze_Roulette_Live',
     'Football_Roulette',
     'Quantum_Roulette_Live',
     'Greek_Roulette',
     'Roleta_Brasileira',
     'Auto_Roulette',
     'French_Roulette',
     'Hindi_Roulette',
     'Roulette_Italiana',
     'Bucharest_Roulette',
     'American_Roulette',
    ]


arrayName.forEach( async (el) => {
     let result  = await getResultDatabase(el)
     console.log('Get All Result' +  el)
     const csv = new ObjectsToCsv(list)
     await csv.toDisk(`./${el}.csv`)
     
})