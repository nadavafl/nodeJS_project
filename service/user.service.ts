import  jwt  from 'jsonwebtoken'
import { User } from "../db/model/user.model"
import { IUser } from "../db/types/db"
import bcrypt from 'bcrypt'
import { ApplicationError } from '../error/application-error'

const saveUser = async (userData: IUser) => {
    const user = new User(userData)
    user.password = await bcrypt.hash(user.password, 12)
    const savedUser = await user.save()
    return savedUser
}

const getSecret = () => process.env.JWT_SECRET ?? "secret"

const login = async (email: string, password: string) => {  
    const user = await User.findOne({ email })
    if (!user) {
        throw new ApplicationError("Email or password dont match", 401)
  }
  
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        throw new ApplicationError("Email or password dont match", 401)
    }
    return jwt.sign({ email, id: user._id, isBusiness: user.isBusiness, isAdmin: user.isAdmin }, getSecret())
}

const updateUser = async (id: string, reqBody:IUser) => { 
    const user = await User.findById(id)
    if (!user) throw new ApplicationError(`User with id ${id} not found`, 404)

    const body = reqBody as Partial<IUser>
    const update = {} as Partial<IUser>

    if (body.name) update.name = body.name
    if (body.email) update.email = body.email
    if (body.address) update.address = body.address
    if (body.image) update.image = body.image
    if (body.phone) update.phone = body.phone
    if (body.isBusiness !== undefined) update.isBusiness = body.isBusiness
    if (body.password) {
      const hashedPassword = await bcrypt.hash(body.password, 12)
      update.password = hashedPassword
    }

    const updateUser = await User.findByIdAndUpdate(user, update, {
      new: true,
    })
    if (!updateUser)
      throw new ApplicationError(`Error updating user with id ${id}`, 500)
}

export const userServices = { saveUser, login, updateUser }