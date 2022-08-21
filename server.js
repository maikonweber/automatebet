const express  = require('express');
const app = express();
const port = process.env.PORT || 3055; 
const cookieParser = require('cookie-parser');
const cors = require('cors');
const exceljs = require('exceljs')
const fs = require('fs')
const path = require('path')
const {getAll, insertLeads, isUser, getToken, insertToken} = require('./db/db.js')
const Redis = require('ioredis')
const redis = new Redis()


const {
  checkToken,
  countAllSygnal,
  createUsers,
  insertUsersToken,
  getUser,
  getAllRows,
  InsertRoullete,
  getLastNumber18,
  getLastNumber,
  usersFilters,
  insertCards,
  getResultDatabase,
  getLastNumberEv,
  InsertRoulleteEv,
  getLastNumberCard,
  insertCardPayload,
  insertDouble_,
  insertCrash_,
  insertNumberClass
} = require('./database');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



app.use("/api/time", async (req, res, next) => {
  console.log(new Date());
  
  res.json({ ts: Date.now() });
});


app.post('/api/v1/sendLead', async (request, response) => {
  
  console.log('rota');
  const first_name = request.body.first_name;
  const last_name = request.body.last_name;
  const phone = request.body.phone;
  const email = request.body.email;
  const message = request.body.message;
  
  const data = await insertLeads(first_name, last_name, phone, email, message);
  if (data === true) {
      return response.json({
          status: 'success',
          data: data
      });
  } else {
      return response.json({
          status: 'error',
      });
  }
});


app.post('/api/v1/login', async(request, response) => {
  const user = request.body.email;
  const pass = request.body.password;
  const data = await isUser(user, pass);
  if (data === false) {
    res.status(403).send('Usuário ou senha inválidos');
      return
    } else {
    const token = await insertToken();
    response.send(token).status(200);
    }
  });

  
app.post('/api/crash', async (req, res) => {
  const body = req.body;
    const { name, number } = body;
    // const objInsert = new insertNumberClass(name, number, 'crash_game')
    // const result = objInsert.tryInsertThis()
     })


app.post('/api/double_', async ( req, res) => {
  const body = req.body;
    const { name, number } = body;
    // let name_ = name.replace(/\s/g, '_');
    // const objg = new insertNumberClass(name_, number, 'double_game')
    // const result = objInsert.tryInsertThis()
    // res.send(result).status(200)
})

app.post('/api/v1/', async(request, response) => {
  const token = request.headers.token;
  const data = await getToken(token);
  console.log(data)
  if (data === false) {
      response.send('Token inválido').status(403);
  }   else {
      response.send({status : true}).status(200);     
  }

});    

app.get('/api/v1/data/', async (request, response) => {
  const token2 = request.headers.token;
  const token = request.header.token;
  console.log(token);
  console.log(token2)
  const data = await getToken(token);
  if (data === true) {
      next();
  } else {
      response.status(401).send('Unauthorized');
  }
});

app.get('/api/v1/data/getAll', async (request, response) => {
  const data = await getAll();    
  console.log(data)

   response.json(data).status(200); 
});


app.post('/api/v2/setblaze', async (req, res) => {
  console.log(req)
  const horario = req.body.horario
  const valor = req.body.valor
  const username = req.body.username
  const password = req.body.password
  const autoretirar = req.body.autoretirar
  console.log(horario, valor, username, password, autoretirar)
  const blaze = new Blaze(valor, username, password, horario, autoretirar)
  await blaze.getEntry()
  res.json('You have set the blaze at ')
})

app.post('/api/cards_', async (req, res) => {
  const body = req.body
  let { number , name } = body  
  let name_ = name.replace(/\s/g, '_');
  // res.send(result).status(200)
  
  const result = await redis.get(`${name_}_${number}`)
  if(!result){
    await redis.set(`${name_}_${number}`, 'true', 'EX', '60')
    const objg = await insertCardPayload(name_, number)  

  } 
  res.send(result).status(200)
  
})


app.get('/api', async (req, res) => { 
  res.send('Hello')
})


app.get('/', (req, res) => {
    console.log(req.headers);
    console.log("Bateu");
    res.send('Hello World!');
}) 

app.post('/api/evolution', async (req, res) => {
  const body = req.body;
  const {name, number, date} = body;  // console.log(name, number)
  let name_ = name.replace(/\s/g, '_');
  console.log(name_, number)

  const mock = 1000 * 30 
  const mockate = date / 1000 / 5
  const newNumber = JSON.stringify(number)
  const result = await redis.get(`${name_}_${newNumber}`)
  if (!result) {
  await redis.set(`${name_}_${newNumber}`, { result : 'ok' }, 'EX', 80)
    console.log('New Insert')
    const result = await getLastNumberEv() 
    if(result != number) {
      const insertResult = await InsertRoulleteEv(name, number)
    return res.send('This Number Insert')
    }
    return res.send('This number not inser')
  }
  // Name , Number, Database 
  //const objInsert = new insertNumberClass(name_, number, 'robotevolution')
  return res.send('The number need verification').status(500)
})



app.post('/api/bet365', async (req, res) => {
    const body = req.body;
    const { name, number } = body;
    let name_ = name.replace(/\s/g, '_');
    const objInsert = new insertNumberClass(name, number, 'robotbet365')
    const result = objInsert.tryInsertThis()
    res.send(result).status(200)
})

app.use('/api/v3/*', (req, res, next) => {
  console.log(req.headers);
  if (req.headers.token === '555215667') {
    console.log("Bateu");
    next();
  } else {
    res.send('You need to accept cookies');
  }
})

app.use('/api/v2/*', (req, res, next) => {
  console.log(req.headers);
  const token = req.headers.token;
  if (token) {
    const user = checkToken(token);
    if (user) {
      next();
    } else {
      res.send('You need to login to access this page');
    }
  } else {
    res.send('You need to login to access this page');
  }
})

app.post("/api/v2/createus", async (req, res) => {
  const { email, password, name, username, phone, address } = req.body;
  let result = await createUsers(email, password, name, username, phone, address);
  res.send(result);
  
})


app.post('/api/loginadm', async(req, res) => {
    const { email, password } = req.body;
    let navegator = "agent";
    console.log(email, password)
      const user = await getUser(email, password)
      console.log(user)
        if (user) {
          console.log("Aqui")
          const response = await insertUsersToken(user.id, navegator, true);
          console.log(response)
          res.json(response.token).status(200);
        } else {
          res.sendStatus(402);
        }
})

app.post('/api/v2/setFilter', async (req, res) => {
  let { games, string_msg, string_msg_green, string_msg_red, rollets_permit} = req.body;

  const token = req.headers.token;

  console.log(token, ":: Token ::");
  console.log(games, ":: User Id ::");
  console.log(string_msg, ":: String Msg ::");
  console.log(string_msg_green, ":: String Msg Green ::");
  console.log(string_msg_red, ":: String Msg Red ::");
  console.log(rollets_permit, ":: Rollets Permit ::");

  const result = await usersFilters(2, games, string_msg, string_msg_green, string_msg_red, rollets_permit);
  if(!result) {
    res.sendStatus(400);
  }
    res.send(result);
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)

}


);


