import {Request} from "express"
import {Strategy as LocalStrategy} from "passport-local"
import {Strategy as CustomStrategy} from "passport-custom"
import {ExtractJwt, Strategy as JwtStrategy} from "passport-jwt"
import bcrypt from "bcrypt"
import {Op} from "sequelize";
import {User} from "../models";
import {RegistrationData} from "../client/src/store/auth/types";
import {IUser} from "../interfaces";

export interface IVerifiedCallback {
    (error: any, user?: any, info?: object): void;
}

export const signUp = new CustomStrategy(
    async (req: Request, done: IVerifiedCallback) => {
        console.log("SIGN UP STRATEGY")
        const {password, email, username} = <RegistrationData>req.body;
        const bcryptPassword = await bcrypt.hash(password, 12);
        const userFromDb = await User.findOne({
            where: {
                [Op.or]: [
                    {email},
                    {username}
                ]
            }
        });
        if (userFromDb) return done(null, false, {message: 'User exist'});
        const user = await User.create({
            username,
            email,
            password: bcryptPassword,
            confirm: false,
            blocked: false
        });
        return done(null, user, {message: 'Signup successful',});
    }
)

export const login = new LocalStrategy(
    {
        usernameField: 'username',
        passwordField: 'password'
    },
    async (username, password, done) => {
        console.log("LOGIN STATEGY")
        const user = await User.findOne({
            where: {
                [Op.or]: [
                    {email: username},
                    {username: username}
                ]
            }
        });
        if (!user) {
            return done(null, false, {message: 'User not found'});
        }

        const validate = await bcrypt.compare(password, user.password)
        if (!validate) {
            return done(null, false, {message: 'Wrong Password'});
        }

        const userData: IUser = {
            id: user.id,
            username: user.username,
            email: user.email,
            blocked: user.blocked,
            confirm: user.confirm,
            roles: user.roles,
            password: ""
        }
        return done(null, userData, {message: 'Logged in Successfully'});
    }
)

export const jwtStrategy = new JwtStrategy(
    {
        secretOrKey: "jwtSecret",
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    },
    async (jwt_payload, done) => {
        console.log("JWT STRATEGY")
        try {
            const user = await User.findOne({where: {id: jwt_payload.id}});
            if (user) {
                done(null, user)
            } else {
                done(null, false, {message: 'Not found or blocked'})
            }
        } catch (e) {
            done(e, false, {message: 'Jwt error'})
        }
    }
)
