import express, {Application, Router} from "express";
import passport from "passport";
import cookie from "cookie-parser"
import session from "express-session"
import cors from "cors"
import {json, urlencoded} from "body-parser";
import {dbAuthenticate} from "./models";
import {configRouter} from "./routes";
import {configPassport} from "./config/passport";

declare var console: Console;

const app: Application = express();
const PORT: number = Number(process.env.PORT) || 5000;
const isProduction = process.env.NODE_ENV === "production"
const router: Router = Router()

app.use(cors())
app.use(json());
app.use(cookie());
app.use(session({
    secret: "secret keyboard cat",
    cookie: {secure: false},
    resave: false,
    saveUninitialized: false
}))
app.use(urlencoded({extended: false}));
app.use(passport.initialize());
app.use(passport.session())

configRouter(router);
configPassport(passport);
app.use(router);




(function start() {
    console.log("Starting server...")
    dbAuthenticate(isProduction);
    app.listen(PORT, () => {
        console.log(`App started on ${PORT} port`)
    })
})()
