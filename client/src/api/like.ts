import axiosInstance, {IFetchResponse} from "./fetch";
import {DISLIKE_URL, I_LIKED_IT_URL, LIKE_URL} from "@api";
import {ILikeResponse} from "../../../interfaces/IResponse";

export const LikeApi = {
    like: async (userId: number, chapterId: number): IFetchResponse<ILikeResponse> =>
        await axiosInstance.post(LIKE_URL, {userId, chapterId}),
    dislike: async (userId: number, chapterId: number): IFetchResponse<ILikeResponse> =>
        await axiosInstance.post(DISLIKE_URL, {userId, chapterId}),
    iLikedIt: async (userId: number, chapterId: number): IFetchResponse<ILikeResponse> =>
        await axiosInstance.post(I_LIKED_IT_URL, {userId, chapterId}),
}