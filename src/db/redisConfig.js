import redis from 'redis'

const redisClient = redis.createClient({
    port: +process.env.REDI_PORT!,
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD
})

redisClient.on('connect', () => {
    console.log('Client connected to redis...')
})

redisClient.on('ready', () => {
    console.log('Client connected to redis and ready to use...')
})

redisClient.on('error', (err) => {
    console.log(err.message)
})

redisClient.on('end', () => {
    console.log('Client disconnected from redis')
})

process.on('SIGINT', () => {
    redisClient.quit()
})
process.on('SIGTERM', () => {
    redisClient.quit()
})
export default redisClient