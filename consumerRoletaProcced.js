
var redis = require('redis');
const { on } = require('telegram/client/updates');
var redisClient = redis.createClient({
    host: 'localhost',
    port: 6379
});

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



})();
