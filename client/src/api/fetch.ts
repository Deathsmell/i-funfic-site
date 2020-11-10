import axios, {AxiosError, AxiosResponse} from "axios";
import {BASE_URL, MAIN_PAGE_URL} from "@api";
import {IResponse} from "../../../interfaces/IResponse";

export type IFetchResponse<T extends IResponse> = Promise<AxiosResponse<T>>

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

axiosInstance.interceptors.response.use(
    ((response) => response),
    ((error: AxiosError) => {
        const forbidden = error.response?.status === 403;
        if (forbidden) {
            window.location.href = MAIN_PAGE_URL
        }
        return Promise.reject(error)
    })
)

export default axiosInstance