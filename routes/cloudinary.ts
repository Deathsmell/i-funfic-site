import {IRouter} from "express"
import {UPLOAD_IMG} from "../api";
import {CloudinaryController} from "../controllers";

export const cloudinaryRouter = (router: IRouter): void => {
    router.post(UPLOAD_IMG,CloudinaryController.uploadImg)
}