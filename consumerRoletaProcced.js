
var redis = require('redis');
var redisClient = redis.createClient({
    host: 'localhost',
    port: 6379
});
const { TelegramClient, Api } = require("telegram");
const { StringSession } = require("telegram/sessions");
const input = require("input"); // npm i input


const apiId = 17228434;
const apiHash = "b05e1c84ad4dd7c77e9965204c016a36";
const stringSession = new StringSession("1AQAOMTQ5LjE1NC4xNzUuNTkBu56ALdSaYUL23O5CFsgt2+z5IxJET8cjyhEeB2j+7YBtgUQvbVHh8+BhMN1+IZs/nnFtEwFpxwZnHm7P59qvCh7epulQG51Mbhw3/mO5V2xUL/vhoeYBwc5PZwrDxZ38MiYox8Y3CTK/rpvn4oKK8BbXJoJ4+XWO+5+uQj4TOQmzWM9ahDxAaFjPj9IWFqiN3LvcAJFJ1k3Q8TdSTaJQghTRIP1afQ7TdD8o5DQozl307Lg/s05Q+neNey1QghMvsUXwWfyrvzkQAqx2ma5Nl7ZhVtRhr7GxzSXQmoLtLcZGdlVky/fBtq2XsyKqXvs1GKQWftURsUb6uCdSN/XSx+w=");


function colunasAlternat(json) {
    let obj = {
        Sala: json.name,
        Numeros: json.number,
    }

    obj.colunas = json.number.map(function (item) {
        return item.columa;
    });
    obj.colunas.pop();
    obj.colunas.pop();
    obj.colunas.pop();
    obj.colunas.pop();

    if (obj.colunas == [3, 2, 3, 2, 3, 2]) {
        return obj.padrao = "Padrão Alternando em Colunas, Ausencia de Colunas 1"
    }
    if (obj.colunas == [2, 3, 2, 3, 2, 3]) {
        return obj.padrao = "Padrão Alternando em Colunas, Ausencia de Colunas 1"
    }
    if (obj.colunas == [3, 2, 3, 2, 3, 2]) {
        return obj.padrao = "Padrão Alternando em Colunas, Ausencia de Colunas 1"
    }
    if (obj.colunas == [1, 3, 1, 3, 1, 3]) {
        return obj.padrao = "Padrão Alternando em Colunas, Ausencia de Colunas 2"
    }
    if (obj.colunas == [3, 1, 3, 1, 3, 1]) {
        return obj.padrao = "Padrão Alternando em Colunas, Ausencia de Colunas 2"
    }
    if (obj.colunas == [1, 2, 1, 2, 1, 2]) {
        return obj.padrao = "Padrão Alternando em Colunas, Ausencia de Colunas 3"
    }
    if (obj.colunas == [2, 1, 2, 1, 2, 1]) {
        return obj.padrao = "Padrão Alternando em Colunas, Ausencia de Colunas 3"
    }
    if (obj.colunas == [1, 3, 1, 3, 1, 3]) {
        return obj.padrao = "Padrão Alternando em Colunas, Ausencia de Colunas 2"
    }
    if (obj.colunas == [3, 1, 3, 1, 3, 1]) {
        return obj.padrao = "Padrão Alternando em Colunas, Ausencia de Colunas 2"
    }

    if (typeof obj.padrao != 'undefined') {
        console.log(obj.Sala, obj.padrao)
    }
}

function colunasDuzia(json) {
    let obj = {
        Sala: json.name,
        Numeros: json.number,
    }
    obj.colunas = json.number.map(function (item) {
        return item.columa;
    });
    obj.bloco = json.number.map(function (item) {
        return item.bloco;
    });

    if (obj.blocos == [1, 1, 1, 1, 1, 1]) {
        return obj.padrao = "Padrão Repetiçao em Bloco 1"
    }
    if (obj.blocos == [2, 2, 2, 2, 2, 2]) {
        return obj.padrao = "Padrão Repetiçao em Bloco 2"
    }
    if (obj.blocos == [3, 3, 3, 3, 3, 3]) {
        return obj.padrao = "Padrão Repetiçao em Bloco 3"
    }

    if (obj.colunas == [1, 1, 1, 1, 1, 1, 1, 1, 1]) {
        return obj.padrao = "Padrão Repetiçao em Colunas 1"
    }
    if (obj.colunas == [2, 2, 2, 2, 2, 2, 2, 2, 2]) {
        return obj.padrao = "Padrão Repetiçao, em Colunas 2 "
    }
    if (obj.colunas == [3, 3, 3, 3, 3, 3, 3, 3, 3]) {
        return obj.padrao = "Padrão Repetiçao em Colunas 3 "
    }

    if (typeof obj.padrao != 'undefined') {
        console.log(obj.Sala, obj.padrao)
    }
}

function AusenciaDuzia(json) {

    let obj = {
        Sala: json.name,
        Numeros: json.number,
    }
    obj.colunas = json.number.map(function (item) {
        return item.columa;
    }
    );
    obj.bloco = json.number.map(function (item) {
        return item.bloco;
    }
    );

    // Verify if obj bloco not contains 1
    if (obj.bloco.indexOf(1) == -1) {
        return obj.padrao = "Padrão Ausencia de Bloco 1"
    }
    if (obj.bloco.indexOf(2) == -1) {
        return obj.padrao = "Padrão Ausencia de Bloco 2"
    }
    if (obj.bloco.indexOf(3) == -1) {
        return obj.padrao = "Padrão Ausencia de Bloco 3"
    }
    if (obj.colunas.indexOf(1) == -1) {
        return obj.padrao = "Padrão Ausencia de Colunas 1"
    }
    if (obj.colunas.indexOf(2) == -1) {
        return obj.padrao = "Padrão Ausencia de Colunas 2"
    }
    if (obj.colunas.indexOf(3) == -1) {
        return obj.padrao = "Padrão Ausencia de Colunas 3"
    }

    if (typeof obj.padrao != 'undefined') {
        console.log(obj.Sala, obj.padrao)
    }

}


(async () => {
    const client = new TelegramClient(stringSession, apiId, apiHash, {
            connectionRetries: 5,
          });
                  
          await client.start({
                phoneNumber: async () => await input.text("Please enter your number: "),
                password: async () => await input.text("Please enter your password: "),
                phoneCode: async () =>
                  await input.text("Please enter the code you received: "),
                onError: (err) => console.log(err),
              }); 
         
              const result = await client.invoke( new Api.messages.GetAllChats({
                        exceptIds : [43]
                    }) );      

                
    for(let i = 0; i < result.chats.length; i++){
        console.log(result.chats[i].id, result.chats[i].title)
    
    }

    
    await redisClient.connect()
    setInterval(async () => {
        console.log("Iniciando")
        const keys = await redisClient.keys('*')

        keys.forEach(async (key) => {
            // get value from redis
            const value = await redisClient.get(key)
            let jsonRoullet = JSON.parse(value)
            console.log(jsonRoullet)
            colunasAlternat(jsonRoullet)
            colunasDuzia(jsonRoullet)
            AusenciaDuzia(jsonRoullet)


        })
    }, 7000)



})();''
