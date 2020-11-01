import express, {Application, Router} from "express";
import passport from "passport";
import cookie from "cookie-parser"
import session from "express-session"
import cors from "cors"
import {json, urlencoded} from "body-parser";
import {sequelize} from "./models";
import {configRouter} from "./routes";
import {configPassport} from "./config/passport";

declare var console: Console;

const app: Application = express();
const PORT: number = Number(process.env.PORT) || 5000;
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
    sequelize.authenticate().then(async () => {
        console.log("Connect DB")
        await sequelize.sync({force: true})
            .then(() => {
                console.log("Sequelize synced ...")
            })
            .catch((error: Error) => {
                console.log("Error", error)
            })
    }).catch(console.error)
    app.listen(PORT, () => {
        console.log(`App started on ${PORT} port`)
    })
})()
