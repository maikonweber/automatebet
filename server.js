const express  = require('express');
const app = express();
const port = process.env.PORT || 3055; 
const cookieParser = require('cookie-parser');
const cors = require('cors');
const Blaze = require('./crash');

const {
  checkToken,
  countAllSygnal,
  createUsers,
  insertUsersToken,
  getUser,
  getAllSygnal,
  getAllRows
} = require('./database');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors(
  {
      origin: "*",  
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true,
      exposedHeaders: ['x-auth-token', "acceptCookies", 'token']
      
  }
));


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


app.get('/', (req, res) => {
    console.log(req.headers);
    console.log("Bateu");
    res.send('Hello World!');
}) 

app.post('/api/bet365', (req, res) => {
    const body = req.body;
    const { name, number, preload, strategyDuziaRepeat, 
    strategyColumnReapeat, strategyAlternateColum, strategy19to36, strategyImparReapeat
  , strategyParReapeat , strategyGreen, strategyRed, strategyOneTo18 } = body;

    const jsonbStrategy = {
      "strategy19to39" : strategy19to36,
      "strategyAlternateColum" : strategyAlternateColum,
      "strategyColumnReapeat" : strategyColumnReapeat,
      "strategyDuziaRepeat" : strategyDuziaRepeat,
      "strategyImparReapeat" : strategyImparReapeat,
      "strategyParReapeat" : strategyParReapeat,
      "strategyGreen" : strategyGreen,
      "strategyRed" : strategyRed,
      "strategyOneTo18" :strategyOneTo18
    }
    
    const { colunas, duzias, impares, pares, green, red, oneto18, nineteenTo36 } = jsonb;

    const jsonPreload = {
      "colunas" : colunas,
      "duzias" : duzias,
      "impares" : impares,
      "pares" : pares,
      "green" : green,
      "red" : red,
      "oneto18" : oneto18,
      "nineteenTo36" : nineteenTo36
    }


    let name_ = name.replace(/\s/g, '_');
    console.log(name, name_);
    console.log(number, "number");
    pool.query(`Select number from ${name_}
    order by created desc limit 1`, (err, result) => {
        if (err) {
            console.log(err);
            res.status(200).send("O seu nome não existe");
        } else {
            if (result.rows[0].number === number) {
                res.status(200).send("O seu número já calculado");
            } else {
                pool.query(`INSERT INTO ${name_} (number, jsobPreload, jsobStrategy) VALUES ($1, $2, $3)`, [number, jsonPreload, jsonbStrategy], (err, result) => {
                    if (err) {
                        console.log(err);
                        res.status(200).send("O seu nome não existe");
                    } else {
                        res.status(200).send("O seu número foi calculado");
                    }
                })
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
  const { email, password, name, username, phone, address, product } = req.body;
  let result = await createUsers(email, password, name, username, phone, address, product);
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


