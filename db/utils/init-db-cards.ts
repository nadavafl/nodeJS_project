import { ApplicationError } from "../../error/application-error"
import { Card } from "../model/card.model"
import { initCards } from "./initCardArray"

export const initDBcards = async () => {
  try {
    const count = await Card.estimatedDocumentCount()
    if (count !== 0) return
  } catch (e) {}
  try {
    const cards = initCards.forEach(async (card) => {
      const savedCard = await Card.create({ ...card, user_id: "6586eddb533c36fe0ae24bdc"})
      return savedCard
    })
  } catch (e) {
    throw new ApplicationError("Error creating cards", 500)
  }
} 