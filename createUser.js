// post a fetch with axios
 const axios = require('axios');
 const url = 'https://api.muttercorp.online/api/loginadm';
 const headers = {
    'Content-Type': 'application/json',
 };
    const data = {
        "email": "maikonweber@gmail.com",
        "password": "ma128sio4",
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
