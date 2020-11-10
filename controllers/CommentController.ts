import {Request, Response} from "express"
import {IComment, IUser} from "../interfaces";
import {Comment, User} from "../models";
import {IErrorResponse, IResponse, IUserCommentResponse, IUserCommentsResponse} from "../interfaces/IResponse";
import {ICommentModel, IUserComment} from "../interfaces/IComment";


const CommentController = {
    create: async (req: Request, res: Response<IUserCommentResponse | IErrorResponse>) => {
        const {comment} = req.body as { comment: IComment };
        try {
            const user = await User.findOne({where: {id: comment.userId}})
            let {id,text,bookId,userId,createdAt,updatedAt} = await Comment.create(comment) as ICommentModel;
            console.log(createdAt, typeof createdAt)
            const userComment: IUserComment = {
                id,
                text,
                userId,
                bookId,
                createdAt: createdAt,
                updatedAt: updatedAt,
                user: {email: user!.email, img: user!.img, username: user!.username}
            }
            console.log(userComment)
            res.status(200).json({comment: userComment, message: "Successful create comment"})
        } catch (e) {
            console.error(e)
            res.status(400).json({message: e.message})
        }
    },
    getCommentsByBookId: async (req: Request, res: Response<IUserCommentsResponse | IErrorResponse>) => {
        const {id} = req.query as { id: string };
        try {
            const exclude = ["password", "roles", "blocked", "confirm"] as Array<keyof IUser>;
            const comments = await Comment.findAll({
                where: {bookId: Number(id)},
                include: {
                    model: User,
                    attributes: {
                        exclude
                    }
                },
            }) as IComment[] as IUserComment[];
            res.status(200).json({comments, message: "Successful get comments by book id"})
        } catch (e) {
            console.error(e)
            res.status(400).json({message: e.message})
        }
    },
    deleteComment: async (req: Request, res: Response<IResponse | IErrorResponse>) => {
        const {id} = req.body as { id: number };
        try {
            await Comment.destroy({where: {bookId: id}});
            res.status(200).json({message: "Successful destroy by id"})
        } catch (e) {
            console.error(e)
            res.status(400).json({message: e.message})
        }
    },
}

export default CommentController