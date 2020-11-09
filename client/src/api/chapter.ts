import axiosInstance from "./fetch"
import {
    CREATE_CHAPTER_URL,
    DELETE_CHAPTER_URL,
    GET_ALL_CHAPTERS_BY_BOOK_ID_URL,
    UPDATE_CHAPTER_URL
} from "@api";
import {IBookChapter} from "../../../interfaces";

export const ChapterApi = {
    createChapter: async (chapter: IBookChapter) => await axiosInstance.post(CREATE_CHAPTER_URL, chapter),
    getAll: async (id: number) => await axiosInstance.get(GET_ALL_CHAPTERS_BY_BOOK_ID_URL, {params: {id}}),
    updateChapter: async (chapter: IBookChapter) => await axiosInstance.post(UPDATE_CHAPTER_URL, chapter),
    deleteChapter: async (id: number) => await axiosInstance.delete(DELETE_CHAPTER_URL, {params: {id}})
}