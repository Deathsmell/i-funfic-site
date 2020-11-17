import {Request} from "express"
import {Strategy as LocalStrategy} from "passport-local"
import {Strategy as CustomStrategy} from "passport-custom"
import {ExtractJwt, Strategy as JwtStrategy} from "passport-jwt"
import bcrypt from "bcrypt"
import {Op} from "sequelize";
import {User} from "../models";
import {IRegistrationData} from "../client/src/store/credential/credential.interfaces";
import {IUser} from "../interfaces";
import {IVerifiedCallback} from "./interfaces";


export const signUp = new CustomStrategy(
    async (req: Request, done: IVerifiedCallback) => {
        const {password, email, username} = <IRegistrationData>req.body;
        const bcryptPassword = await bcrypt.hash(password, 12);
        const userFromDb = await User.findOne({
            where: {
                [Op.or]: [
                    {email: email.toLowerCase()},
                    {username: username.toLowerCase()}
                ]
            }
        });
        if (userFromDb) return done(null, false, {message: 'User exist'});
        const user = await User.create({
            username: username.toLowerCase(),
            email: email.toLowerCase(),
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
        const user = await User.findOne({
            where: {
                [Op.or]: [
                    {email: username.toLowerCase()},
                    {username: username.toLowerCase()}
                ]
            }
        });
        if (!user) {
            console.error('User not found')
            return done(null, false, {message: 'User not found'});
        }

        if (!user.confirm){
            console.error("User not confirm email")
            return done(null, false, {message: "User not confirm email"})
        }

        if (user.blocked) {
            console.error("User blocked")
            return done(null, false, {message: "User blocked"})
        }

        const validate = await bcrypt.compare(password, user.password)
        if (!validate) {
            console.error('Wrong Password')
            return done(null, false, {message: 'Wrong Password'});
        }

        const userData: IUser = {
            id: user.id,
            username: user.username,
            email: user.email,
            blocked: user.blocked,
            confirm: user.confirm,
            roles: user.roles,
            image: user.image,
            password: ""
        }
        return done(null, userData, { message: 'Logged in Successfully' });
    }
)


export const jwtStrategy = new JwtStrategy(
    {
        secretOrKey: "jwtSecret",
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    },
    async (jwt_payload, done) => {
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


