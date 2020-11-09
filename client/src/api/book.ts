import axios, {IFetchResponse} from "./fetch"
import {
    BOOK_CREATE_URL,
    BOOKS_BY_USER_ID_URL,
    DELETE_AUTHOR_BOOK_URL,
    GET_BOOK_URL,
    LIST_BOOKS_URL,
    UPDATE_AUTHOR_BOOK_URL
} from "@api"
import {IBook} from "../../../interfaces";
import {IBookResponse, IBooksResponse, IResponse} from "../../../interfaces/IResponse";

export const BookApi = {
    getAll: async (): IFetchResponse<IBooksResponse> => await axios.get(LIST_BOOKS_URL),
    create: async (book: IBook): IFetchResponse<IBookResponse> =>
        await axios.post(BOOK_CREATE_URL, book),
    getByAuthorId: async (id: number): IFetchResponse<IBooksResponse> =>
        await axios.get(BOOKS_BY_USER_ID_URL, {params: {id}}),
    deleteById: async (id: number): IFetchResponse<IResponse> =>
        await axios.delete(DELETE_AUTHOR_BOOK_URL, {data: {id}}),
    update: async (book: IBook): IFetchResponse<IResponse> =>
        await axios.put(UPDATE_AUTHOR_BOOK_URL, book),
    getById: async (id: number):IFetchResponse<IBooksResponse> =>
        await axios.get(GET_BOOK_URL, {params: {id}})
}