import {Request, Response} from "express"
import {IBook} from "../interfaces";
import {Book, User} from "../models";
import {IErrorResponse, IProfileResponse, IResponse} from "../interfaces/IResponse";
import {IProfile} from "../interfaces/IProfile";

const AdminController = {
    blockUser: async (req: Request, res: Response<IResponse | IErrorResponse>) => {
        try {
            const {id} = req.body as { id: number };
            await User.update({blocked: true}, {where: {id}});
            res.status(200).send()
        } catch (e) {
            console.error(e)
            res.status(500).json({message: e.message})
        }
    },
    unblockUser: async (req: Request, res: Response<IResponse | IErrorResponse>) => {
        try {
            const {id} = req.body as { id: number };
            await User.update({blocked: false}, {where: {id}});
            res.status(200).json()
        } catch (e) {
            console.error(e)
            res.status(500).json({message: e.message})
        }
    },
    getUserProfile: async (req: Request, res: Response<IProfileResponse | IErrorResponse>) => {
        console.log("GET PROFILE")
        try {
            const {id} = req.query as { id: string };
            const {books, password, img, username, email, roles, confirm, blocked, id: userID} = await User.findOne({
                where: {id: Number(id)},
                include: Book
            }) as IProfile;
            res.status(200).json({
                books: books,
                user: {id:userID, blocked, confirm, roles, email, username, img, password},
                message: "Success get profile"
            })
        } catch (e) {
            console.error(e)
        }
    }
}

export default AdminController