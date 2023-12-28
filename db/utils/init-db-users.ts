import { ApplicationError } from "../../error/application-error"
import { userServices } from "../../service/user.service"
import { User } from "../model/user.model"
import { initUsers } from "./initUserArray"

export const initDBusers = async () => {
  try {
    const count = await User.estimatedDocumentCount()
    if (count !== 0) return
  } catch (e) {}
  try { 
  const users = initUsers.forEach(async (user) => {
    const savedUser = await userServices.saveUser(user)
    return savedUser
  })
  } catch (e) {
    throw new ApplicationError("Error creating users", 500)
  }
}