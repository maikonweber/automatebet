const cp = require('child_process');
const modulePath = './index.js';
const array = [{
    Mega fire blaze roulette live
    Football roulette
    Roulette
    Hindi roulette
    Quantum roulette live
    Quantum roulette italiana
    Speed roulette
    Greek Quantum roulette
    Greek roulette
    Turkish roulette
    Roleta brasileira
    Quantum auto roulette
    Prestige roulette
    American roulette
    Spread bet roulette
    Deutsches roulette
    Uk roulette
    French roulette
    Triumph roulette
    Roulette italiana
}



;
(async () => {
    for (const item of data) {
        const worker = cp.fork(modulePath, []);
        worker.on('message', (msg) => {
            console.log('Worker %s exited', msg);
        }   
        );
        worker.on('error', (err) => {
            console.log('Worker %s errored', err);
            
        })

        worker.send(item);
    }
}
)();
