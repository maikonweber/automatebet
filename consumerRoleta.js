var amqp = require('amqplib/callback_api');



let queue = 'bet365Roullet'
amqp.connect('amqp://roullet:roullet@localhost:5672', function(err, conn) {
    if(err) {
    throw err;
   }

conn.createChannel( async (err, ch) => {
if (err) {
throw err;
}

ch.assertQueue(queue, { durable: false });


ch.consume(queue, async (msg) => {
// buffer to msg
    const lol = JSON.parse(msg.content)
   
    console.log(lol)
    
    for(let i = 0; i < lol.length; i++){
        console.log(lol[i].number)
        
    const columa1 = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34]
    const coluna2 = [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35]
    const coluna3 = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36]

    const bloco1 = [1, 2, 3, 4,5, 6, 7, 8, 9, 10, 11, 12]
    const bloco2 = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
    const bloco3 = [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36]

    const impar = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35]
    const par = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36]

    const zero = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    const red = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36]
    const green = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35]

    const Even = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36]
    const Odd = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35]

    const OneTo18 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]

    const x19To36 = [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36]

    // Verify if number is one of information and create a new object com  classfication
        



}

        }
    }

    
  

}, { noAck : true })





})


})
