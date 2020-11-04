import {Request, Response} from "express"
import cloudinary from "../config/cloudinary"
import DatauriParser from "datauri/parser"

export interface ICloudinaryResponse {
    url?: string,
    message?: string
}

const CloudinaryController = {
    uploadImg: async (req: Request, res: Response<ICloudinaryResponse>) => {
        const img = req.files!.image;
        if (img) {
            const parser = new DatauriParser();
            const {content} = await parser.format(img!.name, img.data);
            if (content) {
                const {url} = await cloudinary.uploader.upload(content);
                res.status(200).json({url})
            } else {
                res.status(400).json({message: "Incorrect img"})
            }
        } else {
            res.status(400).json({message: "Incorrect img"})
        }
    }
}

export default CloudinaryController