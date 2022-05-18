const express  = require('express');
const app = express();
const port = process.env.PORT || 3055; 
const cookieParser = require('cookie-parser');
const cors = require('cors');
const botQueue = require('./lib/queue');
const blaze = require('./crash');




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


app.post('/setblaze', async (req, res) => {
  const horario = req.body.horario
  await blaze('m.carvalho@grouplinknetwork.com', 'ma128sio4', horario)

  res.json('You have set the blaze at ')
})


app.get('/', (req, res) => {
    console.log(req.headers);
    console.log("Bateu");
    res.send('Hello World!');
}) 

app.get('/api', (req, res) => {
  console.log(req.headers);
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


