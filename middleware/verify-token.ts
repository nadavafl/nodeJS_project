import { RequestUser } from './../@types/express.d'
import { RequestHandler } from "express"
import { ApplicationError } from "../error/application-error"
import jwt from "jsonwebtoken"

export const verifyToken: RequestHandler = (req, res, next) => {
  const header = req.headers.authorization
  if (!header) {
    throw new ApplicationError("No authorization header", 401)
  }
  const token = header.split(" ")[1]
  const secret = process.env.JWT_SECRET ?? ""

  try {
    const payload = jwt.verify(token, secret) as RequestUser
      req.user = payload
        next()
    
  } catch (e) {
    throw new ApplicationError("Invalid token", 401)
  }
}