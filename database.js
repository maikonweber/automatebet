const hasher = require('./hasher')
const crypto = require('crypto')

var pg = require('pg');
let client = {
    host: 'localhost',
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

async function getUserToken(token) {
    const query = `SELECT * FROM users_token WHERE token = $1`
    try {
        const result = await pool.query(query, [token]);
        return result.rows[0];
    } catch (error) {
        throw error;
        return false;
}   
}


async function getIdANDInserResult (id, Resultado) {
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

async function insertNewSygnal(sala , aposta, resultado, fistGale, secondGale, zero) {
    let sql = `INSERT INTO roullete_new(room, aposta, result, firstgale, secondgale, zero) VALUES ($1, $2, $3, $4, $5, $6) Returning id`;    
    let params = [sala, aposta, resultado, fistGale, secondGale, zero];
    let result = await pool.query(sql, params);
    return result;
}

async function countAllSygnal() {
    let sql = `SELECT COUNT(*) FROM roullete_new`;    
    let params = [];
    let result = await pool.query(sql, params);
    return result;
}

async function createUsers(email, password, name, username, phone, address, product) {
    
    const hash = hasher.hasher(password, "")

    const query = `INSERT INTO users(username, name, email, password, sal, phone, address, product)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`
    try {
        const result = await pool.query(query, [username, name ,email, hash.hashedpassword, hash.salt, phone, address, product])
        return result.rows

        } catch(e) {
        console.log(e)
    }
}


async function getUser(email, password) {
    const query = `SELECT * FROM users WHERE email = $1`
        try {
            const result = await pool.query(query, [email])
            console.log(result)
            const hash = hasher.hasher(password, result.rows[0].sal)
            console.log(hash)
            if (hash.hashedpassword == result.rows[0].password) {
                return result.rows[0]
            } else {
                return 
            } 
        } catch(e) {
                console.log(e)
                return 
            }   
}

async function insertIntoLiveRoullete(result) {
    let sql = `INSERT INTO bet365LiveRoullete(result) VALUES ($1)`;
    let params = [result];
    let res = await pool.query(sql, params);
    return res;
}


async function getAllSygnal() {
    let trueSql = `SELECT count(*) FROM roullete_new 
    Where aposta ~* 'Bloco' 
    AND result = 'true' 
    AND firstgale = 'false' 
    AND secondgale = 'false' 
    AND zero = 'false'
    AND created > (now() - interval '1 day')
    OR aposta ~* 'Coluna'
    AND result = true 
    AND firstgale = 'false'
    AND secondgale = 'false' 
    AND zero = 'false' 
    AND created > (now() - interval '1 day');`


    let falseSql = `SELECT count(*) FROM roullete_new 
    Where 
    aposta ~ 'Bloco' 
    AND result = false  
    AND created > (now() - interval '1 day')
    or aposta ~ 'Coluna'
    AND result = false  
    AND created > (now() - interval '1 day');`

    let firstgaleSql = `SELECT count(*) FROM roullete_new 
    Where 
    aposta ~ 'Bloco'
    AND firstgale = true 
    AND result = true
    AND secondgale = false
    AND created > (now() - interval '1 day')
    OR aposta ~ 'Coluna'
    AND firstgale = true 
    AND result = true
    AND secondgale = false
    AND created > (now() - interval '1 day');`

    let secondgaleSql = `SELECT count(*) FROM roullete_new 
    Where 
    aposta ~* 'Bloco' 
    AND secondgale = true 
    AND result = true 
    AND created > now() - interval '1 day'
    OR aposta ~* 'Coluna'
    AND secondgale = true 
    AND result = true 
    AND created > now() - interval '1 day'`
    
    let zeroSql = `SELECT count(*) FROM roullete_new 
    Where 
    aposta ~* 'Bloco' 
    AND zero = true 
    AND result = true 
    AND created > now() - interval '1 day'
    OR aposta ~* 'Coluna'
    AND 
    zero = true 
    AND result = true 
    AND created > now() - interval '1 day'`
    
    let secondGaleLoss = `SELECT count(*) FROM roullete_new 
    Where
    aposta ~* 'Bloco' 
    AND secondgale = true 
    AND result = false 
    AND created > now() - interval '1 day'
    OR aposta ~* 'Coluna'
    AND
    secondgale = true AND result = false
    AND created > now() - interval '1 day';`

    let Total = `SELECT count(*) FROM roullete_new 
    Where aposta ~ 'Bloco'
    AND created > (now() - interval '1 day')
    OR aposta ~ 'Coluna' 
    AND created > (now() - interval '1 day');`	


    let trueResult = await pool.query(trueSql);
    let falseResult = await pool.query(falseSql);
    let firstgaleResult = await pool.query(firstgaleSql);
    let secondgaleResult = await pool.query(secondgaleSql);
    let zeroResult = await pool.query(zeroSql);
    let totalResult = await pool.query(Total);
    let secondGaleLossResult = await pool.query(secondGaleLoss);


    return {
        total: totalResult.rows[0].count,
        true: trueResult.rows[0].count,
        false: falseResult.rows[0].count,
        firstgale: firstgaleResult.rows[0].count,
        secondgale: secondgaleResult.rows[0].count,
        zero: zeroResult.rows[0].count,
        secondGaleLoss: secondGaleLossResult.rows[0].count
    }
}


async function getAllRows() {
    let sql = `SELECT * FROM roullete_new
    Where aposta ~ 'Bloco' AND created > (now() - interval '1 day')
    OR aposta ~ 'Coluna' AND created > (now() - interval '1 day')
        `;

    let result = await pool.query(sql);
    return result.rows;
}

async function getColSygnal() {
    let sql = `SELECT * FROM roullete_new
    WHERE aposta ~ 'Bloco'
    OR aposta ~ 'Coluna';


             `;
    let result = await pool.query(sql);
    return result.rows  
}

async function getLastNumber (name) {
    let sql = `Select numberjson 
    from robotbetpayload where name ~ $1
    order by created  
    desc limit 1;`;

    let result = await pool.query(sql, [name]);
    return result.rows[0]

}

async function InsertRoullete (name, numberJson, jsonPreload, jsonbStrategy) {
    let sql = `insert into robotbetpayload (name, numberjson, jsonbpreload, jsonbstrategy) 
    values ($1, $2, $3, $4) returning id`;

    let result = await pool.query(sql, [name, numberJson, jsonPreload, jsonbStrategy]);
    
    return result
}
    
async function insertUsersToken(id, navegator, is_admin) {

    const token = crypto.randomBytes(16).toString('hex')
    console.log(token)
    const query = `INSERT INTO users_token(user_id, token, navegator, is_admin)
                    VALUES ($1, $2, $3, $4) RETURNING *`
    try {
        const result = await pool.query(query, [id, token, navegator, is_admin])
        console.log(result.rows[0])
        return result.rows[0]
    } catch(e) {
        console.log(e)
    }
}

async function checkToken(token) {
    console.log(token)
    const query = `SELECT * FROM users_token WHERE token = $1`
    try {
        const result = await pool.query(query, [token]);
        return result.rows[0]
    } catch(e) {
        console.log(e)
    }
}




module.exports = {
    insertTelegram,
    insertTelegramSygnal,
    getIdANDInserResult,
    insertNewSygnal,
    countAllSygnal,
    createUsers,
    getUser,
    insertIntoLiveRoullete,
    getAllSygnal,
    insertUsersToken,
    checkToken,
    getAllRows,
    InsertRoullete,
    getLastNumber
}




