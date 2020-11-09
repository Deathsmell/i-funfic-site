import {Request, Response} from "express"
import UserService from "../services/UserService";
import {IUser} from "../interfaces";
import {Book, User} from "../models";
import {IErrorResponse, IProfileResponse, IResponse, IUsersResponse} from "../interfaces/IResponse";
import {IProfile} from "../interfaces/IProfile";

const UserController = {
    create: async (req: Request, res: Response<IUsersResponse | IErrorResponse>) => {
        const data = <IUser>req.body;
        console.log(req.body)
        if (data && data.username && data.email && data.password) {
            try {
                const newUser = await UserService.create(data);
                res.status(200).json(newUser)
            } catch (e) {
                res.status(500).json({message: e.message})
            }
        } else {
            res.status(500).json({message: "Input empty. Check you input data."})
        }
    },
    getAll: async (req: Request, res: Response<IUsersResponse | IErrorResponse>) => {
        try {
            const users = await User.findAll();
            res.status(200).json({users, message: "Success"})
        } catch (e) {
            console.error(e)
            res.status(500).json({message: "Some error on get all users"})
        }
    },
    getProfile: async (req: Request, res: Response<IProfileResponse | IErrorResponse>) => {
        try {
            const {id} = req.query as { id: string };
            const {id: userId, blocked, img, username, email, roles, confirm, books} = await User.findOne({
                where: {id: Number(id)},
                include: Book
            }) as IProfile;
            res.status(200).json({
                user: {id: userId,confirm,roles, email, username,img,blocked,password:""},
                books,
                message: ""
            })
        } catch (e) {
            console.error(e)
            res.status(401).json({message: e.message})
        }


    },
    deleteUser: async (req: Request, res: Response<IResponse>) => {
        try {
            const {id} = req.body as { id: number };
            await User.destroy({where: {id}})
            res.status(200).send()
        } catch (e) {
            console.error(e)
            res.status(500).send()
        }
    }
}

export default UserController