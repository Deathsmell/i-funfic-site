import {IUser} from "./IUser";
import {CommentModel} from "../models/Comment.model";
import {ICommentContent, IModelOptions} from "./InterfaceUtils";

export interface IComment {
    id?: number,
    userId: number,
    bookId: number,
    text: string,
}

export interface IModelFromDb extends IModelOptions<CommentModel>{
    id: number,
}

export interface ICommentModel extends ICommentContent<IComment>, IModelFromDb{}

export interface IUserComment extends ICommentModel{
    user: Pick<IUser, "username" | "img" | "email">,
}