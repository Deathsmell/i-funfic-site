import {Request, Response} from "express"
import {Rating} from "../models";
import {IRating} from "../interfaces/IRating";
import RatingService from "../services/RatingService";
import {IErrorResponse, IRatingResponse, IResponse} from "../interfaces/IResponse";

const RatingsController = {
    setRating: async (req: Request, res: Response<IResponse>) => {
        try {
            const {userId, bookId, rating} = req.body as IRating;
            await RatingService.setRating(userId,bookId,rating)
            res.status(200).json({message: `Successful passing grade`})
        } catch (e) {
            console.error(e)
            res.status(500).json({message: `Some error when passing grade: ${e.message}`})
        }
    },
    iSetRating: async (req: Request, res: Response<IRatingResponse | IErrorResponse>) => {
        try {
            const {userId, bookId} = req.body as { userId: number, bookId: number };
            const isSet = await Rating.findOne({where: {userId, bookId}}) as IRating || null;
            if (isSet) {
                res.status(200).json({set: true, rating: isSet.rating, message: `You seated rating`})
            } else {
                res.status(200).json({set: false, message: `You not seated rating`})
            }
        } catch (e) {
            console.error(e)
            res.status(500).json({message: `Some error when find you set rating: ${e.message}`})
        }
    },
}

export default RatingsController