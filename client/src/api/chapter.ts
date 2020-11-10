import axiosInstance, {IFetchResponse} from "./fetch"
import {
    CREATE_CHAPTER_URL,
    DELETE_CHAPTER_URL,
    GET_ALL_CHAPTERS_BY_BOOK_ID_URL,
    UPDATE_CHAPTER_URL
} from "@api";
import {IChapter} from "../../../interfaces";
import {IChapterResponse, IChaptersResponse, IResponse} from "../../../interfaces/IResponse";

export const ChapterApi = {
    createChapter: async (chapter: IChapter): IFetchResponse<IChapterResponse> =>
        await axiosInstance.post(CREATE_CHAPTER_URL, chapter),
    getAll: async (id: number): IFetchResponse<IChaptersResponse> =>
        await axiosInstance.get(GET_ALL_CHAPTERS_BY_BOOK_ID_URL, {params: {id}}),
    updateChapter: async (chapter: IChapter): IFetchResponse<IChapterResponse> =>
        await axiosInstance.post(UPDATE_CHAPTER_URL, chapter),
    deleteChapter: async (id: number): IFetchResponse<IResponse> =>
        await axiosInstance.delete(DELETE_CHAPTER_URL, {params: {id}}),
}