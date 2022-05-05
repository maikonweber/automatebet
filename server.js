const express  = require('express');
const app = express();
const port = process.env.PORT || 3055; 
const {
    insertUsersToken,
    countAllSygnal,
    createUsers,

} = require('./database');

app.get('/', (req, res) => {
    res.send('Hello World!');
}) 

app.get('/api/v1/', (req, res, next) => {
    res.send('Hello World');
});

app.post('/api/createUsers', async (req, res) => {
    const { email, password, lastname,name, username, phone, address} = req.body;
    const is_admin = false;
    try {
    const user = await createUsers(username, name, email, password, is_admin, nasc, cpf, lastname);
        res.send(user);
    } catch (error) {
        res.sendStatus(500);
    }
});


app.post('/api/loginInAdm', async(req, res) => {
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
      const user = await checkTokenUsers(token);
      if(user){
       next();
      } else{
        res.sendStatus(401);
      } 
});


app.get("/api/v1/telegramresult", async (req, res) => {
    const result = await countAllSygnal();
    res.json(result).status(200);
}
);






app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)

}


);


