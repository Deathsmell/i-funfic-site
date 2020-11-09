import axios, {IFetchResponse} from "./fetch"
import {CREATE_USER_URL, GET_ALL_USER_URL, GET_CURRENT_USER_PROFILE_URL} from "@api"
import {IUser} from "../../../interfaces";
import {IProfileResponse, IUserResponse, IUsersResponse} from "../../../interfaces/IResponse";

export const UserApi = {
    create: async (user: IUser): IFetchResponse<IUserResponse> =>
        await axios.post(CREATE_USER_URL, user),

    getAllUsers: async (): IFetchResponse<IUsersResponse> =>
        await axios.get(GET_ALL_USER_URL),

    getProfile: async (id: number): IFetchResponse<IProfileResponse> =>
        await axios.get(GET_CURRENT_USER_PROFILE_URL,{params:{id}})

}