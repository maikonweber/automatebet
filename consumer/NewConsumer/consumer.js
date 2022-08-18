class MQ {
    constructor (uri) {
        this.conn;
        this.uri = uri
        this.channel;
        this.q = '';

    }

    async setupConnection () {
        this.conn = await amqp.connect(this.uri)
        this.channel = await this.conn.createChannel();
        await this.channel.assertQueue(this.q, { durable : false })
    }

    send(msg) {
        this.channel.sendToQueue(this.q, Buffer.from(msg))
        console.log('[x] - Send - x', msg)


    }

    async recv() {
        await this.channel.consume(this.q), (msg) => {
            const result = msg.content.toString();
            console.log(`Receive ${result}`)
        }
    }
}


const Mq = new MQ()











