import axiosInstance, {IFetchResponse} from "./fetch";
import {IRatingResponse, IResponse} from "../../../interfaces/IResponse";
import {I_SET_RATING_URL, RATING_URL} from "@api";


export const RatingApi = {
    setRating: async (userId: number, bookId: number, rating: number): IFetchResponse<IResponse> =>
        await axiosInstance.post(RATING_URL,{userId,bookId,rating}),
    iSetRating: async (userId: number, bookId: number): IFetchResponse<IRatingResponse> =>
        await axiosInstance.post(I_SET_RATING_URL,{userId,bookId}),
}