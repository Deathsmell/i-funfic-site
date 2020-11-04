import {PassportStatic} from "passport";
import {User} from "../models";
import {IUser} from "../interfaces";
import {jwtStrategy, login, signUp} from "./passport.strategy";

export const configPassport = (passport: PassportStatic) => {

    passport.use("jwt",jwtStrategy)
    passport.use("login", login)
    passport.use("signup", signUp)

    passport.serializeUser<IUser,IUser>((user, done) => {
        console.log("SERIALASER", user.username, user.password)
        if (typeof user === "object"){
            user.password = ""
            done(null, user)
        } else {
            console.log(user)
        }
    })

    passport.deserializeUser(function (user: IUser, done) {
        console.log("DESIRIALISER", user)
        try {
            const userFromDB = User.findOne({where: {id: user.id}});
            done(null,userFromDB)
        } catch (e) {
            done(e)
        }
    });
}