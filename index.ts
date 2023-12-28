import express from "express"
import { connect } from "./db/utils/connection"
import usersRouter from "./routes/users"
import cardsRouter from "./routes/cards"
import { logger } from "./middleware/logger"
import { errorHandler } from "./middleware/error-handler"
import { configEnv } from "./environment"
import cors from "cors"
import chalk from "chalk"
import { notFound } from "./middleware/not-found"
import { initDBusers } from "./db/utils/init-db-users"
import { initDBcards } from "./db/utils/init-db-cards"

configEnv()
connect()
initDBusers()
initDBcards()   
 
const app = express()

app.use(cors({
    origin: "http://localhost:3000" 
  }))

//add an express middleware that uses JSON.parse(body)
app.use(express.json());
app.use(logger);  

app.use(express.static("public"))
 
app.use("/api/v1/users", usersRouter)
app.use("/api/v1/cards", cardsRouter)

app.use(errorHandler)

app.use(notFound)
  
const PORT = process.env.EXPRESS_PORT

app.listen(PORT, () => {
  console.log(chalk.bold.underline.blue(`App is running on http://localhost:${PORT}`))
})