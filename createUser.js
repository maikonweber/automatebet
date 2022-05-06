// post a fetch with axios
 const axios = require('axios');
 const url = 'https://api.muttercorp.online/api/v2';
 const headers = {
    'Content-Type': 'application/json',
    'x-auth-token' : "ma128sio4"
 }

const data = {
        "email": "maikonweber@gmail.com",
        "password": "ma128sio4",
        "userAgent": "insomia",
        "username": "maikonweber",
        "phone": "11987832539",
        "address": "Rua Santarém 55",
        "product": "MafiaRoulleta"
    }
    console.log(data)
    axios.post(url + '/createusers', data, {headers: headers})
    .then(function (response) {
        console.log(response.data);
    }
    )
    .catch(function (error) {

        console.log(error);
    }
    );
    console.log("Fim")
    