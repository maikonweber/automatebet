

const { TelegramClient, Api, client } = require("telegram");
const { StringSession } = require("telegram/sessions");

const input = require("input"); // npm i input

const { getStrategyFilter, getLastNumber18, getLastNumber } = require("../database");

const apiId = 17228434;
const apiHash = 'b05e1c84ad4dd7c77e9965204c016a36';
const stringSession = new StringSession('1AQAOMTQ5LjE1NC4xNzUuNTQBu7jfw1tDzOkH7vrrFyEhVQHcFgx/NY/xgc2zt2nrGFEXZCLizMgd/IZfD4xZYPkq071kVGb64BaBRY13fLFfUOZiUo40jfMokpnuM7+y+V8WGcwYi6cLBCXYaVeyMI/pTbkcHyQOZOoAmD6qh7C3ls+OGjTzrIaWQF27VQmNX73lv6Vg4FjALR7Cpa+Xz3e63tViZ84pph2Zw50q6u9TpNsDfdNTocK9cVODEdczeXrekDCB9D8+bZullp5hsn77lgpWjDHe57eZHC/m7OhR0wLvjnhcqRp5JrWQNMJYV2P1xdGimgzAQGRLn5pAPzuxDkKawdi5ZHjYgXsVQ1lPDOE=');

const testStrategy = require('../functions/testStrategy')
const expectNumber = require('../jsonObjects/strategy.js');
const Redis = require("ioredis");
const redis = new Redis();


async function sendMsg(sala, msg, reply) {
     if(!reply) {
     const salaEntity = await client.getEntity(sala)      
     return await client.invoke( new Api.messages.SendMessage({
          peer: salaEntity,
          message: msg.toString()     
          
}))
} else {
console.log('Reply')
console.log(reply.updates[0].SUBCLASS_OF_ID)
const salaEntity = await client.getEntity(sala)
return await client.invoke (new Api.messages.SendMessage({
     peer: salaEntity,
     message: msg.toString(),
     replyToMsgId: reply.updates[0].id
     }))
}
}

async function proccedRoulletAndSend(sygnalBase, string) {
console.log('------------ProcessSend-----------------------')
const replace = stringReplace(string, sygnalBase)
return await saveMemorySend(sygnalBase, replace) 
}
     
async function saveMemorySend(sygnalBase, string) {
console.log('------------SaveMemory-----------------------')

let result = await redis.get(`${sygnalBase.estrategiaDetect}_${sygnalBase.roulleteName}_${id}`)
let process = await redis.get(`process`)
if(!process){
if(!result) {
     const msg1 = await sendMsg(-1267429660, string)
     await redis.set(`${sygnalBase.estrategiaDetect}_${sygnalBase.roulleteName}_${id}`, JSON.stringify({
          msg : msg1
     }) ,'EX', 60 * 7)
     await redis.set(`process`, true, 'EX', 120)  
     await consultMemory(sygnalBase, string)
} else {
     console.log('result process')
}
return 
}
}
     
function replaceForGreen(string, resultadoAtual, sygnalBase, zero) {
     if(!zero) {
          const replace = string.replace(/✅ ENTRADA CONFIRMADA ✅/g, '✅ GREEEEEEEN ✅')
          const replace2 = replace.replace(/{last}/g, `${resultadoAtual.number[0]} || ${resultadoAtual.number[1]} || ${resultadoAtual.number[2]} || ${resultadoAtual.number[3]}`)
          const replace3 = replace2.replace(/{roulleteName}/g, `${sygnalBase.roulleteName}`)
          const replace4 = replace3.replace(/{strategyName}/g, `${sygnalBase.estrategiaDetect}`) 
          return replace4
     } else {
          const replace = string.replace(/✅ ENTRADA CONFIRMADA ✅/g, '✅ GREEEEEEEN NO ZEROOOO ✅')
          const replace2 = replace.replace(/{last}/g, `${resultadoAtual.number[0]} || ${resultadoAtual.number[1]} || ${resultadoAtual.number[2]} || ${resultadoAtual.number[3]}`)
          const replace3 = replace2.replace(/{roulleteName}/g, `${sygnalBase.roulleteName}`)
          const replace4 = replace3.replace(/{strategyName}/g, `${sygnalBase.estrategiaDetect}`) 
          return replace4
     }
}

function replaceForRed(string, resultadoAtual, sygnalBase) {
          const replace = string.replace(/✅ GREEN ✅/g, '🔴  RED 🔴')
          const replace2 = replace.replace(/{last}/g, `${resultadoAtual.number[0]} || ${resultadoAtual.number[1]} || ${resultadoAtual.number[2]} || ${resultadoAtual.number[3]}`)
          const replace3 = replace2.replace(/{roulleteName}/g, `${sygnalBase.roulleteName}`)
          const replace4 = replace3.replace(/{strategyName}/g, `${sygnalBase.estrategiaDetect}`)
          return replace4
}         


async function consultMemory (sygnalBase, string) {
console.log('------------ConsultMemory-----------------------')
const result = await redis.get(`${sygnalBase.estrategiaDetect}_${roulletName}_inprocess`)
if (!result) {
await redis.set(`${sygnalBase.estrategiaDetect}_${roulletName}_inprocess`, true, 'EX', 120)
return setTimeout(async () => {
const { array, expect } = testStrategy(sygnalBase.estrategiaDetect)
console.log(array)
let resultadoAtual = await getLastNumber(sygnalBase.roulleteName)
console.log(resultadoAtual)
if(array.includes(resultadoAtual.number[0])) {
console.log('GREEN')
let entry = await redis.get(`${sygnalBase.estrategiaDetect}_${sygnalBase.roulleteName}_${id}`)
entry =  JSON.parse(entry)
await sendMsg(-1267429660, replaceForGreen(stringreen, resultadoAtual, sygnalBase), entry.msg)


await redis.del('process')
await redis.del(`${sygnalBase.estrategiaDetect}_${roulletName}_inprocess`)
     

} else if ([0].includes(resultadoAtual.number[0])) {
console.log('ZEROOOOO')
let entry = await redis.get(`${sygnalBase.estrategiaDetect}_${sygnalBase.roulleteName}_${id}`)
entry =  JSON.parse(entry)
await sendMsg(-1267429660, replaceForGreen(stringreen, resultadoAtual, sygnalBase, 'zero'), entry.msg)


await redis.del('process')
await redis.del(`${sygnalBase.estrategiaDetect}_${roulletName}_inprocess`)
     

} else {
console.log('RED')  
//await martingale(sendMsg, replaceForGreen, replaceForRed, stringred, sygnalBase)   
await martingale(sendMsg, replaceForGreen, replaceForRed, stringred, stringreen, sygnalBase)    
}
}, 35000)
}
}

/* 
@dev Maikon Weber   
@logic : Promisse to execute martingale send msg and confirm win
@params : fuctions closures
*/

async function martingale(sendMsg, replaceForGreen, replaceForRed, stringred, stringreen, sygnalBase) {
let {
array,
expect } = testStrategy(sygnalBase.estrategiaDetect)

let entry = await redis.get(`${sygnalBase.estrategiaDetect}_${sygnalBase.roulleteName}_${id}`)
console.log(entry)
JSON.parse(entry)

await sendMsg(-1267429660, `
Martingale
🎰 Roleta 🎰 ${sygnalBase.roulleteName},
👉🏻 Entrada 👈🏻: ${expect} 
🎯 Cobrir o zero'
`, entry.msg )

const PromiseCromprove = new Promise(() => {
setTimeout(async () => {
          let resultadoAtual = await getLastNumber(sygnalBase.roulleteName)
          if(array.includes(resultadoAtual.number[0])) {
               console.log('GREEN')
               let entry = await redis.get(`${sygnalBase.estrategiaDetect}_${sygnalBase.roulleteName}_${id}`)
               entry =  JSON.parse(entry)   
               await sendMsg(-1267429660, replaceForGreen(stringreen, resultadoAtual, sygnalBase), entry.msg)                
    
               
               await redis.del('process')
               await redis.del(`${sygnalBase.estrategiaDetect}_${roulletName}_inprocess`)
     
          } 
         else if ([0].includes(resultadoAtual.number[0])) {
             console.log('ZEROOOOO')
             let entry = await redis.get(`${sygnalBase.estrategiaDetect}_${sygnalBase.roulleteName}_${id}`)
             entry =  JSON.parse(entry)
             await sendMsg(-1267429660, replaceForGreen(stringreen, resultadoAtual, sygnalBase), entry.msg)    
             

             await redis.del('process')
             await redis.del(`${sygnalBase.estrategiaDetect}_${roulletName}_inprocess`)
     
          } else {
               console.log('RED')
               let entry = await redis.get(`${sygnalBase.estrategiaDetect}_${sygnalBase.roulleteName}_${id}`)
               entry =  JSON.parse(entry)
               await sendMsg(-1267429660, replaceForRed(stringred, resultadoAtual, sygnalBase, 'zero'), entry.msg)       
         
               
               await redis.del('process')
               await redis.del(`${sygnalBase.estrategiaDetect}_${roulletName}_inprocess`)
     
          }
     }, 33000)
})  
await PromiseCromprove
}
     
function stringReplace(string, sygnalBase) {
          const { estrategiaDetect, roulleteName, payload } = sygnalBase
          console.log(estrategiaDetect,  '--------------------')
          console.log(estrategiaDetect)
          const test = testStrategy(estrategiaDetect)
          const last1 = payload.numberjson[0].toString()
          const last2 = payload.numberjson[1].toString()
          const last3 = payload.numberjson[2].toString()
          const last4 = payload.numberjson[3].toString()
          const last = `${last1} | ${last2} | ${last3} | ${last4}`


          const replace = string.replace(/{roulleteName}/g, roulleteName)
          const replace2 = replace.replace(/{strategyName/g, estrategiaDetect)
          const replace4 = replace2.replace(/{last}/g, last)
          const replace5 = replace4.replace(/{expect}/g, test.expect)
          const data = replace5.replace(/{data}/g, new Date())
          console.log(data)
          return data
}    
     
async function deleteMsg(msg, channel) {
const result = await client.invoke(
     new Api.messages.DeleteMessages({
       channel : -1267429660,
       id: [msg.updates[0].id],
     })
   );
console.log(result)
}

const promisseDelete = (msg, channel) =>  new Promise(() => {
setTimeout(async () => {
     console.log('Timeout')
     deleteMsg(msg, channel)
}, 172800000)
})



async function proccedAlert (sygnalBase, string) {
const { estrategiaDetect, roulleteName, payload } = sygnalBase
console.log(`----------------- Alerta ----------------------`)
const test = testStrategy(sygnalBase.estrategiaDetect)
const replace = string.replace(/{roulleteName}/g, roulleteName)
const replace2 = replace.replace(/{strategyName/g, estrategiaDetect)
const place =  replace2.replace(/[0-9]* vezes/g, '')
const msg2 = await sendMsg(-1267429660, place)
redis.del((`${sygnalBase.estrategiaDetect}_${sygnalBase.roulleteName}_alert_${id}`)).then((deletex) => {
     console.log(deletex)
})

redis.set(`${sygnalBase.estrategiaDetect}_${sygnalBase.roulleteName}_alert_${id}`, JSON.stringify({
     msg : msg2    
}) , 'EX', 60 * 7)
return 
}

function downNumber (detectString) {
if(/[0-9]*/.test(detectString)) {
     const result =  detectString.match(/[0-9][0-9]*/gi)
     const replaceStrategy = detectString.replace(/[0-9][0-9]*/gi, (result[0] - 1).toString())
     return replaceStrategy
}
}

module.exports = {
     downNumber,
     proccedAlert,
     promisseDelete,
     deleteMsg,
     stringReplace,
     martingale,
     consultMemory,
     replaceForRed,
     replaceForGreen,
     saveMemorySend,
     proccedRoulletAndSend,
     sendMsg
}