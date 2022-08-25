const EventEmiter = require('events')
const emiter = new EventEmiter()

emiter.on('Ready', () => {
    console.log('Console.log')
})   