import axios, {IFetchResponse} from "./fetch"
import {CREATE_USER_URL, GET_ALL_USER_URL} from "@api"
import {IUser} from "../../../interfaces";
import {IErrorResponse, IUserResponse, IUsersResponse} from "../../../interfaces/IResponse";

export const UserApi = {
    create: async (user: IUser): IFetchResponse<IUserResponse | IErrorResponse> =>
        await axios.post(CREATE_USER_URL, user),

    getAllUsers: async (): IFetchResponse<IUsersResponse | IErrorResponse> =>
        await axios.get(GET_ALL_USER_URL),
}