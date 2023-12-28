import { RequestUser } from "./../@types/express.d"
import { RequestHandler } from "express"
import { ApplicationError } from "../error/application-error"
import jwt from "jsonwebtoken"

export const verifyUserOrAdmin: RequestHandler = (req, res, next) => {
  const header = req.headers.authorization
  if (!header) {
    throw new ApplicationError("No authorization header", 401)
  }
  const token = header.split(" ")[1]
  const secret = process.env.JWT_SECRET ?? ""

  try {
    const payload = jwt.verify(token, secret) as RequestUser
    req.user = payload

    if (req.user?.isAdmin) {
       return next()
    }
    if (req.params.id === req.user?.id) {
       return next()
      }
      
    throw new ApplicationError("Not an admin", 401)
    
  } catch (e) {
    next(e)
  }
}