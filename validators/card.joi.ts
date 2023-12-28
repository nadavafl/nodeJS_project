import joi from "joi"
import { IAddress, ICardInput, IImage } from "../db/types/db"
import { patterns } from "./regex-patterns"

export const joiCardSchema = joi.object<ICardInput>({
  title: joi.string().required().min(2).max(256),
  subtitle: joi.string().required().min(2).max(256),
  description: joi.string().required().min(2).max(1024),
  phone: joi
    .string()
    .required()
    .min(9)
    .max(11)
    .pattern(new RegExp(patterns.phone)),
  email: joi.string().required().min(5).max(30).email(),
  web: joi.string().min(14).max(100).uri(),
  image: joi.object<IImage>({
    url: joi.string().uri().min(14).max(100),
    alt: joi.string().min(2).max(256),
  }),
  address: joi.object<IAddress>({
    state: joi.string().min(2).max(256),
    country: joi.string().min(2).max(256).required(),
    city: joi.string().min(2).max(256).required(),
    street: joi.string().min(2).max(256).required(),
    houseNumber: joi.number().min(1).max(256).required(),
    zip: joi.number(),
  }),
})