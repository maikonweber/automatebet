const express  = require('express');
const app = express();
const port = process.env.PORT || 3055; 
const cookieParser = require('cookie-parser');
const cors = require('cors');

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
  getResultDatabase
} = require('./database');



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.post('/api/v1/setblaze', async (req, res) => {
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

app.post('/api/cards', async (req, res) => {
 const { created, result } = req.body
  console.log(result)
 const setLastCard = await insertCards(result)
 res.send(200)
})

app.get('/exportcsv', async (req, res) => {
  const arrayName = [
    'Turkish_Roulette',
    'UK_Roulette',
    'Roulette',
    'Football_French_Roulette',
    'Spread_Bet_Roulette',
    'Greek_Quantum_Roulette',
    'Deutsches_Roulette',
    'Speed_Roulette',
    'Prestige_Roulette',
    'Mega_Fire_Blaze_Roulette_Live',
    'Football_Roulette',
    'Quantum_Roulette_Live',
    'Greek_Roulette',
    'Roleta_Brasileira',
    'Auto_Roulette',
    'French_Roulette',
    'Hindi_Roulette',
    'Roulette_Italiana',
    'Bucharest_Roulette',
    'American_Roulette',
   ]
  
  function convertToCSV(arr) {
    const array = [Object.keys(arr[0])].concat(arr)
  
    return array.map(it => {
      return Object.values(it).toString()
    }).join('\n')
  }
    for(let i = 0; arrayName.length > i; i++) {
        const dayResult = await getResultDatabase(arrayName)
        
      
    }

  
    console.log(dayResult)
    const convertDayResult = convertToCSV(dayResult)
    res.attachment('dayResult.csv').send(convertDayResult)
  })


app.get('/', (req, res) => {
    console.log(req.headers);
    console.log("Bateu");
    res.send('Hello World!');
}) 

app.post('/api/bet365', async (req, res) => {
    const body = req.body;

    const { name, number, preload, strategyDuziaRepeat, 
    strategyColumnReapeat, strategyAlternateColum, strategy19to36, strategyImparReapeat
  , strategyParReapeat , strategyGreen, strategyRed, strategyOneTo18, strategyRed4Time } = body;

      // Convert number type array to jsonb
    const numberJson = JSON.stringify(number);

    const jsonbStrategy = {
      "strategy19to39" : strategy19to36,
      "strategyAlternateColum" : strategyAlternateColum,
      "strategyColumnReapeat" : strategyColumnReapeat,
      "strategyDuziaRepeat" : strategyDuziaRepeat,
      "strategyImparReapeat" : strategyImparReapeat,
      "strategyParReapeat" : strategyParReapeat,
      "strategyGreen" : strategyGreen,
      "strategyRed" : strategyRed,
      "strategyOneTo18" :strategyOneTo18,
      "strategyRed4Time" : strategyRed4Time
    }
    
    const { colunas, bloco, impares, pares, green, red, oneTo18, nineteenTo36, colunas2 } = preload;
   
    const jsonPreload = {
      "colunas" : colunas,      
      "colunas2" : colunas2,
      "duzias" : bloco,
      "impares" : impares,
      "pares" : pares,
      "green" : green,
      "red" : red,
      "oneto18" : oneTo18,
      "nineteenTo36" : nineteenTo36, // last 18 numbers
    }
  
  
    let name_ = name.replace(/\s/g, '_');
    const resultado = await getLastNumber(name_);
    if (typeof resultado === 'undefined') {
      const result = await InsertRoullete(name_, numberJson, jsonbStrategy, jsonPreload);;
      res.json('You have set the blqaze at ')
    } else {
    const lastNumberString = resultado.numberjson.toString()
    const numberJsonString = number.toString()
    console.log(name_, numberJsonString, ":: Numbers Json :: Type Of ::", typeof numberJsonString)
    if (lastNumberString === numberJsonString) {
      console.log('Já existe um número igual ao que está tentando inserir')
      res.json("Numero não inserido")
    } else {
      const result = await InsertRoullete(name_, numberJson, jsonbStrategy, jsonPreload);
      console.log(result.rows, "ID :", name_, number);
      res.json('You have set the blqaze at ')
    } 
  }
  
    
})

app.use('/api/v1/*', (req, res, next) => {
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

app.post("/api/v1/createus", async (req, res) => {
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

app.post('/api/v1/setFilter', async (req, res) => {
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


app.get("/api/v2/telegramresult", async (req, res) => {
    const result = await getAllSygnal();
    res.json(result)
}
);

app.get("/api/v2/getTable", async (req, res) => {
  const result = await getAllRows();
  res.json(result).status(200);
}
);






app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)

}


);


