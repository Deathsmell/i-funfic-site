import cloudinary from "cloudinary";
import {cloudinaryOptions} from "./secret";

type ICloudinary = typeof cloudinary.v2;
export const configCloudinary = (cloudinary: ICloudinary):ICloudinary => {
    cloudinary.config(cloudinaryOptions)
    return cloudinary
}