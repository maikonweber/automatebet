// post a fetch with axios
 const axios = require('axios');
 const url = 'https://api.muttercorp.online/api/v2/createusers';
 const headers = {
    'Content-Type': 'application/json',
 };

    axios.post(url, {
        headers,
        data: {
            "entrada": "Entrar",
            "sala": "Sala 1",
            "fistGale": true,
        }
    }).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.log(error);
    }
    );
