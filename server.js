const express  = require('express');
const app = express();
const port = process.env.PORT || 3000; 

// Create endpoint



app.get('/api/v3/runBotting', (req, res) => {
  
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
}
);


