import axios, {AxiosResponse} from "axios";
import {BASE_URL} from "@api";
import {IResponse} from "../../../interfaces/IResponse";

export type IFetchResponse<T extends IResponse> = Promise<AxiosResponse<T>>

export default axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
})