import { Router } from "express"
import { ILogin, IUser } from "../db/types/db"
import { validateLogin, validateUpdateUser, validateUser } from "../middleware/validate-schema"
import { userServices } from "../service/user.service"
import { User } from "../db/model/user.model"
import { ApplicationError } from "../error/application-error"
import { verifyAdmin } from "../middleware/verify-admin"
import { verifyUserOrAdmin } from "../middleware/verify-user-or-admin"
import { verifyUser } from "../middleware/verify-user"
import { IUpdateIsBusiness } from "../@types/updateUser"

const router = Router()

router.post("/", validateUser, async (req, res, next) => {
  try {
    const body = req.body as IUser
    const savedUser = await userServices.saveUser(body)
    return res.status(201).json(savedUser)
  } catch (e) {
    next(e)
  }
})

router.post("/login", validateLogin, async (req, res, next) => {
  try {
    const { email, password } = req.body as ILogin
    const token = await userServices.login(email, password)
    return res.status(200).json({ token })
  } catch (e) {
    next(e);
  }
})

router.get("/", verifyAdmin, async (req, res, next) => {
  try {
    const users = await User.find()
    return res.status(200).json(users)
  } catch (e) {
    next(e)
  }
})

router.get("/:id", verifyUserOrAdmin, async (req, res, next) => {
  try {
    const id = req.params.id
    const user = await User.findById(id)
    if (!user) {
      throw new ApplicationError(`User with id ${id} not found`, 404)
    }
    return res.status(200).json(user)
  } catch (e) {
    next(e)
  }
})

router.put("/:id", verifyUser, async (req, res, next) => {
  try {
    const id = req.params.id
    const body = req.body as IUser
    await userServices.updateUser(id, req.body)
    const user = await User.findById(id)
    return res.status(200).json({ message: "Updatded", updatedJson: body, user })
  } catch (e) {
    next(e)
  }
}) 

router.patch("/:id", verifyUser, validateUpdateUser, async (req, res, next) => {
  try {
    const id = req.params.id
    const body = req.body as IUpdateIsBusiness
    await userServices.updateUser(id, req.body)
    const user = await User.findById(id)
    return res
      .status(200)
      .json({ message: "Updatded", updatedJson: body, user })
  } catch (e) {
    next(e)
  }
})

router.delete("/:id", verifyUserOrAdmin, async (req, res, next) => {
  try {
    const id = req.params.id
    const user = await User.findByIdAndDelete(id)
    if (!user) {
      throw new ApplicationError(`User with id ${id} not found`, 404)
    }
    return res.status(200).json({ message: `User with id ${id} deleted`, user})
  } catch (e) {
    next(e)
  }
})

export default router