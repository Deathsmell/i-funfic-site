import {Request, Response} from "express"
import {IUser, Roles} from "../interfaces";
import {Book, User} from "../models";
import {IErrorResponse, IProfileResponse, IResponse} from "../interfaces/IResponse";
import {IProfile} from "../interfaces/IProfile";
import {UserModel} from "../models/User.model";
import {isAdmin} from "../utils/adminUtils";

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
        try {
            const {id} = req.query as { id: string };
            const {books, password, img, username, email, roles, confirm, blocked, id: userID} = await User.findOne({
                where: {id: Number(id)},
                include: Book
            }) as IProfile;
            res.status(200).json({
                books: books,
                user: {id: userID, blocked, confirm, roles, email, username, img, password},
                message: "Success get profile"
            })
        } catch (e) {
            console.error(e)
        }
    },
    setAdminRole: async (req: Request, res: Response<IResponse | IErrorResponse>) => {
        try {
            const {id} = req.body as { id: number };
            const user = await User.findOne({where: {id}}) as IUser & UserModel;
            if (!isAdmin(user.roles)) {
                user.roles ? user.roles.push(Roles.ADMIN) : user.roles = [Roles.ADMIN]
                user.save({fields: ["roles"]})
            } else if (user.roles) {
                res.status(400).json({message: "Updating dont needed"})
            }
            res.status(200).json({message: "Successful updated"})
        } catch (e) {
            console.error(e.message)
            res.status(400).json({message: "Some error when set admin role"})
        }
    },
    removeAdminRole: async (req: Request, res: Response<IResponse | IErrorResponse>) => {
        try {
            const {id} = req.body as { id: number };
            const user = await User.findOne({where: {id}}) as IUser & UserModel;
            if (user.roles && isAdmin(user.roles)) {
                user.roles = [Roles.USER]
                user.save({fields: ["roles"]})
            } else if (user.roles) {
                res.status(400).json({message: "Updating dont needed"})
            }
            res.status(200).json({message: "Successful updated"})
        } catch (e) {
            console.error(e.message)
            res.status(400).json({message: "Some error when remove admin role"})
        }
    },
    updateUserProfile: async (req: Request, res: Response<IResponse | IErrorResponse>) => {
        try {
            const {id, user: {id: userId, img, email, username, roles, blocked, confirm}} = req.body as { id: number, user: IUser };
            await User.update({id: userId, img, email, username, roles, blocked, confirm}, {where: {id}});
            res.status(200).send()
        } catch (e) {
            console.error(e)
            res.status(500).send()
        }
    },
}

export default AdminController