import Joi from "joi"
import { ICard } from "../db/types/db"

export const joiBizNumberSchema = Joi.object<ICard>({
    bizNumber: Joi.number().greater(99999999).less(99999999999).required(),
}) 