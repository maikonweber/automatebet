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
   
    
    for(let i = 0; i < lol.length; i++) {
        for(let j = 0; j < lol[i].number.length; j++) {      

    const columa1 = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34]
    const coluna2 = [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35]
    const coluna3 = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36]

        
        if(columa1.includes(lol[i].number[j])){
            lol[i].number[j] = {
                number: lol[i].number[j],
                columa: 1
            }
        } else if (coluna2.includes(lol[i].number[j])){
            lol[i].number[j] = {
                number: lol[i].number[j],
                columa: 2
            } 
        } else if (coluna3.includes(lol[i].number[j])){
            lol[i].number[j] = {
                number: lol[i].number[j],
                columa: 3
            }
         
        } else {
            lol[i].number[j] = {
                number: lol[i].number[j],
                columa: 0
            } 
        }
    }
}

    for(let i = 0; i < lol.length; i++) {
        for(let j = 0; j < lol[i].number.length; j++) {      

    const bloco1 = [1, 2, 3, 4,5, 6, 7, 8, 9, 10, 11, 12]
    const bloco2 = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
    const bloco3 = [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36]

        
        if(bloco1.includes(lol[i].number[j].number)){
            lol[i].number[j].bloco = 1
        } else if (bloco2.includes(lol[i].number[j].number)){
            lol[i].number[j].bloco = 2
        } else if (bloco3.includes(lol[i].number[j].number)){
            lol[i].number[j].bloco = 3
        } else {
            lol[i].number[j].bloco = 0
        }
    }
}

    for(let i = 0; i < lol.length; i++) {
        for(let j = 0; j < lol[i].number.length; j++) {
            if(lol[i].number[j].number % 2 == 0){
                lol[i].number[j].par = true
            } else {
                lol[i].number[j].par = false
            }
        }
    }

    for(let i = 0; i < lol.length; i++) {
        for(let j = 0; j < lol[i].number.length; j++) {
            if(lol[i].number[j].number % 2 != 0){
                lol[i].number[j].impar = true
            } else {
                lol[i].number[j].impar = false
            }
        }
    }

    for(let i = 0; i < lol.length; i++) {
        for(let j = 0; j < lol[i].number.length; j++) {
            const red = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36]
            const green = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35]
            if(red.includes(lol[i].number[j].number)){
                lol[i].number[j].red = true
            }
            if(green.includes(lol[i].number[j].number)){
                lol[i].number[j].green = true               
            }
        }
    }

    for(let i = 0; i < lol.length; i++) {
        for(let j = 0; j < lol[i].number.length; j++) {
            const OneTo18 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
            const x19To36 = [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36]
            if(OneTo18.includes(lol[i].number[j].number)){
                lol[i].number[j].OneTo18 = true
            }
            if(x19To36.includes(lol[i].number[j].number)){
                lol[i].number[j].x19To36 = true               
            }
        }
    }

        console.log(lol[0])
    
        ch.sendToQueue('bet365RoulletProcced', Buffer.from(JSON.stringify(lol)), { persistent: false });


}, { noAck : true })





})


})
