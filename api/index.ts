import {isProduction, PORT} from "../config/constants";

export * from "./auth"
export * from "./book"
export * from "./cloudinary"
export * from "./user"
export * from "./chapter"
export * from "./admin"
export * from "./like"
export * from "./comment"
export * from "./tags"
export * from "./rating"
export * from "./thesaurus"

export const BASE_URL = isProduction ? "https://i-funfic.herokuapp.com" : `http://localhost:${PORT}`
export const CLIENT_URL = isProduction ? BASE_URL : "http://localhost:3000"
export const MAIN_PAGE_URL = "/"
