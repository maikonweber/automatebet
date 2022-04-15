
const input = require('input');
const RobotObserverRoullet  = require('./RobotObserverRoullet');



(async () => {
    const login = await input.text("Press 1 to login in Roullete");
    if (login === '1') {
        const robot = new RobotObserverRoullet('ma128sio4', 'maikonweber1');
        await robot.routine();
    } else if (login === 2) {
        
    }
    
})();