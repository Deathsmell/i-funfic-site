import {Router} from "express"
import {UserApi} from '../api'
import UserController from "../controllers/UserController";

export const user = (router: Router) => {
    router.post(UserApi.CREATE, UserController.create)
}