
const input = require('input');
const { loginRoullete } = require('./robot');

(async () => {
    const login = await input.text("Press 1 to login in Roullete");
    if (login === '1') {
        loginRoullete("maikonweber1", "ma128sio4");
    } else if (login === 2) {
        console.log(login);
    }
    
})();