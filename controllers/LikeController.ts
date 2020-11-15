import {Request, Response} from "express"
import {Op} from "sequelize"
import {Like} from "../models";
import {IErrorResponse, ILikeResponse} from "../interfaces/IResponse";
import {BodyLikeRequest} from "../interfaces/IAxiosRequest";


const LikeController = {
    like: async (req: Request, res: Response<ILikeResponse | IErrorResponse>) => {
        try {
            const {userId, chapterId} = req.body as BodyLikeRequest;
            await Like.create({userId, chapterId});
            res.status(200).json({message: "Successful liked"})
        } catch (e) {
            console.error(e)
            res.status(500).json({message: "Some error when liking"})
        }
    },
    dislike: async (req: Request, res: Response<ILikeResponse | IErrorResponse>) => {
        try {
            const {userId, chapterId} = req.body as BodyLikeRequest;
            await Like.destroy({where: {[Op.and]: [{userId}, {chapterId}]}});
            res.status(200).json({message: "Successful liked"})
        } catch (e) {
            console.error(e)
            res.status(500).json({message: "Some error when liking"})
        }
    },
    iLikedIt: async (req: Request, res: Response<ILikeResponse | IErrorResponse>) => {
        try {
            const {userId, chapterId} = req.body as BodyLikeRequest;
            const likes = await Like.findOne({where:{userId, chapterId}});
            if (likes) {
                res.status(200).json({liked: true, message: "You liked it"})
            } else {
                res.status(200).json({liked: false, message: "You liked it"})
            }
        } catch (e) {
            console.error(e)
            res.status(500).json({message: "Some error when liking"})
        }
    },
}

export default LikeController