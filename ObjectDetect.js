const { getLastNumber } = require('./database')


class detectEstrategiaRoleta {
     constructor(estrategia, lastNumber, roullete, expectNumber) {
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

     async promisseToMartingale () {
          const p = new Promise((resolve, reject) => {
               setTimeout(() => {
                    if (this.expectNumber.included[this.lastNumber1]) {

                    } else if(this.expectNumber[0]) {

                    } else {

                    }
               }, 36000);
          })
     }

     async sendInitMsg () {
          const msg = ''
     }

      

     async getResultOfBase() {
         while (this.finished) {
         const lastResult = await getLastNumber(this.roullete)
         console.log('last number', lastResult[0])
         console.log(this.lastNumber[0])
         this.lastResult = lastResult
         this.sleep(36000)
          }
     }

     sleep(ms) {
          return new Promise(resolve => setTimeout(resolve, ms))
          }        

     loggerTest() {
          console.log(this.lastNumber, '------------->')   
     }


     
}

module.exports =  detectEstrategiaRoleta



