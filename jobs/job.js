const blaze = require('../crash')
console.log(blaze)

const job = {
    key: 'SendBlaze',
    async handle({ job, data }) {
        console.log(job.id, data);
        console.log("List queue")
        await blaze('m.carvalho@grouplinknetwork.com', 'ma128sio4');
    }
}

module.exports = job;