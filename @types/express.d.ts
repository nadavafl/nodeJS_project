export type RequestUser = {
    id: string;
    email: string;
    isAdmin: boolean;
    isBusiness: boolean;
}

declare global {
    namespace Express {
        interface Request {
            user?: RequestUser
        }
    }
}