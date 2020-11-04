import axios from "./fetch"
import {LIST_BOOKS_URL,BOOK_CREATE_URL} from "@api"
import {IBook} from "../../../interfaces";

export interface ICreateBookRequest {
    authorId?: number,
    annotation: string,
    title: string,
    image?: string
}

export const BookApi = {
    getAll: async () => await axios.get(LIST_BOOKS_URL),
    create: async (book: IBook) => await axios.post(BOOK_CREATE_URL,book)
}