import axiosInstance, {IFetchResponse} from "./fetch";
import {THESAURUS_SEARCH_URL} from "@api";


export const ThesaurusApi = {
    search: async (word: string): IFetchResponse<any> =>
        await axiosInstance.get(THESAURUS_SEARCH_URL, {params: {word}})
}