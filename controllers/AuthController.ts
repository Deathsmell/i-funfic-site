import {NextFunction, Request, Response} from "express"
import passport from "passport"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import {jwtSecret} from "../config/constants";
import {ICredentialState} from "../client/src/store/credential/credential.interfaces";
import {IUser} from "../interfaces";
import {sendMail} from "../config/mailsender";
import {BASE_URL, CLIENT_URL} from "../api";
import {IErrorResponse, IResponse} from "../interfaces/IResponse";
import {User} from "../models";
import {IUserFromDb} from "../interfaces/IUser";

const AuthController = {
    confirm: async (req: Request, res: Response<IResponse | IErrorResponse>) => {
        const {code, token} = req.query as { code: string, token: string };
        try {
            const {id, email} = jwt.verify(token, jwtSecret) as { id: string, email: string };
            const user = await User.findOne({where: {id}}) as IUserFromDb;
            if (user.email === email) {
                const compared = bcrypt.compareSync(email,code);
                if (compared) {
                    await User.update({confirm: true},{where: {id}})
                    res.status(200).redirect(`${CLIENT_URL}/login`)
                }
            } else {
                res.status(400).json({message: "Invalid credential information"})
            }
        } catch (e) {
            console.error(e)
            res.status(500).json({message: "Some error then confirm email"})
        }
    },
    login: async (req: Request, res: Response<ICredentialState>, next: NextFunction) => {
        passport.authenticate("login", {session: false}, async (err, user: IUser, info) => {
            try {
                if (err || !user) {
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
                            id: user.id,
                            image: user.image,
                            username: user.username
                        })
                    }
                )
            } catch (e) {
                console.error(e);
            }
        })(req, res, next)
    },
    registration: async (req: Request, res: Response, next: NextFunction) => {
        passport.authenticate("signup", {session: false}, async (err, user: IUser, info) => {
            if (user) {
                try {
                    const token = jwt.sign({id: user.id, email: user.email}, jwtSecret)
                    const codeConfirm = await bcrypt.hash(user.email, 12);
                    await sendMail(
                        user.email,
                        "Confirm email",
                        `${BASE_URL}/confirm?code=${codeConfirm}&token=${token}`
                    )
                } catch (e) {
                    res.status(500).json({message: "Some error then send confirm mail on user email"})
                }
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