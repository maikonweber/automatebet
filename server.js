const express  = require('express');
const app = express();
const port = process.env.PORT || 3055; 
const db = require('./database');

// Create endpoint



app.get('/api/v1/', (req, res, next) => {
    res.send('Hello World');
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


app.post("/dye/api/v1/*", async (req, res, next) => {
    const token = req.headers['x-auth-adm'];
      const user = await checkTokenUsers(token);
      if(user){
       next();
      } else{
        res.sendStatus(401);
      } 
});





app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)


}


);


