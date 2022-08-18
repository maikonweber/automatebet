const { getLastNumberEv, getResultDatabase } = require('./database')
const { TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const testStrategy = require('./functions/testStrategy')
const consulExpectNumber = require('./functions/detectExpectNumber')

const apiId = 17228434;
const apiHash = 'b05e1c84ad4dd7c77e9965204c016a36';
const stringSession = new StringSession('1AQAOMTQ5LjE1NC4xNzUuNTQBu7jfw1tDzOkH7vrrFyEhVQHcFgx/NY/xgc2zt2nrGFEXZCLizMgd/IZfD4xZYPkq071kVGb64BaBRY13fLFfUOZiUo40jfMokpnuM7+y+V8WGcwYi6cLBCXYaVeyMI/pTbkcHyQOZOoAmD6qh7C3ls+OGjTzrIaWQF27VQmNX73lv6Vg4FjALR7Cpa+Xz3e63tViZ84pph2Zw50q6u9TpNsDfdNTocK9cVODEdczeXrekDCB9D8+bZullp5hsn77lgpWjDHe57eZHC/m7OhR0wLvjnhcqRp5JrWQNMJYV2P1xdGimgzAQGRLn5pAPzuxDkKawdi5ZHjYgXsVQ1lPDOE=');
const input = require('input');


class StrategyProccedChannel {
     constructor(users) {
          this.lastStringSession;
          this.users = users.usersProfile.name
          this.channel = users.usersProfile.channel
          this.number = users.usersProfile.number
          this.usersFilter = users.usersFilters
          this.availableRoullete = users.userAvailableRoullete
          this.usersStrigAlert = users.usersStringAlert
          this.usersStringSygnal = users.usersStringComprove
          this.usersStringGreen = users.usersStringWin
          this.usersStringRed = users.usersStringLoss
          this.usersMartingale = users.usersStringMartingale
          this.isBusy = false
          this.sygnalObject;
          this.expectConsult;
          this.expectNumberResult;
          this.waitingResult = false
          this.currentResult;
          this.emitResult;
          this.finished = false
          this.clientTelegram;
     }


     async init() {
          const client = new TelegramClient(stringSession, apiId, apiHash,  {
               connectionRetries: 5,
          })

          await client.start({
               phoneNumber: this.number,
               phoneCode: async () => await input.text('Please enter your Number')
          })   
          
          this.clientTelegram = client

     }

     sleep(ms) {
          return new Promise(resolve => setTimeout(resolve, ms))
     }        

     async proccedThisSygnal(sygnalObject) {
          console.log('Received Process the Sygnal ')
          console.log({sygnalObject})
          if(this.isBusy === false) {
               if (this.availableRoullete.includes(sygnalObject.roulletName)) {
                    if(this.usersFilter.includes(sygnalObject.estrategiaDetect)) {
                         this.isBusy = true
                         return this.waitingComprove(sygnalObject)   
                    }
               }
          }
     }


     async waitingComprove (sygnalObject) {     
          console.log('Waiting Comprove')
          console.log(sygnalObject)
          this.expectConsult(sygnalObject.estrategiaDetect)
          this.expectNumber(sygnalObject.estrategiaDetect)
          this.sygnalObject = sygnalObject
          this.waitingResult = true
      
          // await this.clientTelegram.sendMessage("me", { message : "Work" } )
     }

     expectConsult (sygnalObject) {
          console.log('Comprove and Wainting for the next reapeat')
          console.log(sygnalObject)
          this.expectConsult = consulExpectNumber(sygnalObject) 
          console.log(this.expectConsult)
     }    

     expectNumber (syngal) {
          console.log('Expect Number Update')
          this.expectNumberResult = testStrategy(syngal)
          console.log(testStrategy(syngal))
          console.log(this.expectNumberResult, 'Expect Number Result')     
          return testStrategy(syngal) 
     }    


     async getUpdateCurrentResult (sygnalName) {
          while(this.finished === false) {
          this.currentResult = await getLastNumberEv(sygnalName) 
          await this.sleep(3000)
          }
     }

     comproveWin () {
          if (comproveWin == true) {
               
               
          }
     }     
          
     senderMsg(sygnalObject) {



     }





}

module.exports =  StrategyProccedChannel



