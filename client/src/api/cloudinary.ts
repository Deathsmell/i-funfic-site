import axiosInstance from "./fetch"
import {UPLOAD_IMG} from "@api"

export const CloudinaryApi = {
    upload: async (file: File) => {
        const formData = new FormData();
        formData.append("image", file)
        return await axiosInstance.post(UPLOAD_IMG, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
}