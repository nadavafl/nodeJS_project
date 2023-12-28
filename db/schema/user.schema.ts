import { Schema } from "mongoose"
import { IUser } from "../types/db"
import { addressSchema } from "./address.schema"
import { nameSchema } from "./name.schema"
import { imageSchema } from "./image.schema"

export const userSchema = new Schema<IUser>({
  name: {
    type: nameSchema,
    required: true,
  },
  isBusiness: {
    type: Boolean,
    required: false,
    default: false,
  },
  phone: {
    type: String,
    required: true,
    minlength: 9,
    maxlength: 11,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 50,
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    maxlength: 2000,
  },
  address: {
    type: addressSchema,
    required: true,
  },
  image: {
    type: imageSchema,
    required: false,
  },
  isAdmin: {
    type: Boolean,
    required: false,
    default: false,
  }
})