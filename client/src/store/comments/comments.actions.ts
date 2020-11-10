import {IComment} from "../../../../interfaces";
import {
    ICommentAction,
    ICommentFetchAction,
    ICommentsAction,
    ICommentsFetchActionByBookId
} from "./comments.interfaces";
import {ADD_COMMENT, CREATE_COMMENT, GET_COMMENTS_BY_BOOK_ID, SET_COMMENTS} from "./comments.constants";
import {IUserComment} from "../../../../interfaces/IComment";


export const createComment = (comment: IComment): ICommentFetchAction => ({
    type: CREATE_COMMENT,
    comment: comment
})

export const getCommentsByBookId = (id: number): ICommentsFetchActionByBookId => ({
    type: GET_COMMENTS_BY_BOOK_ID,
    id: id
})

export const addComment = (comment: IUserComment): ICommentAction => ({
    type: ADD_COMMENT,
    comment: comment
})

export const setComments = (comments: IUserComment[]):ICommentsAction => ({
    type: SET_COMMENTS,
    comments: comments
})