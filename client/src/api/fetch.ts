import axios from "axios";

export const BASE_URL = "http://localhost:5000"
export const MAIN_PAGE_URL = "/"

export const createAxios = () => axios.create({
    baseURL: BASE_URL,
})