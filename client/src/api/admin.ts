import axiosInstance, {IFetchResponse} from "./fetch"
import {
    BLOCK_USER_URL,
    GET_PROFILE_URL,
    IS_ADMIN_URL,
    REMOVE_ADMIN_ROLE_URL,
    SET_ADMIN_ROLE_URL,
    UNBLOCK_USER_URL,
    UPDATE_USER_PROFILE
} from "@api"
import {IProfileResponse, IResponse} from "../../../interfaces/IResponse";
import {IUser} from "../../../interfaces";

export const AdminApi = {
    isAdmin: async (): IFetchResponse<any> => await axiosInstance.post(IS_ADMIN_URL),
    getUserProfile: async (id: number): IFetchResponse<IProfileResponse> =>
        await axiosInstance.get(GET_PROFILE_URL, {params: {id}}),
    unblockUser: async (id: number): IFetchResponse<IResponse> =>
        await axiosInstance.post(UNBLOCK_USER_URL, {id}),
    blockUser: async (id: number): IFetchResponse<IResponse> =>
        await axiosInstance.post(BLOCK_USER_URL, {id}),
    setAdminRole: async (id: number): IFetchResponse<IResponse> =>
        await axiosInstance.post(SET_ADMIN_ROLE_URL, {id}),
    removeAdminRole: async (id: number): IFetchResponse<IResponse> =>
        await axiosInstance.post(REMOVE_ADMIN_ROLE_URL, {id}),
    updateUserProfile: async (user: IUser): IFetchResponse<IResponse> =>
        await axiosInstance.post(UPDATE_USER_PROFILE, {id: user.id, user}),
}
