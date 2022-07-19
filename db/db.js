
const {Pool, Client}  = require('pg');
const crypto = require('crypto')


const pool = new Pool({
    database: "nagano",
    user: "nagano",
    password: "mara128sio4",
    port: 5232,
    host: "localhost",
    ssl: false
});


function GenToken() {
  var code = crypto.randomBytes(20).toString('hex')
  return code
}


async function getAll() {
  try {
    const result = await pool.query('SELECT * FROM lead;')
  
    return result.rows
  
  } catch (err) {
    console.log(err)
}
}

async function insertLeads(first_name, last_name, phone, email, message) {
  let string = `INSERT INTO lead 
  (first_name, last_name, email, phone, message) 
  VALUES ($1, $2, $3, $4, $5);` 
  try {
    const result = await pool.query(string, [first_name, last_name,  email, phone, message]);
    console.log(result.rows)
    return true
} catch (err) {
    console.log(err)
} 
}

async function isUser(email, password) {
  let string = `SELECT * FROM users WHERE email = $1 AND password = $2;`
 
  try {
    const result = await pool.query(string, [email, password])
    return result.rows
  }
  catch (err) {
    console.log(err)
  }

  if (result.rows.length > 0) {
    return true
  }
  else {
    return false
  }  
}

async function insertToken() {
  let token = 'INSERT INTO token (token) VALUES ($1) RETURNING token;'
  try {
    const result = await pool.query(token, [GenToken()])
    return result.rows
  }
  catch (err) {
    console.log(err)
  }
}

async function getToken(token) {
  let string = `SELECT * FROM token WHERE token = $1;`
  try {
    const result = await pool.query(string, [token])
    if (result.rows.length > 0) {
      return true
    } else {
      return false
    }
  }
  catch (err) {
    console.log(err)
  }
}


  
module.exports = {
  getAll,
  insertLeads,
  isUser,
  insertToken,
  getToken,
}
