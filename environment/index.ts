import { config } from 'dotenv'

export const configEnv = () => { 
    const env = process.env.NODE_ENV || "dev"
    config({
      path: `environment/.${env}.env`,
    })
}