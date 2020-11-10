import {Request, Response} from "express"
import {IComment, IUser} from "../interfaces";
import {Comment, User} from "../models";
import {IErrorResponse, IResponse, IUserCommentResponse, IUserCommentsResponse} from "../interfaces/IResponse";
import {ICommentFromDb, IUserComment} from "../interfaces/IComment";
import {BodyIdRequest, ParamIdRequest} from "../interfaces/IAxiosRequest";
import {IUserFromDb} from "../interfaces/IUser";


const CommentController = {
    create: async (req: Request, res: Response<IUserCommentResponse | IErrorResponse>) => {
        const {comment} = req.body as { comment: IComment };
        try {
            const user = await User.findOne({where: {id: comment.userId}}) as IUserFromDb | null
            if (user) {
                let {id, text, bookId, userId, createdAt, updatedAt} =
                    await Comment.create(comment) as ICommentFromDb;
                const userComment: IUserComment = {
                    id,
                    text,
                    userId,
                    bookId,
                    createdAt: createdAt,
                    updatedAt: updatedAt,
                    user: {email: user.email, image: user.image, username: user.username}
                }
                res.status(200).json({comment: userComment, message: "Successful create comment"})
            } else {
                res.status(400).json({message: "Some error when create comment. User not exist"})
            }
        } catch (e) {
            console.error(e)
            res.status(500).json({message: e.message})
        }
    },
    getCommentsByBookId: async (req: Request, res: Response<IUserCommentsResponse | IErrorResponse>) => {
        const {id} = req.query as ParamIdRequest;
        try {
            const exclude = ["password", "roles", "blocked", "confirm"] as Array<keyof IUser>;
            const comments = await Comment.findAll({
                where: {bookId: Number(id)},
                include: {model: User, attributes: {exclude}},
            }) as IComment[] as IUserComment[];
            res.status(200).json({comments, message: "Successful get comments by book id"})
        } catch (e) {
            console.error(e)
            res.status(500).json({message: e.message})
        }
    },
    deleteComment: async (req: Request, res: Response<IResponse | IErrorResponse>) => {
        const {id} = req.body as BodyIdRequest;
        try {
            await Comment.destroy({where: {bookId: id}});
            res.status(200).json({message: "Successful destroy by id"})
        } catch (e) {
            console.error(e)
            res.status(500).json({message: e.message})
        }
    },
}

export default CommentController