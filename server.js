const express  = require('express');
const app = express();
const port = process.env.PORT || 3055; 
const cookieParser = require('cookie-parser');
const cors = require('cors');
const {
  insertTelegram,
  insertTelegramSygnal,
  getIdAndInserResult,
  insertNewSygnal,
  countAllSygnal,
  createUsers,
  getUser,
  insertIntoLiveRoullete,
  getAllSygnal,
  insertUsersToken,
} = require('./database');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors(
  {
      origin: "*",  
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true,
      exposedHeaders: ['x-auth-token', "acceptCookies"]
      
  }
));

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


app.post('api/v1/createusers', async (req, res) => {
    console.log("Criando usuarios");
    const { email, password,name, username, phone, address, product} = req.body;
    console.log(email, password, name, username, phone, address, product)
    try {
    const user = await createUsers(username, name, email, password, phone, address, product);
        	console.log(users)
	    res.send(user);
    } catch (error) {
        res.sendStatus(500);
    }
});


app.post('/api/v1/loginadm', async(req, res) => {
    const { email, password } = req.body;
    let navegator = req.headers['user-agent'];
    console.log(email, password)
    try {
        const user = await loginAdm(email, password);
        console.log(user)
        if (user) {
          console.log("Aqui")
          const response = await insertUsersToken(user.id, navegator, true);
          res.json(response.token).status(200);
  
        } else {
          res.sendStatus(402);
        }
      } catch (error) {
        res.sendStatus(500);
      }
})


app.get("/api/v1/telegramresult", async (req, res) => {
    const result = await countAllSygnal();
    res.json(result.rows).status(200);
}
);






app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)

}


);


