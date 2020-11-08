import {IRouter} from "express"
import {CREATE_USER_URL, DELETE_USER_URL, GET_ALL_USER_URL} from '../api'
import UserController from "../controllers/UserController";
import {ensureAdmin} from "../config/passport";

export const userRouter = (router: IRouter):void => {
    router.post(CREATE_USER_URL, UserController.create)
    router.get(GET_ALL_USER_URL,ensureAdmin, UserController.getAll)
    router.delete(DELETE_USER_URL,ensureAdmin, UserController.deleteUser)
}