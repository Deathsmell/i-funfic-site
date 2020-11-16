import axiosInstance, {IFetchResponse} from "./fetch"
import {
    BOOK_CREATE_URL,
    BOOKS_BY_USER_ID_URL,
    DELETE_AUTHOR_BOOK_URL, GET_ALL_BOOKS_ORDER_RATING_BY_TAGS_URL,
    GET_ALL_BOOKS_ORDER_RATING_URL,
    GET_BOOK_URL, LIST_BOOKS_BY_TAGS_URL,
    LIST_BOOKS_URL,
    UPDATE_AUTHOR_BOOK_URL
} from "@api"
import {IBook} from "../../../interfaces";
import {IBookResponse, IBooksResponse, IResponse} from "../../../interfaces/IResponse";

export const BookApi = {
    getAll: async (): IFetchResponse<IBooksResponse> => await axiosInstance.get(LIST_BOOKS_URL),
    getAllByTags: async (tags: string[]): IFetchResponse<IBooksResponse> =>
        await axiosInstance.post(LIST_BOOKS_BY_TAGS_URL, {tags}),
    create: async (book: IBook): IFetchResponse<IBookResponse> =>
        await axiosInstance.post(BOOK_CREATE_URL, book),
    getByAuthorId: async (id: number): IFetchResponse<IBooksResponse> =>
        await axiosInstance.get(BOOKS_BY_USER_ID_URL, {params: {id}}),
    deleteById: async (id: number): IFetchResponse<IResponse> =>
        await axiosInstance.delete(DELETE_AUTHOR_BOOK_URL, {data: {id}}),
    update: async (book: IBook): IFetchResponse<IResponse> =>
        await axiosInstance.put(UPDATE_AUTHOR_BOOK_URL, book),
    getById: async (id: number): IFetchResponse<IBooksResponse> =>
        await axiosInstance.get(GET_BOOK_URL, {params: {id}}),
    getAllOrderRating: async (): IFetchResponse<IBooksResponse> =>
        await axiosInstance.get(GET_ALL_BOOKS_ORDER_RATING_URL),
    getAllOrderRatingByTags: async (tags: string[]): IFetchResponse<IBooksResponse> =>
        await axiosInstance.post(GET_ALL_BOOKS_ORDER_RATING_BY_TAGS_URL,{tags}),

}