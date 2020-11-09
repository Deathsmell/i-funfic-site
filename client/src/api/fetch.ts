import axios, {AxiosResponse,AxiosError} from "axios";
import {BASE_URL, MAIN_PAGE_URL} from "@api";
import {IResponse} from "../../../interfaces/IResponse";

export type IFetchResponse<T extends IResponse> = Promise<AxiosResponse<T>>

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

axiosInstance.interceptors.response.use(((v) => {
    return v
}),((error:AxiosError<any>) => {
    const forbidden = error.response?.status === 403;
    if (forbidden){
        window.location.href = MAIN_PAGE_URL
    }
    return Promise.reject(error)
}))


export default axiosInstance