import { IUser } from "../types/db"

export const initUsers: IUser[] = [
  {
    name: {
      first: "John",
      middle: "Doe",
      last: "Smith",
    },
    phone: "0522345567",
    email: "jds@email.com",
    password: "John!123John",
    image: {
      url: "https://www.picsum.photos/200/300",
      alt: "picsum",
    },
    address: {
      state: "New York",
      country: "US",
      city: "New York",
      street: "5th Avenue",
      houseNumber: 5,
      zip: 8920435,
    },
    isBusiness: false,
  },
  {
    name: {
      first: "Alice",
      middle: "Ai",
      last: "Anderson",
    },
    phone: "0532345568",
    email: "alicea@email.com",
    password: "Alice!123Alice",
    image: {
      url: "https://www.picsum.photos/200/301",
      alt: "picsum",
    },
    address: {
      state: "California",
      country: "US",
      city: "Los Angeles",
      street: "Hollywood Blvd",
      houseNumber: 2,
      zip: 90028,
    },
    isBusiness: true,
  },
  {
    name: {
      first: "Bob",
      middle: "Bi",
      last: "Baker",
    },
    phone: "0542345569",
    email: "bobb@email.com",
    password: "Bob!123Bob",
    image: {
      url: "https://www.picsum.photos/200/302",
      alt: "picsum",
    },
    address: {
      state: "Texas",
      country: "US",
      city: "Dallas",
      street: "Main St",
      houseNumber: 3,
      zip: 75201,
    },
    isBusiness: true,
    isAdmin: true,
  }
]