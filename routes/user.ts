import {Router} from "express"
import {UserApi} from './types'
import UserController from "../controllers/UserController";

export const user = (router: Router) => {
    router.post(UserApi.CREATE, UserController.create)
}