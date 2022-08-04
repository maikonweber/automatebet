const axios = require('axios')
const arrayName = require('./jsonObjects/RoleteNames')

console.log(arrayName.length)
setInterval(() => {
function generateRandom(maxLimit = 100){
    let rand = Math.random() * maxLimit; 
  
    rand = Math.floor(rand); // 99
  
    return Math.round(rand);
  }


const obj = {

}

obj.name = arrayName[generateRandom(18)]
obj.number = [generateRandom(39), generateRandom(39), generateRandom(39), generateRandom(39), generateRandom(39), generateRandom(39), generateRandom(39), generateRandom(39), generateRandom(39), generateRandom(39)]
obj.date = new Date().getTime()



// obj.number.pop()
// obj.number.reverse()
// obj.number.push(generateRandom(39))
// obj.number.reverse()
// console.log(obj.number)
// obj.date = new Date().getTime()

axios.post('http://localhost:3055/api/evolution', obj).then((result) => {
    console.log(result.data)
  }).catch((erro) => {
    console.log(erro)
  })



}, 5000)
