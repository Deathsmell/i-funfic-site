import {NextFunction, Request, Response} from "express"
import {PassportStatic} from "passport"
import {User} from "../models";
import {IUser, Roles} from "../interfaces";
import {jwtStrategy, login, signUp} from "./passport.strategy";

export const configPassport = (passport: PassportStatic) => {

    passport.use("jwt", jwtStrategy)
    passport.use("login", login)
    passport.use("signup", signUp)

    passport.serializeUser<IUser, number>((user, done) => {
        if (typeof user === "object") {
            user.password = ""
            done(null, user.id)
        } else {
            console.log(user)
        }
    })

    passport.deserializeUser(function (id: number, done) {
        try {
            const userFromDB = User.findOne({where: {id}});
            done(null, userFromDB)
        } catch (e) {
            done(e)
        }
    });
}

export const ensureAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.status(401).json({message: "Please authenticate"})
    }
}

export const ensureAdmin = async (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        const user = await req.user as IUser;
        const isAdmin = user.roles?.includes(Roles.ADMIN);
        console.log(isAdmin)
        if (isAdmin) next()
        else {
            req.logout()
            res.status(403).send()
        }
    } else {
        res.status(401).json({message: "Please authenticate"})
    }

}

export const ensureCurrentUser = async (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        const user = await req.user as IUser;
        const {id: paramsId} = req.query as { id: string }
        const {id: bodyId} = req.body as { id: number }
        const equalId = user.id === Number(paramsId) || user.id === bodyId;
        console.log(equalId, user.id, paramsId)
        equalId ? next() : res.status(403).send()
    } else {
        res.status(401).json({message: "Please authenticate"})
    }
}