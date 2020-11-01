import {NextFunction, Request, Response} from "express"
import passport from "passport"
import jwt from "jsonwebtoken"
import {jwtSecret} from "../config/constants";
import {IAuthorised} from "../client/src/store/auth/login/types";

const AuthController = {
    login: async (req: Request, res: Response<IAuthorised>, next: NextFunction) => {
        passport.authenticate("login",{session: false}, async (err, user, info) => {
            try {
                if (err) {
                    res.status(401).json(info)
                }

                req.login(
                    user,
                    {},
                    async err => {
                        if (err) return next(err)
                        console.log("LOGIN CONTROLLER",user)
                        const token = jwt.sign(user, jwtSecret)
                        return res.json({token: token, authorised: true})
                    }
                )
            } catch (e) {

            }
        })(req, res, next)
    },
    registration: async (req: Request, res: Response, next: NextFunction) => {
        passport.authenticate("signup",{session: false},async (err,user,info) => {
            console.log("SIGNUP CONTROLLER", user)
            if (user) {
                res.status(201).json(info)
            } else {
                res.status(401).json(info)
            }
        })(req,res,next)
    }
}

export default AuthController