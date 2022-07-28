const expectNumber = require('../jsonObjects/strategy.js');

function testStrategy(estrategiaDetect) {
    if(estrategiaDetect.match(/Primeira Coluna/g) && estrategiaDetect.match(/Repetição/g)) {
         console.log('Repetição')
         return { 
              "expect" : "Quebra na Colunas 3 ou 2",
              "array" : expectNumber['Coluna 1 Repeat']()
              }
    } else if (estrategiaDetect.match(/Par/g)) {
         console.log('Par')
         return {
              "expect" : "Jogar nos Numeros Impares",
              "array" : expectNumber['Par Reapeat']()
              }
    } else if (estrategiaDetect.match(/Impar/g)) {
         console.log('Impar')
         return {
              "expect" : "Jogar nos Numeros pares",
              "array":expectNumber['Impar Reapeat']()
         }
    } else if (estrategiaDetect.match(/Menores/g)) {
         console.log('Repetição - 1 ao 18')
         return {
              "expect" : "Jogar nos numeros Maiores",
              "array" : expectNumber['1 ao 18 Reapeat']()}
    } else if (estrategiaDetect.match(/Maiores/g)) {
         console.log('Repetição - 19 ao 36')
         return {
              "expect" : "Jogar nos numeros Menores",
              "array" : expectNumber['19 ao 36 Reapeat']()}
    } else if (estrategiaDetect.match(/Segunda Coluna/g) && estrategiaDetect.match(/Repetição/g)) {
         console.log('Repetição - Coluna 2')
         return {
              "expect" : "Quebra no Coluna 1 ou Coluna 3",
             "array" : expectNumber['Coluna 2 Reapeat']()
         }
    } else if (estrategiaDetect.match(/Terceira Coluna/g) && estrategiaDetect.match(/Repetição/g)) {
         console.log('Repetição - Coluna 3')
         return { 
              "expect" : "Quebra na Colunas 2 ou Colunas 1",
              "array" :expectNumber['Coluna 3 Reapeat']()
    }
    } else if (estrategiaDetect.match(/Primeiro Bloco/g) && estrategiaDetect.match(/Repetição/g)) {
         console.log('Repetição - Bloco 1')
         return { 
              "expect" : "Quebra no Bloco 3 ou Bloco 2",
               "array"  :  expectNumber['Bloco 1 Reapeat']() 
         }
    } else if (estrategiaDetect.match(/Segundo Bloco/g) && estrategiaDetect.match(/Repetição/g)) {
         console.log('Repetição - Bloco 2')
         return { 
              "expect" : "Quebra no Bloco 1 ou Bloco 3",
              "array" : expectNumber['Bloco 2 Reapeat']()
         }
    
    } else if (estrategiaDetect.match(/Terceiro Bloco/g) && estrategiaDetect.match(/Repetição/g)) {
         console.log('Repetição - Bloco 3')
         return {    "expect" : "Quebra no Bloco 1 ou Bloco2",
                   "array" : expectNumber['Bloco 3 Reapeat']()
                   }
         } else if (estrategiaDetect.match(/Red/g)) {
         console.log('Red')
         return {
              "expect" : "Jogar nos Numeros Pretos",
               "array"  :  expectNumber['White']()
         }
    } else if (estrategiaDetect.match(/Black/g)) {
         return {
                "expect" : "Jogar nos Vermelhos", 
                "array" : expectNumber['Red']()
         }
    } else if (estrategiaDetect.match(/Alternando Segunda e Primeira Colunas/g)) {
         
         return {
              "expect" : "Quebra na Colunas 3 e 1",
              "array" : expectNumber['Alternancia da Coluna 2 e 1']()
         }
    } else if (estrategiaDetect.match(/Alternando Terceira e Segunda Colunas/g)) {
         console.log('Não encontrado')
         return {
              "expect" : "Quebra na Colunas 1 ou 2 ",
              "array" : expectNumber['Alternancia da Coluna 3 e 2']()
         }
    } else if (estrategiaDetect.match(/Alternando Primeira e Terceira Colunas/g)) {
         console.log('Não encontrado')
         return {
              "expect" : "Quebra na Colunas 2 ou 3",
              "array" : expectNumber['Alternancia da Coluna 1 e 3']()

         }
    } else if (estrategiaDetect.match(/Alternando Primeira e Segunda Colunas/g)) {
         console.log('Não encontrado')
         return {
              "expect" : "Quebra na Colunas 2 e 3 ",
              "array" : expectNumber['Alternancia da Coluna 1 e 2']()
         }
    } else if (estrategiaDetect.match(/Alternando Primeira e Segunda Colunas/g)) {
         console.log('Não encontrado')
         return {
              "expect" : "Quebra na Colunas 3 e 2" ,
              "array" : expectNumber['Alternancia da Coluna 1 e 2']()
         }
    }    else if (estrategiaDetect.match(/Alternando Segunda e Terceira Colunas/g)) {
         console.log('Não encontrado')
         return {
              "expect" : "Quebra na Colunas 1 e 3",
              "array" : expectNumber['Alternancia da Coluna 2 e 3']()
         }
         // Ausencia 
    } else if (estrategiaDetect.match(/Ausencia da Primeira Coluna/g)) {
         console.log('Bloco 1')
         return {
              "expect" : "Quebra na Colunas 1",
              "array" : expectNumber['Ausencia da Colunas 1']()
         }
    }
    else if (estrategiaDetect.match(/Ausencia da Segunda Coluna/g)) {
         console.log('Bloco 1')
         return {
              "expect" : "Quebra na Colunas 2",
              "array" : expectNumber['Ausencia da Colunas 2']()
         }
    }
    else if (estrategiaDetect.match(/Ausencia da Terceira Coluna/g)) {
         console.log('Bloco 1')
         return {
              "expect" : "Quebra na Colunas 3",
              "array" : expectNumber['Ausencia da Colunas 3']()
         }
    }
    else if (estrategiaDetect.match(/Ausencia da Primeiro Bloco/g)) {
         console.log('Bloco 1')
         return {
              "expect" : "Quebra na Bloco 1",
              "array" : expectNumber['Ausencia da Bloco 1']()
         }
    }
    else if (estrategiaDetect.match(/Ausencia da Segundo Bloco/g)) {
         console.log('Bloco 1')
         return {
              "expect" : "Quebra na Bloco 2",
              "array" : expectNumber['Ausencia da Bloco 2']()
         }
    }
    else if (estrategiaDetect.match(/Ausencia da Terceiro Bloco/g)) {
         console.log('Bloco 1')
         return {
              "expect" : "Quebra na Bloco 3",
              "array" : expectNumber['Ausencia da Bloco 3']()
         }
    }
}     


function testMartigale(estrategiaDetect) {
if (estrategiaDetect.match(/Alternando Segunda e Primeira Colunas/g)) {    
     return {
          "expect" : "Quebra na Colunas 3",
          "array" : expectNumber['Alternancia da Coluna 2 e 1_martigale']()
     }
} else if (estrategiaDetect.match(/Alternando Terceira e Segunda Colunas/g)) {
     console.log('Não encontrado')
     return {
          "expect" : "Quebra na Colunas 1 ",
          "array" : expectNumber['Alternancia da Coluna 3 e 2_martigale']()
     }
} else if (estrategiaDetect.match(/Alternando Primeira e Terceira Colunas/g)) {
     console.log('Não encontrado')
     return {
          "expect" : "Quebra na Colunas 2",
          "array" : expectNumber['Alternancia da Coluna 1 e 3_martigale']()

     }
} else if (estrategiaDetect.match(/Alternando Primeira e Segunda Colunas/g)) {
     console.log('Não encontrado')
     return {
          "expect" : "Quebra na Colunas 3 ",
          "array" : expectNumber['Alternancia da Coluna 1 e 2_martigale']()
     }
} else if (estrategiaDetect.match(/Alternando Primeira e Segunda Colunas/g)) {
     console.log('Não encontrado')
     return {
          "expect" : "Quebra na Colunas 3" ,
          "array" : expectNumber['Alternancia da Coluna 1 e 2_martigale']()
     }
} else if (estrategiaDetect.match(/Alternando Segunda e Terceira Colunas/g)) {
     console.log('Não encontrado')
     return {
          "expect" : "Quebra na Colunas 1",
          "array" : expectNumber['Alternancia da Coluna 2 e 3_martigale']()
     }
} else {
     return {
          "expect" : "error", 
          "array" : "error"
     }
}
}


module.exports = testStrategy