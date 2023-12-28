import mongoose from "mongoose"

export type IRole = {
    name: string
}

export type IName = {
    first: string;
    middle: string;
    last: string;
}

export type IAddress = {
    country: string;
    state: string;
    city: string;
    street: string;
    houseNumber: number;
    zip?: number;
}

export type IImage = {
    url: string;
    alt: string;
}

export type IUser = {
    name: IName;
    isBusiness: boolean;
    phone: string;
    email: string;
    password: string;
    address: IAddress;
    image: IImage;
    isAdmin?: boolean;
    _id?: mongoose.Types.ObjectId;
}

export type ICardInput = {
    title: string;
    subtitle: string;
    description: string;
    phone: string;
    email: string;
    web: string;
    image: IImage;
    address: IAddress;
}

export type ICard = ICardInput & {
    bizNumber: number;
    likes: string[];
    user_id: mongoose.Types.ObjectId;
    createdAt: Date;
}

export type ILogin = {
    email: string;
    password: string;
}