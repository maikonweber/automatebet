const { getLastNumberEv } = require('./database')


class detectEstrategiaRoleta {
     constructor(estrategia, lastNumber, roullete, expectNumber) {
          this.estrategia = estrategia
          this.lastNumber = lastNumber
          this.martigale = null;
          this.martigale2 = null;
          this.expectNumber = expectNumber
          this.roullete = roullete 
          this.lastNumber1 = null;
          this.finished = true
          this.lastResult = null;
     }

     async init() {
          this.loggerTest()
          this.getResultOfBase()
          this.checkNumber()
          
     }
   
     async getResultOfBase() {
         while (this.finished) {
         const lastResult = await getLastNumberEv(this.roullete)
         console.log(lastResult.number[0])
         this.lastResult = lastResult.number
         console.log(this.lastResult)
         console.log('Thick')
         await this.sleep(5000)
         }
     }

     sleep(ms) {
          return new Promise(resolve => setTimeout(resolve, ms))
     }        

     async checkNumber() {
          await this.sleep(900)
          console.log(this.lastNumber[0])
          this.lastNumber1 = this.lastNumber[0]
          while (this.finished) {
          console.log(this.lastResult, this.lastNumber)
       
          if(this.lastResult != this.lastNumber) {
               console.log('---------> expect ', this.expectNumber)
               if(this.expectNumber.includes(this.lastResult)[0]) {
               return this.loggerTest('Estrátegia Confirmada')
               
               } else {
               return this.loggerTest('Martingale')     
               }
          }
       
          console.log('The Number is equal', this.lastResult, this.lastNumber)
          await this.sleep(2000)
          this.checkNumber
       
          }
     }
     
          
     loggerTest(string) {     
          console.log(this.lastNumber, '------------->', string)   
     }
}

module.exports =  detectEstrategiaRoleta



