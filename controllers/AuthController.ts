import {NextFunction, Request, Response} from "express"
import passport from "passport"
import jwt from "jsonwebtoken"
import {jwtSecret} from "../config/constants";
import {ICredentialState} from "../client/src/store/credential/credential.interfaces";
import {IUser} from "../interfaces";

const AuthController = {
    login: async (req: Request, res: Response<ICredentialState>, next: NextFunction) => {
        passport.authenticate("login", {session: false}, async (err, user: IUser, info) => {
            try {
                if (err) {
                    res.status(401).json(info)
                }

                req.login(
                    user,
                    {},
                    async err => {
                        if (err) return next(err)
                        console.log("LOGIN CONTROLLER", user)
                        const token = jwt.sign(user, jwtSecret)
                        return res.json({
                            token: token,
                            authorised: true,
                            roles: user.roles,
                            id: user.id!,
                            img: user.img,
                            username: user.username
                        })
                    }
                )
            } catch (e) {

            }
        })(req, res, next)
    },
    registration: async (req: Request, res: Response, next: NextFunction) => {
        passport.authenticate("signup", {session: false}, async (err, user, info) => {
            console.log("SIGNUP CONTROLLER", user)
            if (user) {
                res.status(201).json(info)
            } else {
                res.status(401).json(info)
            }
        })(req, res, next)
    },
    logout: (req: Request, res: Response) => {
        console.log("LOGOUT CONTROLLER")
        console.log(req.user);
        req.logout();
        res.status(200).send()
    }
}

export default AuthController