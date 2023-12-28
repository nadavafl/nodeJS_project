import jwt from "jsonwebtoken"
import { RequestHandler } from "express"
import { ApplicationError } from "../error/application-error"
import { RequestUser } from "../@types/express"
import { Card } from "../db/model/card.model"

export const verifyRegisteredUserOrAdmin: RequestHandler = async (req, res, next) => {
  const header = req.headers.authorization
  if (!header) throw new ApplicationError("No authorization header", 401)

  const token = header.split(" ")[1]
  const secret = process.env.JWT_SECRET ?? ""

  try {
    const payload = jwt.verify(token, secret) as RequestUser
    req.user = payload
    const card = await Card.find({ user_id: req.user.id })
    const card_userId = card[0].user_id.toString()

    if (card_userId === req.user.id) return next()

    if (req.user?.isAdmin) return next()

    throw new ApplicationError("Not authorized", 401)
  } catch (e) {
    next(e)
  }
}