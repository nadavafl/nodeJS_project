import joi from 'joi'
import { IUpdateIsBusiness } from '../@types/updateUser'

export const joiUpdateIsBusiness = joi.object<IUpdateIsBusiness>({
  isBusiness: joi.boolean().required(),
})