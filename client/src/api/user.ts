import axiosInstance, {IFetchResponse} from "./fetch"
import {
    CREATE_USER_URL,
    GET_ALL_USER_URL,
    GET_CURRENT_USER_PROFILE_URL,
    UPDATE_CURRENT_USER_INFORMATION
} from "@api"
import {IUser} from "../../../interfaces";
import {IProfileResponse, IResponse, IUserResponse, IUsersResponse} from "../../../interfaces/IResponse";

export const UserApi = {
    create: async (user: IUser): IFetchResponse<IUserResponse> =>
        await axiosInstance.post(CREATE_USER_URL, user),

    getAllUsers: async (): IFetchResponse<IUsersResponse> =>
        await axiosInstance.get(GET_ALL_USER_URL),

    getProfile: async (id: number): IFetchResponse<IProfileResponse> =>
        await axiosInstance.get(GET_CURRENT_USER_PROFILE_URL, {params: {id}}),

    update: async (user: IUser): IFetchResponse<IResponse> =>
        await axiosInstance.post(UPDATE_CURRENT_USER_INFORMATION, {id:user.id,user}),
}