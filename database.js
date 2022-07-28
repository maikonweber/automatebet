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

class insertNumberClass {
    constructor(roullet, insertNumber, database) {
        this.roullet = name_
        this.insertNumber = insertNumber 
        this.game = database
        this.lastResult = []
    }

    async getLastNumber() {
        let sql = `SELECT number 
        FROM $2 where name = $1
        order by created  
        desc limit 1;`;
    
        let result = await pool.query(sql, [this.roullet, this.games]);
        return result.rows[0].number;
    }

    async tryInsertThis() {
       const result  = await this.getLastNumber()
       if(!result) {
            console.log("Nao Existe Nenhum Numero que Antecede a para seja Inserido")
            console.log("Inserido Primeiro Registro")
            const insert= await this.InsertRoulleteEv()
            return 'NEW INSERT' + insert
       } else if (result === insertNumber) {
            console.log('O Registro da ', this.roullet, 'É igual ao ', result, 'inserNumber : ', this.insertNumber)
            return 'INSERT PLOBLEM'
       } else {
        const insert = await this.InsertRoulleteEv()
        console.log('Numero Inserido', this.roullet, this.insertNumber)
        return 'INSERT COMPLETE' + insert
       }
    }
    async InsertRoulleteEv() {
            let sql = `INSERT INTO $3 (name, number) 
            VALUES ($1, $2) returning id`;
            let result = await pool.query(sql, [this.roullet, this.insertNumber, this.games]); 
            return result.rows
    }
}

async function insertCrash_ (date, number) {
    const date_ = new Date(date).getTime()

   let  sqlString = `
   INSERT INTO crash_game (number, date_) VALUES ($1, to_timestamp($2::bigint)) RETURNING date_; 
   `  

   const result = await pool.query(sqlString, [number, date_])
    return result
} 

async function insertDouble_ (date, number) {
    console.log(date)
    let  sqlString = `
    INSERT INTO double_game(number, date_) VALUES ($1, to_timestamp($2::bigint)) RETURNING date_; 
    `  
 
    const result = await pool.query(sqlString, [number, date])
     return result
 } 




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

async function createUsers(email, password, name, username, phone, address) {
    
    const hash = hasher.hasher(password, "")

    const query = `INSERT INTO users(username, name, email, password, sal, phone, address)
                    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`
    try {
        const result = await pool.query(query, [username, name ,email, hash.hashedpassword, hash.salt, phone, address])
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

async function getStrategyByRoullet (name) {
    let sql = `Select name, number 
               FROM robotevolution where name ~ $1
               Order by created 
               Desc LIMIT 1;` 

            const result = await pool.query(sql, [name])
            return result.rows   
}

async function getLastNumber(name) {
    let sql = `SELECT number 
    FROM robotevolution where name = $1
    order by created  
    desc limit 1;`;

    let result = await pool.query(sql, [name]);
    return result.rows[0].number;
}


async function getLastNumberEv(name) {
    let sql = `SELECT number 
    FROM robotevolution where name ~ $1
    order by created  
    desc limit 1;`;

    let result = await pool.query(sql, [name]);
    return result.rows[0];
}

async function getLastNumberCard(name) {
    let sql = `SELECT number 
    FROM paylaoad_card where name ~ $1
    order by created  
    desc limit 1;`;

    let result = await pool.query(sql, [name]);
    return result.rows[0];
}

async function insertCardPayload (name, number) {
    let sql = `INSERT INTO paylaoad_card (name, number) VALUES ($1, $2) RETURNING id`

    let result = await pool.query(sql, [name, number])
    return result.rows[0];
}

async function getLastNumber18(name) {
    let sql = `SELECT number
    FROM robotevolution where name ~ $1
    and created > now() - interval '4 hour'
    order by created  
    desc limit 13;`;

    let result = await pool.query(sql, [name]);
    return obj = {
        fistRow : result.rows[0],
        lastRow : result.rows[12]
    }
}


async function getLastNumber18bet(name) {
    let sql = `SELECT number
    FROM robotbetpayload where name ~ $1
    and created > now() - interval '4 hour'
    order by created  
    desc limit 13;`;

    let result = await pool.query(sql, [name]);
    return obj = {
        fistRow : result.rows[0],
        lastRow : result.rows[12]
    }
}


async function getLastCard() {
    let sql = `SELECT number, name, created from  
               paylaoad_card
               order by 
               created desc`
    let result = await pool.query(sql)
    return result.rows
}

async function insertCards(number) {

    let sql  = `INSERT INTO mafia_cards(lastnumber) VALUES ($1)`
    let result = await pool.query(sql, [number])
    return result
}


async function InsertRoullete (name, numberJson, jsonPreload, jsonbStrategy) {
    let sql = `insert into robotbetpayload (name, numberjson, jsonbpreload, jsonbstrategy) 
    values ($1, $2, $3, $4) returning id`;

    let result = await pool.query(sql, [name, numberJson, jsonPreload, jsonbStrategy]);
    
    return result
}

async function InsertRoulleteEv (name, number) {
    let sql = `INSERT INTO robotevolution (name, number) 
    VALUES ($1, $2) returning id`;

    let result = await pool.query(sql, [name, number]);
    
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

async function insertSygnal (number, detectStrategy, name, expect_number) {
    // convert number to json
    let expect_number_json = JSON.stringify(expect_number)
    let numberJson = JSON.stringify(number);
    let queryString = `INSERT INTO robotbetsygnal (number, detectstretegy, roulletname, result, martingale, martingale2, martingale3, process, expect_number)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`
    let result = await pool.query(queryString, [numberJson, detectStrategy, name, false, false, false, false, false, expect_number_json]);
    return result.rows[0];
}


async function usersFilters(user_id, games, roullet_permit, string_msg, string_msg_green, string_msg_red) {
    console.log(user_id, games, roullet_permit, string_msg, string_msg_green, string_msg_red)
    // Parse games to jsonb 
    let gamesJson = JSON.stringify(games);
    // parse roullet_permit to jsonb
    let roulletPermitJson = JSON.stringify(roullet_permit);

    let query = `INSERT INTO users_filters 
                 (user_id, games, rollets_permit, string_msg , string_msg_green, string_msg_red)
                 VALUES ($1, $2, $3, $4, $5, $6)
                 ON CONFLICT (user_id) DO UPDATE SET    
                    games = $2,
                    rollets_permit = $3,
                    string_msg = $4,
                    string_msg_green = $5,
                    string_msg_red = $6
                    Where users_filters.user_id = $1 RETURNING *`
    try {

    let result = await pool.query(query, [user_id, gamesJson, roulletPermitJson, string_msg, string_msg_green, string_msg_red]);
    
    return result.rows
    } catch(e) {
        console.log(e)
    }   
 
}

async function getResultDatabase(name) {
    let query = `Select numberjson, created, name, id 
                FROM robotbetpayload
                WHERE name  ~ $1
                AND created BETWEEN now() - interval '1 day' AND now()
                Order by created desc;`

    let result = await pool.query(query, [name])
    return result.rows
   
}

async function getCards(name) { 
    let query = `
        Select number, name, created
        FROM paylaod_card
        WHERE name ~ $1
        AND created > now() - interval '1 hour'
        Order by created desc
        limit 1;
    `
    let result = await pool.query(query, [name])

    return result.rows
}

async function getUsersFilter (email) {
    let query = `With d as 
    (Select id, email
    from users
    ) Select * 
      from users_filter
      JOIN d
      ON d.id = users_id;`
    let result = await pool.query(query);
    return result.rows
}

async function getStrategyFilter() {
    console.log(roulletName, 'Aqui')

    let query =  `Select * from robotbetsygnal
                  WHERE created BETWEEN now() - interval '9 seconds'
                  AND now()
                  ORDER BY created desc
                  ;`
                    
    let result = await pool.query(query);
    return result.rows
}   

async function updateStrategy(id, result = 'result', value) {
    let object = {
        'martingale': 'martingale',
        'martingale2': 'martingale2',
        'martingale3': 'martingale3',
        'result': 'result'
    }

    let query = `UPDATE robotbetsygnal SET ${object[`${result}`]} = $2 WHERE id = $1`
    let res = await pool.query(query, [id, value])
    return res
}

async function updateStrategyFilter(id, value) {
    let query = `UPDATE robotbetsygnal SET process = true WHERE id = $1`
    let res = await pool.query(query, [id])
    return res
}



module.exports = {
    getStrategyFilter,
    insertTelegram,
    insertTelegramSygnal,
    getIdANDInserResult,
    insertNewSygnal,
    countAllSygnal,
    createUsers,
    getUser,
    insertIntoLiveRoullete,
    insertUsersToken,
    checkToken,
    getAllRows,
    InsertRoullete,
    getLastNumber18,
    getLastNumber,  
    getStrategyByRoullet,
    insertSygnal,
    getUsersFilter,
    usersFilters,
    updateStrategy,
    updateStrategyFilter,
    insertCards,
    getCards,
    getLastCard,
    getResultDatabase,
    getLastNumberEv,
    InsertRoulleteEv,
    insertCardPayload,
    getLastNumberCard,
    insertCrash_,
    insertDouble_,
    insertNumberClass,

}




