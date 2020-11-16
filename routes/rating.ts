import {IRouter} from "express"
import {I_SET_RATING_URL, RATING_URL} from "../api";
import {ensureAuthenticated} from "../config/passport";
import {RatingsController} from "../controllers";

export const ratingRouter = (router: IRouter): void => {
    router.post(RATING_URL,ensureAuthenticated,RatingsController.setRating)
    router.post(I_SET_RATING_URL,ensureAuthenticated,RatingsController.iSetRating)
}