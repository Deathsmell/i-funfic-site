import {NextFunction, Request, Response} from "express"
import passport from "passport"
import jwt from "jsonwebtoken"
import {jwtSecret} from "../config/constants";
import {ICredentialState} from "../client/src/store/credential/credential.interfaces";
import {IUser} from "../interfaces";

const AuthController = {
    login: async (req: Request, res: Response<ICredentialState>, next: NextFunction) => {
        passport.authenticate("login", {session: false }, async (err, user: IUser, info) => {
            try {
                if (err) {
                    res.status(401).json(info)
                }

                req.login(
                    user,
                    async err => {
                        if (err) {
                            return next(err)
                        }
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
                console.log(e);
            }
        })(req, res, next)
    },
    registration: async (req: Request, res: Response, next: NextFunction) => {
        passport.authenticate("signup", {session: false}, async (err, user, info) => {
            if (user) {
                res.status(201).json(info)
            } else {
                res.status(401).json(info)
            }
        })(req, res, next)
    },
    logout: (req: Request, res: Response) => {
        req.logout();
        res.status(200).send()
    },
    checkSuccess: async (req: Request, res: Response) => {
        const user = await req.user;
        res.status(200).json({user})
    }
}

export default AuthController