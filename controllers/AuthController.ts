import {NextFunction, Request, Response} from "express"
import passport from "passport"
import jwt from "jsonwebtoken"
import {jwtSecret} from "../config/constants";
import {ICredentialState} from "../client/src/store/credential/credential.interfaces";
import {IUser} from "../interfaces";

const AuthController = {
    login: async (req: Request, res: Response<ICredentialState>, next: NextFunction) => {
        passport.authenticate("login", {session: false }, async (err, user: IUser, info) => {
            console.log(info)
            try {
                if (err) {
                    res.status(401).json(info)
                }

                req.login(
                    user,
                    async err => {
                        if (err) {
                            console.log("ERROR", err)
                            return next(err)
                        }
                        console.log("LOGIN CONTROLLER", user)
                        const token = jwt.sign(user, jwtSecret)
                        console.log("LOGINED USER", req.user);
                        console.log("COOKIE", req.cookies)
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
                console.log(e);
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
        req.logout();
        console.log(req.isAuthenticated());
        res.status(200).send()
    }
}

export default AuthController