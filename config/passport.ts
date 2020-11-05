import {NextFunction, Request, Response} from "express"
import {PassportStatic} from "passport"
import {User} from "../models";
import {IUser} from "../interfaces";
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