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

app.post('/api/v2/createusers', async (req, res) => {
    console.log("Criando usuarios");
    const { email, password,name, username, phone, address, product} = req.body;

    try {
    const user = await createUsers(username, name, email, password, phone, address, product);
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


app.post("/api/v1/*", async (req, res, next) => {

    const token = req.headers['x-auth-adm'];
    console.log(token);
      const user = await getUserToken(token);
      console.log(user)
      if(user){
       next();
      } else{
        res.json({ status: "401" }).status(401);
      } 
});


app.get("/api/v1/telegramresult", async (req, res) => {
    const result = await countAllSygnal();
    res.json(result.rows).status(200);
}
);






app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)

}


);


