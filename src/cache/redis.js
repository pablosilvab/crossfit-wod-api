const redis = require('ioredis');

const REDIS_HOST = process.env.REDIS_HOST || '127.0.0.1'
const REDIS_PORT = process.env.REDIS_PORT || 6379
const REDIS_PASS = process.env.REDIS_PASS || ''

const client = redis.createClient({
    host: REDIS_HOST,
    port: REDIS_PORT,
    no_ready_check: true,
    password: REDIS_PASS
})

client.on('connect', () => console.log(`Redis is connected on ${REDIS_HOST}:${REDIS_PORT}`))
client.on("error", (error) => console.error(error))

module.exports = client