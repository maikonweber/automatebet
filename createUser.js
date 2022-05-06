// post a fetch with axios
 const axios = require('axios');
 const url = 'https://api.muttercorp.online/api/v2/createusers';
 const headers = {
    'Content-Type': 'application/json',
 };
    const data = {
        "email": "maikonweber@gmail.com",
        "password": "ma128sio4",
        "name" : "Maikon",
        "username": "maikonweber",
        "phone": "11987832539",
        "address": "Rua Santarém 55",
        "product": "MafiaRoulleta"
    };
    axios.post(url, data, { headers })
    .then(function (response) {
        console.log(response.data);
    }
    )
    .catch(function (error) {
        console.log(error);
    }
    );
    