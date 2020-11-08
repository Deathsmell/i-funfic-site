import axios, {IFetchResponse} from "./fetch"
import {BLOCK_USER_URL, GET_PROFILE_URL, IS_ADMIN_URL, UNBLOCK_USER_URL} from "@api"
import {IProfileResponse, IResponse} from "../../../interfaces/IResponse";

export const AdminApi = {
    isAdmin: async (): IFetchResponse<any> => await axios.post(IS_ADMIN_URL),

    getUserProfile: async (id: number): IFetchResponse<IProfileResponse> =>
        await axios.get(GET_PROFILE_URL, {params: {id}}),
    unblockUser: async (id: number): IFetchResponse<IResponse> =>
        await axios.post(UNBLOCK_USER_URL, {id}),
    blockUser: async (id: number): IFetchResponse<IResponse> =>
        await axios.post(BLOCK_USER_URL, {id}),
}
