import axios from "axios";
import {HttpRequest, HttpResponse} from './types'

export const useHttp = () => {
    const request = async (request: HttpRequest): Promise<HttpResponse> => {
        let responseObject: HttpResponse;
        try {
            const response = await axios({
                ...request,
                baseURL: `http://localhost:${process.env.PORT || 5000}`
            })
            responseObject = {body: response.data, message: response.data.message, status: response.status}
        } catch (e) {
            responseObject = {message: e.message, status: e.status}
        }
        return responseObject
    }

    return {request}
}