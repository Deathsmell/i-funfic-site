import express, {Application, Router} from "express";
import path from "path"
import passport from "passport";
import session from "express-session"
import cors from "cors"
import fileUpload from "express-fileupload"
import {json, urlencoded} from "body-parser";
import {dbAuthenticate} from "./models";
import {configRouter} from "./routes";
import {configPassport} from "./config/passport";
import {isProduction, PORT} from "./config/constants";
import {Server} from "ws"
import http from "http"
import {configWebsocket} from "./config/websocket";

declare var console: Console;

const app: Application = express();
const router: Router = Router()


app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:5000"],
    credentials: true,
    optionsSuccessStatus: 200,
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",

}))
app.use(express.static("public"));
app.use(json());
app.use(urlencoded({extended: false}));
app.use(session({
    secret: "secret",
    cookie: {
        httpOnly: false,
        secure: false,
    },
    name: "JSONID"
}))
app.use(fileUpload({uriDecodeFileNames: true}))
app.use(passport.initialize());
app.use(passport.session())

configRouter(router);
configPassport(passport);
app.use(router);

const server = http.createServer(app)
const wss = new Server({
    server,
});
configWebsocket(wss);

if (process.env.NODE_ENV === "production") {
    console.log("production")
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))
    app.get('*', ((req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    }))
}
(function start() {
    console.log("Starting server...")
    dbAuthenticate(isProduction);
    server.listen(PORT, () => {
        console.log(`App started on ${PORT} port`)
    })
})()
