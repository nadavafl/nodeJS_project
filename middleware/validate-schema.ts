import { RequestHandler } from "express"
import Joi from "joi"
import { joiUserSchema } from "../validators/user.joi"
import { joiCardSchema } from "../validators/card.joi"
import { joiLoginSchima } from "../validators/login.joi"
import { joiUpdateIsBusiness } from "../validators/update-isBusiness.joi"
import { joiBizNumberSchema } from "../validators/biz-number.joi"

type ValidateSchema = (schema: Joi.ObjectSchema) => RequestHandler

const validateSchema: ValidateSchema = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body)
    next()
  } catch (e) {
    return res.status(400).json(e)
  }
}

export const validateUser = validateSchema(joiUserSchema)
export const validateLogin = validateSchema(joiLoginSchima)
export const validateCard = validateSchema(joiCardSchema)
export const validateUpdateUser = validateSchema(joiUpdateIsBusiness)
export const validateBizNumber = validateSchema(joiBizNumberSchema)