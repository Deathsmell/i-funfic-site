import axios from "axios";
import {HttpRequest, HttpResponse} from './types'
import {BASE_URL} from "@api";

export const useHttp = () => {
    const request = async (request: HttpRequest): Promise<HttpResponse> => {
        let responseObject: HttpResponse;
        try {
            const response = await axios({
                ...request,
                baseURL: BASE_URL
            })
            responseObject = {body: response.data, message: response.data.message, status: response.status}
        } catch (e) {
            responseObject = {message: e.message, status: e.status}
        }
        return responseObject
    }

    return {request}
}