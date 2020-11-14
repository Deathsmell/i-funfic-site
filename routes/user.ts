import {IRouter} from "express"
import {
    CREATE_USER_URL,
    DELETE_USER_URL,
    GET_ALL_USER_URL,
    GET_CURRENT_USER_PROFILE_URL,
    UPDATE_CURRENT_USER_INFORMATION
} from '../api'
import UserController from "../controllers/UserController";
import {ensureAdmin, ensureCurrentUser} from "../config/passport";

export const userRouter = (router: IRouter): void => {
    router.post(CREATE_USER_URL, UserController.create)
    router.post(UPDATE_CURRENT_USER_INFORMATION, ensureCurrentUser, UserController.updateUser)
    router.get(GET_ALL_USER_URL, ensureAdmin, UserController.getAll)
    router.get(GET_CURRENT_USER_PROFILE_URL, ensureCurrentUser, UserController.getProfile)
    router.delete(DELETE_USER_URL, ensureAdmin, UserController.deleteUser)
}