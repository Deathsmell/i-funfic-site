import axios from "axios";
import {BASE_URL} from "@api";

const createAxios = () => axios.create({
    baseURL: BASE_URL,
})

export default createAxios()