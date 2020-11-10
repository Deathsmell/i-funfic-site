import axiosInstance, {IFetchResponse} from "./fetch";
import {IComment} from "../../../interfaces";
import {CREATE_COMMENT_URL, GET_BOOK_COMMENTS_URL} from "@api";
import {IUserCommentResponse, IUserCommentsResponse} from "../../../interfaces/IResponse";

export const CommentApi = {
    create: async (comment: IComment):IFetchResponse<IUserCommentResponse> =>
        await axiosInstance.post(CREATE_COMMENT_URL,{comment}),
    getAllByBookId: async (id: number): IFetchResponse<IUserCommentsResponse> =>
        await axiosInstance.get(GET_BOOK_COMMENTS_URL,{params: {id}}),
}