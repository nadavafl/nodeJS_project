import chalk from 'chalk'
import mongoose from 'mongoose'

export const connect = async () => {
    const host = process.env.DB_HOST
    const port = process.env.DB_PORT
    const db = process.env.DB_NAME
    const user = process.env.DB_USER
    const pass = process.env.DB_PASS
    const protocol = process.env.DB_PROTOCOL
    const option = process.env.DB_OPTIONS
    
    let connectionString

    if (protocol === "mongodb+srv") {
      connectionString = `${protocol}://${user}:${pass}@${host}/${db}${option}`
    } else {
      connectionString = `mongodb://${user}:${pass}@${host}:${port}/${db}`
    }

    await mongoose.connect(connectionString)

    console.log(chalk.bold.white('Connected to MongoDB'))
}