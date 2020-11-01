import {createAxios} from "./fetch";
import {IUser} from "../../../interfaces";

export const CREATE_URL = "/user/create"

const axios = createAxios();

export const UserApi = {
    CREATE_URL: "/user/create",
    create: async (user: IUser) => await axios.post(CREATE_URL, user)
}