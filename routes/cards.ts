import { Router } from "express"
import { Card } from "../db/model/card.model"
import { verifyToken } from "../middleware/verify-token"
import { ApplicationError } from "../error/application-error"
import { verifyBusinessUser } from "../middleware/verify-businessUser"
import { validateBizNumber, validateCard } from "../middleware/validate-schema"
import { verifyRegisteredUser } from "../middleware/verify-registeredUser"
import { ICardInput } from "../db/types/db"
import { cardServices } from "../service/card.service"
import { verifyRegisteredUserOrAdmin } from "../middleware/verify-registeredUser-or-admin"
import { verifyRegisteredLikes } from "../middleware/verify-registeredLikes"
import { verifyAdmin } from "../middleware/verify-admin"

const router = Router()

router.get("/", async (req, res, next) => {
  try {
    const cards = await Card.find()
    return res.status(200).json(cards)
  } catch (e) {
    next(e)
  }
})

router.get("/my-cards", verifyToken, async (req, res, next) => {
  try {
    const userId = req.user?.id
    const cards = await Card.find({ user_id: userId })
    return res.status(200).json(cards)
  } catch (e) {
    next(e)
  }
})

router.get("/:id", async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.id)
    if (!card) {
      throw new ApplicationError(
        `Card with id ${req.params.id} not found`,
        404
      )
    }
    return res.status(200).json(card)
  } catch (e) {
    next(e)
  }
})

router.post("/", verifyBusinessUser, validateCard, async (req, res, next) => {
  try {
    const userId = req.user?.id
    const card = await Card.create({ ...req.body, user_id: userId })
    return res.status(201).json(card)
  } catch (e) {
    next(e)
  }
})

router.put("/:id", verifyRegisteredUser, async (req, res, next) => {
  try {
    const cardId = req.params.id
    const body = req.body as ICardInput
    await cardServices.updateCard(cardId, req.body)
    const card = await Card.findById(cardId)
    return res
      .status(200)
      .json({ message: "Card updated", updatedJson: body, card })
  } catch (e) {
    next(e)
  }
})
 


router.delete("/:id", verifyRegisteredUserOrAdmin, async (req, res, next) => {
  try {
    const id = req.params.id
    const card = await Card.findByIdAndDelete(id)
    if (!card) {
      throw new ApplicationError(`Card with id ${id} not found`, 404)
    }
    return res
      .status(200)
      .json({ message: `Card with id ${id} deleted`, card })
  } catch (e) {
    next(e)
  }
})

router.patch("/:id", verifyRegisteredLikes, async (req, res, next) => {
  try {
    const cardId = req.params.id;
    const userId = req.user?.id;

    const message = await cardServices.likeOrDislikeCard(cardId, userId!);
    const card = await Card.findById(cardId);
    return res.status(200).json({ message: message, card });
  } catch (e) {
    next(e);
  }
});

router.patch(
  "/bizNumber/:id",
  verifyAdmin,
  validateBizNumber,
  async (req, res, next) => {
    try {
      const id = req.params.id
      const card = await Card.findById(id)
      if (!card) {
        throw new ApplicationError(`Card with id ${id} not found`, 404)
      }
      const bizNum = req.body.bizNumber
      const bizNumUpdated = await cardServices.changeBizNumber(id, bizNum)
      return res.status(200).json({ message: bizNumUpdated, card })
    } catch (e) {
      next(e)
    }
  }
)

export default router