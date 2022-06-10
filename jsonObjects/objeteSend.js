const objSend = {
    'Color RED REPEAT' : function (number, expectNumber, rouletteName, objetoRolleta, estrategiaDetect) {
         return `✅ ENTRADA CONFIRMADA ✅
         🎰 Roleta 🎰: ${rouletteName}
         🚀 Estratégia 🚀:  Repiticao de Vermelhos
         LastNumber : ${number[0]} | ${number[1]} | ${number[2]} | ${number[3]}
         👉🏻 Entrada 👈🏻: ${expectNumber}
         🎯 Cobrir o zero'`
    },
    'Alternancia da Coluna 1 e 2' : function (number, expectNumber, rouletteName, objetoRolleta, estrategiaDetect) {
         return `✅ ENTRADA CONFIRMADA ✅
         🎰 Roleta 🎰: ${rouletteName}
         🚀 Estratégia 🚀: Alternancia da Coluna 1 e 2
         LastNumber : ${number[0]} | ${number[1]} | ${number[2]} | ${number[3]}
         👉🏻 Entrada 👈🏻: Colunas 3 -  ${expectNumber}
         🎯 Cobrir o zero'`
    },
    'Alternancia da Coluna 3 e 1' : function (number, expectNumber, rouletteName, objetoRolleta, estrategiaDetect) {
         return `✅ ENTRADA CONFIRMADA ✅
         🎰 Roleta 🎰: ${rouletteName}
         🚀 Estratégia 🚀: ${estrategiaDetect}
         LastNumber : ${number[0]} | ${number[1]} | ${number[2]} | ${number[3]}
         👉🏻 Entrada 👈🏻: Colunas 2 -  ${expectNumber}
         🎯 Cobrir o zero'`

    },
    'Alternancia da Coluna 1 e 3' : function (number, expectNumber, rouletteName, objetoRolleta, estrategiaDetect) {
         return `✅ ENTRADA CONFIRMADA ✅
         🎰 Roleta 🎰: ${rouletteName}
         🚀 Estratégia 🚀: ${estrategiaDetect}
         LastNumber : ${number[0]} | ${number[1]} | ${number[2]} | ${number[3]}
         👉🏻 Entrada 👈🏻: Colunas 2 ${expectNumber}
         🎯 Cobrir o zero'`

    },
    'Alternancia da Coluna 3 e 1' : function (number, expectNumber, rouletteName, objetoRolleta, estrategiaDetect) {
         return `✅ ENTRADA CONFIRMADA ✅
         🎰 Roleta 🎰: ${rouletteName}
         🚀 Estratégia 🚀: ${estrategiaDetect}
         LastNumber : ${number[0]} | ${number[1]} | ${number[2]} | ${number[3]}
         👉🏻 Entrada 👈🏻: Colunas 2 ${expectNumber}
         🎯 Cobrir o zero'`

    },
    'Alternancia da Coluna 2 e 1' : function (number, expectNumber, rouletteName, objetoRolleta, estrategiaDetect) {
         return `✅ ENTRADA CONFIRMADA ✅
         🎰 Roleta 🎰: ${rouletteName}
         🚀 Estratégia 🚀: ${estrategiaDetect}
         👉🏻 Entrada 👈🏻: Colunas 3
         🎯 Cobrir o zero'`
    },
    'Alternancia da Coluna 3 e 2' : function (number, expectNumber, rouletteName, objetoRolleta, estrategiaDetect) {
         return `✅ ENTRADA CONFIRMADA ✅
         🎰 Roleta 🎰: ${rouletteName}
         🚀 Estratégia 🚀: ${estrategiaDetect}
         LastNumber : ${number[0]} | ${number[1]} | ${number[2]} | ${number[3]}
         👉🏻 Entrada 👈🏻: Coluna 1 ${expectNumber}
         🎯 Cobrir o zero'`
    },
    'Impar Reapeat' : function (number, expectNumber, rouletteName, objetoRolleta, estrategiaDetect) {
         return `✅ ENTRADA CONFIRMADA ✅
         🎰 Roleta 🎰: ${rouletteName}
         🚀 Estratégia 🚀: Repiticao de Numeros Impar
         LastNumber : ${number[0]} | ${number[1]} | ${number[2]} | ${number[3]}
         👉🏻 Entrada 👈🏻: Qualquer numero par ${expectNumber}
         🎯 Cobrir o zero'`

    },
    'Par Reapeat' : function (number, expectNumber, rouletteName, objetoRolleta, estrategiaDetect) {
         return `✅ ENTRADA CONFIRMADA ✅
         🎰 Roleta 🎰: ${rouletteName}
         🚀 Estratégia 🚀: Repeti'cao do numeros Par
         LastNumber : ${number[0]} | ${number[1]} | ${number[2]} | ${number[3]}
         👉🏻 Entrada 👈🏻: Qualquer numero impar ${expectNumber}
         🎯 Cobrir o zero'`
    },
    'Duzia Reapeat' : function (number, expectNumber, rouletteName, objetoRolleta, estrategiaDetect) {
         return `✅ ENTRADA CONFIRMADA ✅
         🎰 Roleta 🎰: ${rouletteName}
         🚀 Estratégia 🚀: ${estrategiaDetect}
         LastNumber : ${number[0]} | ${number[1]} | ${number[2]} | ${number[3]}
         👉🏻 Entrada 👈🏻: ${expectNumber} - 
         🎯 Cobrir o zero'`

    },
    'Color Green REPEAT' : function (number, expectNumber, rouletteName, objetoRolleta, estrategiaDetect) {
         return `✅ ENTRADA CONFIRMADA ✅
         🎰 Roleta 🎰: ${rouletteName}
         🚀 Estratégia 🚀: ${estrategiaDetect}
         LastNumber : ${number[0]} | ${number[1]} | ${number[2]} | ${number[3]}
         👉🏻 Entrada 👈🏻: Entrar da Vermelha
         🎯 Cobrir o zero'`

    },
    'One to 18' : function (number, expectNumber, rouletteName, objetoRolleta, estrategiaDetect) {
         return `✅ ENTRADA CONFIRMADA ✅
         🎰 Roleta 🎰: ${rouletteName}
         🚀 Estratégia 🚀: Repeticao dos numero menores
         LastNumber : ${number[0]} | ${number[1]} | ${number[2]} | ${number[3]}
         👉🏻 Entrada 👈🏻: Qualquer numero maior ${expectNumber}
         🎯 Cobrir o zero'`

    },
    'One to 36' : function (number, expectNumber, rouletteName, objetoRolleta, estrategiaDetect) {
         return `✅ ENTRADA CONFIRMADA ✅
         🎰 Roleta 🎰: ${rouletteName}
         🚀 Estratégia 🚀: ${estrategiaDetect}
         LastNumber : ${number[0]} | ${number[1]} | ${number[2]} | ${number[3]}
         👉🏻 Entrada 👈🏻: Entrada nos Numeros Menores ${expectNumber}
         🎯 Cobrir o zero'`

     },
    'Duzia de 1' : function (number, expectNumber, rouletteName, objetoRolleta, estrategiaDetect) {
         return `✅ ENTRADA CONFIRMADA ✅
         🎰 Roleta 🎰: ${rouletteName}
         🚀 Estratégia 🚀: Repiticao da 1 Duzia
         LastNumber : ${number[0]} | ${number[1]} | ${number[2]} | ${number[3]}
         👉🏻 Entrada 👈🏻: Entrada na 2 Duzia ou 3 duzia ${expectNumber}
         🎯 Cobrir o zero'`

             },
    'Duzia de 2' : function (number, expectNumber, rouletteName, objetoRolleta, estrategiaDetect) {
         return `✅ ENTRADA CONFIRMADA ✅
         🎰 Roleta 🎰: ${rouletteName}
         🚀 Estratégia 🚀: Repiticao da 2 Duzia.
         LastNumber : ${number[0]} | ${number[1]} | ${number[2]} | ${number[3]}
         👉🏻 Entrada 👈🏻: Duzia 1 ou Duzia 3 ${expectNumber}
         🎯 Cobrir o zero'`

    },
    'Duzia de 3' : function (number, expectNumber, rouletteName, objetoRolleta, estrategiaDetect) {
         return `✅ ENTRADA CONFIRMADA ✅
         🎰 Roleta 🎰: ${rouletteName}
         🚀 Estratégia 🚀: Repiticao de Duzia 3 ${expectNumber}
         LastNumber : ${number[0]} | ${number[1]} | ${number[2]} | ${number[3]}
         👉🏻 Entrada 👈🏻: Duzia 2 ou 1
         🎯 Cobrir o zero'`

    },
    'Coluna 1' : function (number, expectNumber, rouletteName, objetoRolleta, estrategiaDetect) {
    
         return `✅ ENTRADA CONFIRMADA ✅
         🎰 Roleta 🎰: ${rouletteName}
         🚀 Estratégia 🚀: Repiticao da Coluna 1
         LastNumber : ${number[0]} | ${number[1]} | ${number[2]} | ${number[3]}
         👉🏻 Entrada 👈🏻: Entrada na 2 colunas ou 3 Colunas ${expectNumber}
         🎯 Cobrir o zero'`

     },
    'Coluna 2' : function (number, expectNumber, rouletteName, objetoRolleta, estrategiaDetect) {
    
         return `✅ ENTRADA CONFIRMADA ✅
         🎰 Roleta 🎰: ${rouletteName}
         🚀 Estratégia 🚀: Repiti'cao da 2 Colunas 
         LastNumber : ${number[0]} | ${number[1]} | ${number[2]} | ${number[3]}
         👉🏻 Entrada 👈🏻: : Colunas 1 ou Colunas 3 ${expectNumber}
         🎯 Cobrir o zero'`

    },
    'Coluna 3' : function (number, expectNumber, rouletteName, objetoRolleta, estrategiaDetect) {
         return `✅ ENTRADA CONFIRMADA ✅
         🎰 Roleta 🎰: ${rouletteName}
         🚀 Estratégia 🚀: Repeticao da 3 Colunas
         👉🏻 Entrada 👈🏻: Colunas 2 ou Colunas 1 ${expectNumber}
         LastNumber : ${number[0]} | ${number[1]} | ${number[2]} | ${number[3]}
         🎯 Cobrir o zero'`
         
    },
    'Alternancia da Coluna 2 e 3' : function (number, expectNumber, rouletteName, objetoRolleta, estrategiaDetect) {
         return `✅ ENTRADA CONFIRMADA ✅
         🎰 Roleta 🎰: ${rouletteName}
         🚀 Estratégia 🚀: ${estrategiaDetect}
         LastNumber : ${number[0]} | ${number[1]} | ${number[2]} | ${number[3]}
         👉🏻 Entrada 👈🏻: Colunas 1  ${expectNumber}
         🎯 Cobrir o zero'`
    }
}

module.exports = objSend