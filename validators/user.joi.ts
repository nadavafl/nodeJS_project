import joi from 'joi'
import { IUser, IAddress, IImage, IName } from "./../db/types/db.d"
import { patterns } from './regex-patterns'

export const joiUserSchema = joi.object<IUser>({
  email: joi.string().email().required().min(5).max(30),
  password: joi
    .string()
    .required()
    .min(7)
    .max(20)
    .pattern(
      new RegExp(patterns.password)
    ),
  isBusiness: joi.boolean().required(),
  phone: joi
    .string()
    .required()
    .min(9)
    .max(11)
    .pattern(
      new RegExp(patterns.phone)
    ),
  name: joi.object<IName>({
    first: joi.string().required().min(2).max(256),
    middle: joi.string().min(0).max(256),
    last: joi.string().required().min(2).max(256)
  }),
  address: joi.object<IAddress>({
    state: joi.string().min(2).max(256),
    country: joi.string().min(2).max(256).required(),
    city: joi.string().min(2).max(256).required(),
    street: joi.string().min(2).max(256).required(),
    houseNumber: joi.number().min(1).max(256).required(),
    zip: joi.number().required()
    }),
  image: joi.object<IImage>({
    url: joi.string().min(14).max(256).uri(),
    alt: joi.string().min(2).max(256)
  })
})