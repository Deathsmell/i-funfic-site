import {NextFunction, Request, Response} from "express"

const AuthController = {
    login: async (req: Request, res: Response, next: NextFunction) => {
        const body = req.body;
        console.log(body)
        if (body) {
            res.status(200).json({
                authorize: true,
                token: "jwtToken"
            })
        }
    },
    registration: async (req: Request, res: Response, next: NextFunction) => {
        const body = req.body;
        console.log(body)
        res.status(200).json()
    }
}

export default AuthController