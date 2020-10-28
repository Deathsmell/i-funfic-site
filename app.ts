import express, {Application} from "express";
import {json, urlencoded} from "body-parser";
import sequelize from "./models";

const app: Application = express();
const PORT: number = Number(process.env.PORT) || 5000;

app.use(json());
app.use(urlencoded({extended: false}));


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
