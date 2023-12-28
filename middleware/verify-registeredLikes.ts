import jwt from "jsonwebtoken"
import { RequestHandler } from "express"
import { ApplicationError } from "../error/application-error"
import { RequestUser } from "../@types/express"
import { Card } from "../db/model/card.model"

export const verifyRegisteredLikes: RequestHandler = async (req, res, next) => {
  const header = req.headers.authorization
if (!header) throw new ApplicationError("No authorization header", 401)

const token = header.split(" ")[1];
const secret = process.env.JWT_SECRET ?? ""

try {
    const payload = jwt.verify(token, secret) as RequestUser
    req.user = payload
    
    if(req.user?.id) return next()

    throw new ApplicationError("Not authorized", 401)
} catch (e) {
    next(e)
}
}