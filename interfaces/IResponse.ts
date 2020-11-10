import {IUser} from "./IUser";
import {IBook, IBookChapter} from "./IBook";
import {IUserComment} from "./IComment";

export interface IResponse {
    message?: string
}

export interface IErrorResponse extends IResponse{}

export interface IUserResponse extends IResponse {
    user: IUser,
}

export interface IUsersResponse extends IResponse {
    users: IUser[]
}

export interface IBookResponse extends IResponse {
    book: IBook
}

export interface IBooksResponse extends IResponse {
    books: IBook[]
}

export interface IChapterResponse extends IResponse {
    chapter: IBookChapter
}

export interface IChaptersResponse extends IResponse {
    chapters: IBookChapter[]
}

export interface IProfileResponse extends IUserResponse,IBooksResponse {}

export interface IUserCommentResponse extends IResponse{
    comment: IUserComment
}

export interface IUserCommentsResponse extends IResponse{
    comments: IUserComment[]
}