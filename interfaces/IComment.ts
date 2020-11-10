import {IUser} from "./IUser";

export interface IComment {
    id?: number,
    userId: number,
    bookId: number,
    text: string,
    updatedAt?: string
    createdAt?: string
}

export interface ICommentFromDb extends Required<IComment>{}

export interface IUserComment extends ICommentFromDb{
    user: Pick<IUser, "username" | "image" | "email">,
}