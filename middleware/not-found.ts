import { RequestHandler } from "express"
import path from "path"

export const notFound: RequestHandler = (req, res, next) => {
    res.status(404).json({ message: `Not Found - ${req.originalUrl}` })
    res.sendFile(path.join(__dirname, "../../public/404.html"))
        
}  