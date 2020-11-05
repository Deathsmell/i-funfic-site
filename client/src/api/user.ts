import axios from "./fetch"
import {CREATE_URL} from "@api"
import {IUser} from "../../../interfaces";

export const UserApi = {
    CREATE_URL: "/user/create",
    create: async (user: IUser) => await axios.post(CREATE_URL, user)
}