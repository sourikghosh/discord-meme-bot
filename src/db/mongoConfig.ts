import mongoose from 'mongoose'

mongoose
    .connect(process.env.MONGODB_URI!, {
        dbName: process.env.MDB_NAME,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    })
    .then(() => {
        console.log('mongodb connected.')
    })
    .catch((err: Error) => console.log(err.message))

mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to db')
})

mongoose.connection.on('error', (err: Error) => {
    console.log(err.message)
})

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose connection is disconnected.')
})

process.on('SIGINT', async () => {
    await mongoose.connection.close()
    process.exit(0)
})
process.on('SIGTERM', async () => {
    await mongoose.connection.close()
    process.exit(0)
})