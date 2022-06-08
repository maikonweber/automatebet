const { TelegramClient, Api } = require('telegram');
const { StringSession } = require('telegram/sessions');
const input = require('input'); // npm i input
const { getStrategyByRoullet } = require('./database')
// Redis
const redis = require('redis');
const clientRedis = redis.createClient({
     host: '127.0.0.1',
     port: 6379,
     expire: 180
});
console.log(clientRedis);
clientRedis.connect();
// get all key in redis



var amqp = require('amqplib/callback_api');

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
 'Quantum_Auto_Roulette',
 'Hindi_Roulette',
 'Roulette_Italiana',
 'Bucharest_Roulette',
 'American_Roulette',
]

const jsonRoullete = {
     'Turkish_Roulette' : function () {
          return ``
     },
     'UK_Roulette' : function () {

          return ``
     },
     'Roulette' : function () {
          return
     },
     'Football_French_Roulette': () => {
          return 
     },
     'Spread_Bet_Roulette': () => {
          return
     },
     'Greek_Quantum_Roulette': () => {
          return
     }, 
     'Deutsches_Roulette': () => {
          return
     }, 
     'Speed_Roulette': () => {
          return
     },
     'Prestige_Roulette': () => {
          return
     },
     'Mega_Fire_Blaze_Roulette_Live': () => {
          return
     },
     'Football_Roulette': () => {
          return
     },
     'Quantum_Roulette_Live': () => {
          return
     },
     'Greek_Roulette': () => {
          return
     },
     'Roleta_Brasileira': () => {
          return
     }, 
     'Auto_Roulette': () => {
          return
     },
     'French_Roulette': () => {
          return
     },
     'Quantum_Auto_Roulette': () => {
          return
     },
     'Hindi_Roulette': () => {
          return
     },
     'Roulette_Italiana': () => {
          return
     },
     'Bucharest_Roulette': () => {
          return
     },
     'American_Roulette': () => {
          return
     }
}


const apiId = 17228434;
const apiHash = 'b05e1c84ad4dd7c77e9965204c016a36';
const stringSession = new StringSession('1AQAOMTQ5LjE1NC4xNzUuNTMBu0hSLIOFbU8aIIxTP3DyN8TpvvFzvhWTNyZpI9ab3wx4v99YYIosj0cYMeDFccmzjoAPIVlVgs/cpb+7J7hoablPmB6hQNqCJJfJgy1RgFy711OSiphW1BqXPaa8wwk2Bib+vWTcyPN88TL87cE2lbRHe/Nm8URGzoybg3HqXC6WFPtaRqpy0QJVgIS3vzxg3VskhnThUsRhVpB7cfi1+08TCCWXN0CzHk9m7Nq37BImjQv0+/xThM+8apPNMRH0Q6gtN7IEehczT0MSeDTG2S3vrmuZiRnR/NvpjP3+fjjRHsP8VzERZXu4nhW+GQL6NuY0KcdtEzHuIyUQPbD+fUM=');



(async () => {
var queue = 'RoulletBet365';
console.log(' [*] Waiting for messages in %s. To exit press CTRL+C', queue);
console.log('Loading interactive example...');
  
const client = new TelegramClient(stringSession, apiId, apiHash, {
    connectionRetries: 5,
  })

const expectNumber = {
     'Color RED REPEAT' : function () {
          const red = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36]
          return red
     },
     'Alternancia da Coluna 1 e 2' : function () {
          const col1 = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34]
          const col2 = [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35]
          const col3 = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36]
          return col3.concat(col2)
     },
     'Alternancia da Coluna 3 e 1' : function () {
          const col3 = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36]
          const col1 = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34]
          const col2 = [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35]
          return col2.concat(col1)
     },
     'Alternancia da Coluna 1 e 3' : function () {
          const col1 = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34]
          const col3 = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36]
          const col2 = [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35]
          return col2.concat(col3)
     },
     'Alternancia da Coluna 3 e 1' : function () {
          const col3 = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36]
          const col1 = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34]
          const col2 = [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35]
          return col2.concat(col1)
     },
     'Alternancia da Coluna 2 e 1' : function () {
          const col2 = [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35]
          const col1 = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34]
          const col3 = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36]
          return col3.concat(col1)
     },
     'Alternancia da Coluna 3 e 2' : function () {
          const col3 = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36]
          const col2 = [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35]
          const col1 = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34]
          return col1.concat(col2)
     },
     'Impar Reapeat' : function () {
          const impar = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35]
          return impar
     },
     'Par Reapeat' : function () {
          const par = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36]
          return par
     },
     'Duzia Reapeat' : function () {
          const duzia = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
          const duzia2  = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
          const duzia3 = [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36]
          return duzia
     },
     'One to 18' : function () {
          const oneTo18 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
          return oneTo18
     },
     '19 to 36' : function () {
          const oneTo18 = [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36]
          return oneTo18
     },
     'Red 4 Time' : function () {
          const red = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36]
          return red
     },
     'White 4 Time' : function () {
          const white = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35]
          return white
     },
     'Duzia de 1' : function () {
          const duzia = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
          const duzia2  = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
          const duzia3 = [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36]
          return duzia2.concat(duzia3)
     },
     'Duzia de 2' : function () {
          const duzia = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
          const duzia2  = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
          const duzia3 = [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36]
          return duzia.concat(duzia3)
     },
     'Duzia de 3' : function () {
          const duzia = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
          const duzia2  = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
          const duzia3 = [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36]
          return duzia
     },
     'Coluna 1' : function () {
          const col3 = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36]
          const col1 = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34]
          const col2 = [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35]
          return col2.concat(col3)
     },
     'Coluna 2' : function () {
          const col3 = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36]
          const col1 = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34]
          const col2 = [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35]
         return col3.concat(col1)
     },
     'Coluna 3' : function () {
          const col3 = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36]
          const col1 = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34]
          const col2 = [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35]
          return col2.concat(col1)
     },
     'Alternancia da Coluna 2 e 3' : function () {
          const col2 = [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35]
          const col3 = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36]
          const col1 = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34]
          return col1.concat(col3)
     }
}



const obj = {
     'MesaVip' : function (estrategia) {
          return `✅ ENTRADA CONFIRMADA ✅
          🎰 Roleta 🎰: ${estrategia.name}
          🚀 Estratégia 🚀: ${estrategia.typestregia}
          👉🏻 Entrada 👈🏻: ${estrategia} 
          ${estrategia.fistNumber} | ${estrategia.secondNumber} | ${estrategia.threeNumber} 
          🎯 Cobrir o zero'`
     }
}

async function strategyMemory(number, expectNumber, estrategiaDetect, rouletteName, objetoRolleta) {
     // Is Strategia for detectado criar um chave no redis com o número do jso
     // 
     const date = new Date().getTime()

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
     
     const verifyEstrategia = await clientRedis.get(`${rouletteName}_${estrategiaDetect}`)
     strategyConsult(rouletteName, estrategiaDetect, number, expectNumber, objetoRolleta)
     
     if (verifyEstrategia) {
          return 'Estratégia já foi usada'

     } else {
          const setMemory = await clientRedis.set(`${rouletteName}_${estrategiaDetect}`, JSON.stringify({objetoRolleta, number, expectNumber, estrategiaDetect}), {
          EX: 360
          })
          console.log('Setando a memória: ', setMemory)
          // await sendMsg('-1266295662', objSend[`${estrategiaDetect}`](number, expectNumber, rouletteName, objetoRolleta, estrategiaDetect))
          // await sendMsg('-1614635356', objSend[`${estrategiaDetect}`](number, expectNumber, rouletteName, objetoRolleta, estrategiaDetect))
          // await sendMsg('-1267429660', objSend[`${estrategiaDetect}`](number, expectNumber, rouletteName, objetoRolleta, estrategiaDetect))
          await sendMsg('-1266295662', objSend[`${estrategiaDetect}`](number, expectNumber, rouletteName, objetoRolleta, estrategiaDetect))
          
     }
    

}



function regExe(string, objetoRolleta, strategyArg) {
     // RegEx Nao Intendificado
     // if true return false
   
     const regEx = /Não identificado/g;
     if (regEx.test(string)) {
          return false
     } else {
          strategyMemory(objetoRolleta.numberjson, expectNumber[`${string}`](), string, objetoRolleta.roulletename, objetoRolleta) 
     return true
     }
}


function strategyProced (objetoRolleta) {
     console.log('Consultando Strategia Proced')
     const strategRed = objetoRolleta.jsonbstrategy.strategyRed
     const strategGree = objetoRolleta.jsonbstrategy.strategyGreen
     const s18to39 = objetoRolleta.jsonbstrategy.strategy19to39
     const oneTo18 = objetoRolleta.jsonbstrategy.strategyOneTo18
     const parRepeat = objetoRolleta.jsonbstrategy.strategyParReapeat
     const duziaReapt = objetoRolleta.jsonbstrategy.strategyDuziaRepeat
     const imparReapt = objetoRolleta.jsonbstrategy.strategyImparReapeat
     const columnsReapt = objetoRolleta.jsonbstrategy.strategyColumnReapeat
     const alternateColumns = objetoRolleta.jsonbstrategy.strategyAlternateColum
     const red4time = objetoRolleta.jsonbstrategy.strategyRed4Time
     

          regExe(strategRed, objetoRolleta, 'red')
          regExe(s18to39, objetoRolleta, 's18to39')
          regExe(oneTo18, objetoRolleta, 'oneTo18')
          regExe(parRepeat, objetoRolleta, 'parRepeat')
          regExe(duziaReapt,  objetoRolleta, 'duziaReapt')
          regExe(imparReapt, objetoRolleta, 'imparReapt')
          regExe(columnsReapt, objetoRolleta, 'columnsReapt')
          regExe(alternateColumns, objetoRolleta, 'alternateColumns')
          
}

     


async function strategyConsult(rouletteName, estrategiaDetect, number) {
     setTimeout( async () => {
     console.log('Consultando Strategia')
     const result = await getStrategyByRoullet(rouletteName)
     const client = await clientRedis.get(`${rouletteName}_${estrategiaDetect}`)

     const parseClient = JSON.parse(client)
     const lastResult = result[0].numberjson
     const expectNumberArray = parseClient.expectNumber
     console.log(expectNumberArray, 'number')

     if (parseClient.expectNumber.includes(lastResult[0])) {
          clientRedis.del(`${rouletteName}_${estrategiaDetect}`)
          await sendMsg('-1266295662', `${rouletteName}, ✅ GREEEN BATEU A META VAZA!, ${lastResult[0]} || ${lastResult[1]} || ${lastResult[2]}`)
          
     } else {
          clientRedis.del(`${rouletteName}_${estrategiaDetect}`)
          await sendMsg('-1266295662', `${rouletteName}, 🔴 REED, RESPIRA E VOLTA MAIS TARDE, ${lastResult[0]} || ${lastResult[1]} || ${lastResult[2]}`)
          
     }    
     }, 40000)  
}



await client.start({
    phoneNumber: async () => await input.text('Please enter your number: '),
    password: async () => await input.text('Please enter your password: '),
    phoneCode: async () =>
      await input.text('Please enter the code you received: '),
    onError: (err) => console.log(err),
  });
console.log('You should now be connected.');
console.log(client.session.save()); // Save this string to avoid logging in again
  await client.connect();
    console.log('You should now be logged in.');


const result = await client.invoke( new Api.messages.GetAllChats({
        exceptIds : [43]
    }) );

 async function sendMsg(sala, msg) {
     const salaEntity = await client.getEntity(sala)

     console.log(salaEntity)

     await client.invoke( new Api.messages.SendMessage({
          peer: salaEntity,
          message: msg.toString()
     }) );
     }

    for(let i = 0; i < result.chats.length; i++){
        console.log(result.chats[i].id, result.chats[i].title)
    }

// -1150553286 } MÁFIA DA ROLETA - [VIP] 🎰💰
// Integer { value: 1266295662n } VR BOT
// Integer { value: 1267429660n } MÁFIA DA ROLETA - [FREE] 🎰💰
// Integer { value: 1581808712n } NOVA MINING INVESTMENT
// Integer { value: 1614635356n } Mesa VIP | Bot Cassino 🎰
// Integer { value: 1629499483n } RoosterBattle - Brazilian Community


setInterval(() => {
     arrayName.forEach(async (Element) => {
          const result = await getStrategyByRoullet(Element)
          
          
          // Match RegEx Nao Indenticado for Result strateg
          result.forEach(async (estrategia) => {
               let obj = {
               'roulletename' : estrategia.name,
               'jsonbstrategy'  :   estrategia.jsonbpreload,
               'numberjson'   :  estrategia.numberjson,
               'objsResult' : estrategia    
          }

               strategyProced(obj)
          })
     })

}, 35000)



})()
