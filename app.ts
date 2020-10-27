import express, {Application} from 'express';
import {json, urlencoded} from 'body-parser'

const app: Application = express()
const PORT: string | number = process.env.PORT || 5000

app.use(json())
app.use(urlencoded({extended: false}))

app.listen(PORT, () => {
    console.log(`App started on ${PORT} port`)
})