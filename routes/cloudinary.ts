import {IRouter} from "express"
import {UPLOAD_IMG} from "../api";
import {CloudinaryController} from "../controllers";
import {ensureAuthenticated} from "../config/passport";

export const cloudinaryRouter = (router: IRouter): void => {
    router.post(UPLOAD_IMG,ensureAuthenticated,CloudinaryController.uploadImg)
}