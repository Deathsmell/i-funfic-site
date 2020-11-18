import {IUserFromDb} from "./IUser";
import {IBookFromDb} from "./IBook";
import {IUserComment} from "./IComment";
import {IChapterFromDb} from "./IChapter";
import {ITagItem} from "./ITagsItem";
import {GenresType} from "../config/genres";

export interface IResponse {
    message?: string
}

export interface IErrorResponse extends IResponse{}

export interface IUserResponse extends IResponse {
    user: IUserFromDb,
}

export interface IUsersResponse extends IResponse {
    users: IUserFromDb[]
}

export interface IBookResponse extends IResponse {
    book: IBookFromDb
}

export interface IBooksResponse extends IResponse {
    books: IBookFromDb[]
}

export interface IChapterResponse extends IResponse {
    chapter: IChapterFromDb
}

export interface IChaptersResponse extends IResponse {
    chapters: IChapterFromDb[]
}

export interface IProfileResponse extends IUserResponse,IBooksResponse {}

export interface IUserCommentResponse extends IResponse{
    comment: IUserComment
}

export interface IUserCommentsResponse extends IResponse{
    comments: IUserComment[]
}

export interface ILikeResponse extends IResponse {
    liked: boolean
}

export interface ITagsResponse extends IResponse {
    tags: ITagItem[]
}

export interface IRatingResponse extends IResponse {
    set: boolean,
    rating: number
}

export interface IGenresResponse extends IResponse {
    genres: GenresType
}