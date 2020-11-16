import {NextFunction, Request, Response} from "express"
import {PassportStatic} from "passport"
import {User} from "../models";
import {IUser, Roles} from "../interfaces";
import {jwtStrategy, login, signUp} from "./passport.strategy";
import {isAdmin} from "../utils/adminUtils";
import {IErrorResponse} from "../interfaces/IResponse";
import {IUserFromDb} from "../interfaces/IUser";

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

    passport.deserializeUser(async (
        id: number,
        done: (
            err?: any,
            user?: IUserFromDb | boolean,
            info?: { message: string }
        ) => void) => {
        try {
            const userFromDB = await User.findOne({where: {id}}) as IUserFromDb | null;
            if (userFromDB) done(null, userFromDB)
            else done(null,false)
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

export const ensureCurrentUser = async (req: Request, res: Response<IErrorResponse>, next: NextFunction) => {
    if (req.isAuthenticated()) {
        const user = await req.user as IUser;
        const {id: paramsId} = req.query as { id: string }
        const {id: bodyId} = req.body as { id: number }
        const equalId = user.id === Number(paramsId) || user.id === bodyId;
        if (equalId) {
            next()
        } else {
            isAdmin(user.roles) ? next() : res.status(403).json({message: "Error action. You haven't do it"})
        }
    } else {
        res.status(401).json({message: "Please authenticate"})
    }
}