import {ADD_COMMENT, CREATE_COMMENT, DELETE_COMMENT, GET_COMMENTS_BY_BOOK_ID, SET_COMMENTS} from "./comments.constants";
import {IComment} from "../../../../interfaces";
import {IUserComment} from "../../../../interfaces/IComment";


export interface ICommentsState extends Array<IUserComment>{}

export interface ICommentAction {
    type: typeof ADD_COMMENT,
    comment: IUserComment
}

export interface ICommentsAction {
    type: typeof SET_COMMENTS,
    comments: IUserComment[]
}

export interface ICommentFetchAction {
    type: typeof CREATE_COMMENT,
    comment: IComment
}

export interface ICommentsFetchActionByBookId {
    type: typeof GET_COMMENTS_BY_BOOK_ID,
    id: number
}

export interface ICommentFetchById{
    type: typeof DELETE_COMMENT,
    id: number
}