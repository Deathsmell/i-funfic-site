import {createAxios} from "./fetch"

const LIST_BOOKS_URL = "/book/all"

const axios = createAxios();

export const BookApi = {
    getAll: async () => await axios.get(LIST_BOOKS_URL)
}