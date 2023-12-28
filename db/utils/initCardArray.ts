import { ICardInput } from "../types/db"

export const initCards: ICardInput[] = [
  {
    title: "First New Card",
    subtitle: "Subtitle for first card",
    description: "Description for first card",
    phone: "050-3211235",
    email: "first@gmail.com",
    web: "http://www.google.com",
    image: {
      url: "https://www.picsum.photos/200/301",
      alt: "picsum",
    },
    address: {
      state: "IL",
      country: "Israel",
      city: "Tel Aviv",
      street: "Rothschild",
      houseNumber: 1,
      zip: 8920436,
    },
  },
  {
    title: "Second New Card",
    subtitle: "Subtitle for second card",
    description: "Description for second card",
    phone: "050-3211236",
    email: "second@gmail.com",
    web: "http://www.yahoo.com",
    image: {
      url: "https://www.picsum.photos/200/302",
      alt: "picsum",
    },
    address: {
      state: "IL",
      country: "Israel",
      city: "Haifa",
      street: "Herzl",
      houseNumber: 2,
      zip: 8920437,
    },
  },
  {
    title: "Third New Card",
    subtitle: "Subtitle for third card",
    description: "Description for third card",
    phone: "050-3211237",
    email: "third@gmail.com",
    web: "http://www.duckduckgo.com",
    image: {
      url: "https://www.picsum.photos/200/303",
      alt: "picsum",
    },
    address: {
      state: "IL",
      country: "Israel",
      city: "Jerusalem",
      street: "Jaffa",
      houseNumber: 3,
      zip: 8920438,
    },
  },
]