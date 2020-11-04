import express, {Application, Router} from "express";
import passport from "passport";
import cookie from "cookie-parser"
import session from "express-session"
import cors from "cors"
import fileUpload from "express-fileupload"
import {json, urlencoded} from "body-parser";
import {dbAuthenticate} from "./models";
import {configRouter} from "./routes";
import {configPassport} from "./config/passport";
import {PORT,isProduction} from "./config/constants";

declare var console: Console;

const app: Application = express();
const router: Router = Router()

app.use(cors())
app.use(fileUpload({uriDecodeFileNames:true}))
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
