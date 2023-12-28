import { ICardInput } from "../db/types/db"
import { ApplicationError } from "../error/application-error"
import { Card } from "../db/model/card.model"

const updateCard = async (id: string, reqBody: ICardInput) => {
  const card = await Card.findById(id)

  if (!card) throw new ApplicationError(`Card with id ${id} not found`, 404)

  const body = reqBody as Partial<ICardInput>
  const update = {} as Partial<ICardInput>

  if (body.title) update.title = body.title
  if (body.subtitle) update.subtitle = body.subtitle
  if (body.description) update.description = body.description
  if (body.phone) update.phone = body.phone
  if (body.email) update.email = body.email
  if (body.web) update.web = body.web
  if (body.image) update.image = body.image
  if (body.address) update.address = body.address

  const updateUser = await Card.findByIdAndUpdate(card, update, {
    new: true,
  })

  if (!updateUser)
    throw new ApplicationError(`Error updating card with id ${id}`, 500)
}

const likeOrDislikeCard = async (cardId: string, userId: string) => {
  const card = await Card.findById(cardId)
  if (!card) throw new ApplicationError(`Card with id ${cardId} not found`, 404)

    if (card?.likes.includes(userId)) {
      await Card.findByIdAndUpdate(
        cardId,
        { $pull: { likes: userId } },
        { new: true }
      )
      return "Like removed"
    }
    await Card.findByIdAndUpdate(
      cardId,
      { $push: { likes: userId } },
      { new: true }
  )
  return "Like added"
}

const changeBizNumber = async (cardId: string, bizNum: number) => {
  const allCards = await Card.find()

  if (allCards.map((card) => card.bizNumber !== bizNum)) {
    await Card.findByIdAndUpdate(
      cardId,
      { $set: { bizNumber: bizNum } },
      { new: true }
    )
    return `biz-card of card with id ${cardId} updated`
  }
  throw new ApplicationError(`biz-card of card with id ${cardId} already exists`, 400)
}

export const cardServices = { updateCard, likeOrDislikeCard, changeBizNumber }