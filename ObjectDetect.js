const { getLastNumber } = require('./database')




class detectEstrategiaRoleta {
     constructor(estrategia, lastNumber, roullete, array, expectNumber) {

          this.estrategia = estrategia
          this.lastNumber = lastNumber
          this.martigale = null;
          this.martigale2 = null;
          this.expectNumber = expectNumber
          this.roullete = roullete 
          this.lastNumber1 = lastNumber[0]
          this.finished = true
     }

     async init() {
          this.loggerTest()
          this.getResultOfBase()
     }

     async getResultOfBase() {
         while (this.finished) {
         const lastResult = await getLastNumber(this.roullete)
         console.log('last number', lastResult[0])
         console.log(this.lastNumber[0])
         this.sleep(1000)
          }
     }

     sleep(ms) {
          return new Promise(resolve => setTimeout(resolve, ms))
          }        

     loggerTest() {
          console.log(this.lastNumber)   
     }
     
}

module.exports =  detectEstrategiaRoleta



