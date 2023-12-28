import morgan from "morgan"
import chalk from "chalk"

morgan.token("method", (req, res) => {
  return chalk.bold.green(req.method, req.url)
})

morgan.token("url", (req, res) => {
  return chalk.bold.white(req.url)
});

morgan.token("status", (req, res) => {
    const status = res.statusCode
    let color = chalk.green
    if (status >= 500) color = chalk.red
    else if (status >= 400) color = chalk.yellow
    else if (status >= 300) color = chalk.cyan
    return color(status)
})

morgan.token("date", (req, res) => {
    return chalk.bold.bgBlue(new Date().toLocaleString())
})

const format = process.env.NODE_ENV === "prod" ? "tiny" : ":method :url :status :response-time ms :date"
export const logger = morgan(format)