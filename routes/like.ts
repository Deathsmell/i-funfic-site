import {IRouter} from "express"
import { LikeController} from "../controllers";
import {DISLIKE_URL, I_LIKED_IT_URL, LIKE_URL} from "../api";
import {ensureAuthenticated} from "../config/passport";

export const likeRouter = (router: IRouter): void => {
    router.post(LIKE_URL,ensureAuthenticated,LikeController.like)
    router.post(DISLIKE_URL,ensureAuthenticated,LikeController.dislike)
    router.post(I_LIKED_IT_URL,ensureAuthenticated,LikeController.iLikedIt)
}