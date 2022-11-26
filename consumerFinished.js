 
 const amqp = require('amqplib');

 const {
     blocosRepeat,
     ColunasRepeat,
     redReapeat,
     alternateColumns,
     on18or36,
     parOuImpar,
} = require('./jsonObjects/jsonStrategy')

 function restOfNumber (value, spectNumber, number, string) {
     const array1 = new Array(...value)

     for(number; number > 0; number--) {
          array1.pop()
     }
     
     if(!array1.includes(spectNumber)) {
          return `Ausencia da ${string} - ${array1.length} vezes `;
     } 
     return `Não identificado`;
}


function getStrategy(strategy, value, number){
     // Received the number of element need remove to value array
     // Return the array with the element removed

     const array2 = new Array(...value)  // Copy the array     
     // remove the element from the array
     for(number; number > 0; number--) {
          array2.pop()     
     }
     const StringValue = array2.toString()

     if(strategy[`${StringValue}`]) {
         return strategy[`${StringValue}`]();
     } 
     return `Não identificado` ;
}

function blocoFlutuantes(strategy, value, number){
     // Received the number of element need remove to value array
     // Return the array with the element removed

     const array2 = new Array(...value)  // Copy the array     
     // remove the element from the array
     // Invert Array 
     // If array have 

     
     for(number; number > 0; number--) {
          array2.pop()     
     }
     const StringValue = array2.toString()

     if(strategy[`${StringValue}`]) {
         return strategy[`${StringValue}`]();
     } 
     return `Não identificado` ;
     }

 
 class consumerRoleta {
    constructor(pool, client, queue) {
    this.redis = client
    this.client = pool
    this.interval;
    this.conn;
    this.uri = 'amqp://' + 'guest' + ':' + 'guest' + '@' + 'localhost' + ':' + '5672';
    this.channel;
    this.q = queue;
    }


async setupConnection() {
          this.conn = await amqp.connect(this.uri);
          this.channel = await this.conn.createChannel();
          await this.channel.assertQueue(this.q, { durable: false });
      }   
  
     send(msg) {

          this.channel.sendToQueue(this.q, Buffer.from(msg));
          console.log(' [x] Sent %s', msg);
      }
  
     recv() {
          return this.channel
      
    }

    async createPattern(newArray,  objetoRolleta) {       
     
     const coluna1 = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34]
     const coluna2 = [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35]
     const coluna3 = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36]
     const par = [2, 4, 6, 8,  10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36]
     const impar = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35]
     const bloco1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
     const bloco2 = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
     const bloco3 = [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36]
     const red = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36]
     const green = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35]
     const OneTo18 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
     const x19To36 = [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36]

        
     let colunas = []
     let blocos = []
     let reds = []
     let greens = []
     let OneTo18s = []
     let imparx = []
     let parx = []


     for(let i = 0; i < newArray.length; i++) {
        if (coluna1.includes(newArray[i])) {
             colunas.push(1)
        } else if (coluna2.includes(newArray[i])) {
             colunas.push(2)
        } else if (coluna3.includes(newArray[i])) {
             colunas.push(3)
        } else {
             colunas.push(0)
        }
   }
   for(let i = 0; i < newArray.length; i++) {
        if (bloco1.includes(newArray[i])) {
             blocos.push(1)
        } else if (bloco2.includes(newArray[i])) {
             blocos.push(2)
        } else if (bloco3.includes(newArray[i])) {
             blocos.push(3)
        } else {
             blocos.push(0)
        }
   }

   for(let i = 0; i < newArray.length; i++) {
        if (red.includes(newArray[i])) {
             reds.push(1)
        } else if (green.includes(newArray[i])) {
             reds.push(2)
        } else {  
             reds.push(3)
        }
   }
   for(let i = 0; i < newArray.length; i++) {
        if (green.includes(newArray[i])) {
             greens.push(1)
        } else if (red.includes(newArray[i])) {
             greens.push(2)
        }
        else {
             greens.push(3)
        }
   }
   for(let i = 0; i < newArray.length; i++) {
        if (OneTo18.includes(newArray[i])) {
             OneTo18s.push(1)
        } else if (x19To36.includes(newArray[i])) {
             OneTo18s.push(2)
        } else {
             OneTo18s.push(0)
        }
   }

  
   for(let i = 0; i < newArray.length; i++) {
   
        if (par.includes(newArray[i])) {
             parx.push(1)
        } else if (impar.includes(newArray[i])) {
             parx.push(2)
        }
        else {
             parx.push(0)
        }
   
   }

   let strategyProccess  = { 
        colunas : colunas,
        blocos : blocos,
        reds : reds,
        greens : greens,
        OneTo18s : OneTo18s,
        parOrImpar : parx,
        imparOrPar : imparx
     } 


    return this.regExStrategy(strategyProccess,  objetoRolleta)        
}

 async regExStrategy(strategy, objetoRolleta) {
     
          const stringColunas = strategy.colunas
          const stringBlocos = strategy.blocos
          const stringRed = strategy.reds
//          const stringGreen = strategy.greens
          const stringOneTo18 = strategy.OneTo18s
          const stringParOuImpar = strategy.parOrImpar
     

          let strategyProced = {}

     
          let times = 10
          let array = []
     
          //parOuImpar,
          let arrayColunas1Ausencia = []
          for(let i = 0; i < times; i++){    
               let value = restOfNumber(strategy.colunas, 1, i, 'Primeira Coluna')
               arrayColunas1Ausencia.push({
                    coluna : value
               })
          }
     
          let arrayColunas2Ausencia = []
          for(let i = 0; i < times; i++){    
               let value = restOfNumber(strategy.colunas, 2, i,  'Segunda Coluna')
               arrayColunas2Ausencia.push({
                    coluna : value
               })
          }
     
          let arrayColunas3Ausencia = []
          for(let i = 0; i < times; i++){    
               let value = restOfNumber(strategy.colunas, 3, i,  'Terceira Coluna')
               arrayColunas3Ausencia.push({
                    coluna : value
               })
          }
     
          let arrayBloco1Ausencia = []
          for(let i = 0; i < times; i++){    
               let value = restOfNumber(strategy.blocos, 1, i, 'Primeiro Bloco')
               arrayBloco1Ausencia.push({
                    coluna : value
               })
          }
     
          let arrayBloco2Ausencia = []
          for(let i = 0; i < times; i++){    
               let value = restOfNumber(strategy.blocos, 2, i, 'Segundo Bloco')
               arrayBloco2Ausencia.push({
                    coluna : value
               })
          }
     
          let arrayBloco3Ausencia = []
          for(let i = 0; i < times; i++){    
               let value = restOfNumber(strategy.blocos, 3, i, 'Terceiro Bloco')
               arrayBloco3Ausencia.push({
                    coluna : value
               })
          }
     
          
          for(let i = 0; i < times; i++) {
               let value = getStrategy(ColunasRepeat, stringColunas, i)
          
               array.push({
                    coluna : value,
                    index : i
               })
          }    
     
          let array3 = []
          for(let i = 0; i < times; i++) {
               let value = getStrategy(parOuImpar, stringParOuImpar, i)
            
               array3.push({
                    parOrImpar : value,
                    index : i
               })
          }
     
          const array7 = []
          for(let i = 0; i < times; i++) {
               let value = getStrategy(alternateColumns, stringColunas, i)
               array7.push({
                    alternateColumns : value,
               })
          }
     
          let array4 = []
          for(let i = 0; i < times; i++) {
               let values = getStrategy(on18or36, stringOneTo18, i)
            
               array4.push({
                    minorMajor : values,
                    index : i
               })
     
          }
     
          let array5 =  []
          for(let i = 0; i < times; i++) {
               let values = getStrategy(redReapeat, stringRed, i)
               array5.push({
                    color : values,
                    index : i
               })
     
          }
     
          let array6 = []
          for(let i = 0; i < times; i++) {
               let values = getStrategy(blocosRepeat, stringBlocos, i)
               array6.push({
                    blocosRepeat : values,
                    index : i
               }    
               )
          }
     
          strategyProced.blocosRepeat = array6
          strategyProced.minorMajor = array4
          strategyProced.parOrImpar = array3
          strategyProced.colorRepeat = array5
          strategyProced.colunasRepeat = array
          strategyProced.alternateColumns = array7
          strategyProced.arrayColunas1Ausencia = arrayColunas1Ausencia
          strategyProced.arrayColunas2Ausencia = arrayColunas2Ausencia
          strategyProced.arrayColunas3Ausencia = arrayColunas3Ausencia
          strategyProced.arrayBloco1Ausencia = arrayBloco1Ausencia
          strategyProced.arrayBloco1Ausencia = arrayBloco1Ausencia
          strategyProced.arrayBloco1Ausencia = arrayBloco1Ausencia
          // Convert array to string
          const ray = Object.keys(strategyProced)
       
          strategyProced[ray[0]].forEach(async el => {
                this.regExe(Object.values(el)[0], objetoRolleta);
          })


          return strategyProced;
     }

    async regExe(string, objetoRolleta, strategyArg) {
          
          // RegEx Nao Intendificado
          // if true return false
          const regEx = /Não identificado/g;
          if (regEx.test(string)) {
               return false
          } else {
             const estrategiaDetect =  {
                   estrategiaDetect : string, 
                   roulleteName : strategyArg, 
                   payload : objetoRolleta,
                   created : new Date().getTime()
               }
               
               const created = estrategiaDetect.created;
               // Make division mock 1 minutes
               const mock = created / 1000 / 60;
               const mockDivision = Math.floor(mock);
            
               console.log(estrategiaDetect, 'detect')
               let result = await this.redis.get(`${estrategiaDetect.estrategiaDetect}_${estrategiaDetect.roulleteName}_sygnal`)
               if(!result) {   
               await this.redis.set(`${estrategiaDetect.estrategiaDetect}_${estrategiaDetect.roulleteName}_sygnal`, `alert - ${estrategiaDetect.estrategiaDetect}, ${estrategiaDetect.roulleteName})`, 'EX', 60 * 1)          
               //await this.send(estrategiaDetect)
               }   
          }
     }

    async intervalInit(interval) {
        this.interval = interval
        this.setupConnection().then(el => {
        setInterval ( async () => {
            console.log('Thick This Interval for Queue Sygnal')
            console.log('---------------------------------------')
            const LastNames = await this.client.query(`SELECT name 
            FROM robotevolution Where created > now() - interval '1 day' Group by name;`)
        
            
            LastNames.rows.forEach(async element => {
                console.log('Get Last Result from', element.name )   
                const last30 = await this.client.query(`
                Select name, number from robotevolution
                WHERE created > NOW() - INTERVAL '1 day'
                AND name = $1 limit 1;
                `, [element.name])


                const objectAnalyser = {
                    roulletName : last30.rows[0].name,
                    numberjson : last30.rows[0].number
                    }
                  
               return this.createPattern(objectAnalyser.numberjson, objectAnalyser)       

               })

               
        }, interval)
     })
     }

}


module.exports = consumerRoleta;