import {IRouter} from "express"
import {BLOCK_USER_URL, GET_PROFILE_URL, IS_ADMIN_URL, UNBLOCK_USER_URL} from '../api'
import {AdminController} from "../controllers";
import {ensureAdmin} from "../config/passport";

export const adminRouter = (router: IRouter): void => {
    router.post(IS_ADMIN_URL,ensureAdmin)
    router.post(BLOCK_USER_URL,ensureAdmin, AdminController.blockUser)
    router.post(UNBLOCK_USER_URL,ensureAdmin, AdminController.unblockUser)
    router.get(GET_PROFILE_URL,ensureAdmin, AdminController.getUserProfile)
}