import { CastError } from 'mongoose'
import { ErrorRequestHandler } from "express"
import { ApplicationError } from "../error/application-error"
import { MongoServerError } from 'mongodb'

export const errorHandler: ErrorRequestHandler = (e, req, res, next) => {

  if (e instanceof ApplicationError) {
    return res.status(e.status).json({ message: e.message })
  }
  
  const CastError = e as CastError
  if (CastError) {
    return res
      .status(400)
      .json({ message: CastError.message, name: CastError.name })
  }
    
  if (e instanceof SyntaxError && "status" in e) {
    return res.status(400).json({ message: e.message, name: e.name })
  }

  if (e instanceof MongoServerError && "status" in e) {
    return res.status(400).json({ message: e.message, name: e.name })
  }

  if (e instanceof Error) {
    return res.status(500).json({ message: e.message, e, source: "other" })
  } else {
    return res.status(500).json({ message: "Something went wrong" })
  }
}