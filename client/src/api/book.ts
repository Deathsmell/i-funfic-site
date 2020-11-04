import axios from "./fetch"
import {LIST_BOOKS_URL} from "@api"

export const BookApi = {
    getAll: async () => await axios.get(LIST_BOOKS_URL)
}