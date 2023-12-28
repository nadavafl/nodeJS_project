import { Schema } from "mongoose"
import { IImage } from "../types/db"

export const imageSchema = new Schema<IImage>({
  url: {
    type: String,
    required: false,
    default: "https://cdn-icons-png.flaticon.com/512/6596/6596121.png",
    //minlength: 14
  },
  alt: {
    type: String,
    required: false,
    default: "user avatar",
  //  minlength: 2,
    maxlength: 256
  }
})