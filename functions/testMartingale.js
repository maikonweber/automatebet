const expectNumber = require('../jsonObjects/strategy.js');


function testMartigale(estrategiaDetect) {
     if (estrategiaDetect.match(/Alternando Segunda e Primeira Colunas/g)) {    
          return {
               "expect" : "Quebra na Colunas 2 e 1",
               "array" : expectNumber['Alternancia da Coluna 2 e 1_martigale']()
          }
     } else if (estrategiaDetect.match(/Alternando Terceira e Segunda Colunas/g)) {
          console.log('Não encontrado')
          return {
               "expect" : "Quebra na Colunas 3 ou 2 ",
               "array" : expectNumber['Alternancia da Coluna 3 e 2_martigale']()
          }
     } else if (estrategiaDetect.match(/Alternando Primeira e Terceira Colunas/g)) {
          console.log('Não encontrado')
          return {
               "expect" : "Quebra na Colunas 1 ou 2",
               "array" : expectNumber['Alternancia da Coluna 1 e 3_martigale']()
     
          }
     } else if (estrategiaDetect.match(/Alternando Primeira e Segunda Colunas/g)) {
          console.log('Não encontrado')
          return {
               "expect" : "Quebra na Colunas 1 e 2 ",
               "array" : expectNumber['Alternancia da Coluna 1 e 2_martigale']()
          }
     } else if (estrategiaDetect.match(/Alternando Primeira e Segunda Colunas/g)) {
          console.log('Não encontrado')
          return {
               "expect" : "Quebra na Colunas 1 e 2" ,
               "array" : expectNumber['Alternancia da Coluna 1 e 2_martigale']()
          }
     }    else if (estrategiaDetect.match(/Alternando Segunda e Terceira Colunas/g)) {
          console.log('Não encontrado')
          return {
               "expect" : "Quebra na Colunas 2 e 3",
               "array" : expectNumber['Alternancia da Coluna 2 e 3_martigale']()
          }
     }
     }


module.exports = testMartigale