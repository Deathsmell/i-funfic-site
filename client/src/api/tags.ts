import axiosInstance, {IFetchResponse} from "./fetch";
import {GET_TAGS_URL} from "@api";
import {ITagsResponse} from "../../../interfaces/IResponse";

export const TagsApi = {
    getTags: async ():IFetchResponse<ITagsResponse> => await axiosInstance.get(GET_TAGS_URL)
}
