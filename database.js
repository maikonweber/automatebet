// initialize database pg
var pg = require('pg');
let client = {
    host: 'roullet',
    port: 5532,
    database: 'roullet',
    user: 'roullet',
    password: 'roullet'
};


let pool = new pg.Pool(client);

async function insertTelegramSygnal(Sala, Message, Aposta) {
    let sql = `INSERT INTO roullete (sala, message, aposta, resultado) VALUES ($1, $2, $3) Returning id`;    
    let params = [Sala, Message, Aposta];
    let result = await pool.query(sql, params);
    return result;
}

async function getIdAndInserResult (id, Resultado) {
    let sql = `UPDATE roullete SET resultado = $1 WHERE id = $2`;    
    let params = [Resultado, id];
    let result = await pool.query(sql, params);
    return result;
}

async function insertTelegram(sala, mensagem , aposta, resultado) {
    let sql = `INSERT INTO roullete(room, message, aposta, result) VALUES ($1, $2, $3, $4) Returning id`;    
    let params = [sala, mensagem, aposta, resultado];
    let result = await pool.query(sql, params);
    return result;
}

async function insertNewSygnal(sala , aposta, resultado, fistGale, secondGale) {
    let sql = `INSERT INTO roullete_new(room, aposta, result, fistGale, secondGale) VALUES ($1, $2, $3, $4, $5) Returning id`;    
    let params = [sala, aposta, resultado, fistGale, secondGale];
    let result = await pool.query(sql, params);
    return result;
}


module.exports = {
    insertTelegram,
    insertTelegramSygnal,
    getIdAndInserResult,
    insertNewSygnal
}




