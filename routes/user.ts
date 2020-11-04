import {IRouter} from "express"
import {CREATE_URL} from '../api'
import UserController from "../controllers/UserController";

export const userRouter = (router: IRouter):void => {
    router.post(CREATE_URL, UserController.create)
}