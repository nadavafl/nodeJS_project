import joi from 'joi'
import { ILogin } from '../db/types/db'
import { patterns } from './regex-patterns'

export const joiLoginSchima = joi.object<ILogin>({
  email: joi
    .string()
    .email()
    .required()
    .min(5)
    .max(30),
  password: joi
    .string()
    .required()
    .min(7)
    .max(20)
    .pattern(
      new RegExp(patterns.password)
    ),
})