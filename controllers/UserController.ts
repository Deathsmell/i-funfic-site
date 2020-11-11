import {Request, Response} from "express"
import UserService from "../services/UserService";
import {IUser} from "../interfaces";
import {Book, User} from "../models";
import {IErrorResponse, IProfileResponse, IResponse, IUserResponse, IUsersResponse} from "../interfaces/IResponse";
import {IProfile} from "../interfaces/IProfile";
import {IUserFromDb} from "../interfaces/IUser";
import {ParamIdRequest} from "../interfaces/IAxiosRequest";

const UserController = {
    getUser: async (req: Request, res: Response<IUserResponse | IErrorResponse>) => {
        try {
            const {id} = req.query as ParamIdRequest;
            const user = await User.findOne({where:{id: Number(id)}}) as IUserFromDb | null;
            if (user) {
                res.status(200).json({user, message: "Success"})
            } else {
                res.status(400).json({message: "Some error: user not exist"})
            }
        } catch (e) {
            console.error(e)
            res.status(500).json({message: "Some error on get all users"})
        }
    },
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
            const users = await User.findAll() as IUserFromDb[];
            res.status(200).json({users, message: "Success"})
        } catch (e) {
            console.error(e)
            res.status(500).json({message: "Some error on get all users"})
        }
    },
    getProfile: async (req: Request, res: Response<IProfileResponse | IErrorResponse>) => {
        try {
            const {id} = req.query as ParamIdRequest
            const profile =
                await User.findOne({
                    where: {id: Number(id)},
                    include: Book
                }) as IProfile | null;
            if (profile) {
                console.log(profile)
                const books = profile.books;
                res.status(200).json({
                    user: {
                        id: profile.id,
                        email: profile.email,
                        confirm: profile.confirm,
                        blocked: profile.blocked,
                        roles: profile.roles,
                        username: profile.username,
                        image: profile.image,
                        password: ""
                    },
                    books: books
                })
            }
        } catch (e) {
            console.error(e)
            res.status(401).json({message: e.message})
        }


    },
    deleteUser: async (req: Request, res: Response<IResponse | IErrorResponse>) => {
        try {
            const {id} = req.body as { id: number };
            await User.destroy({where: {id}})
            res.status(200).send()
        } catch (e) {
            console.error(e)
            res.status(500).send()
        }
    },
    update: async (req: Request, res: Response<IResponse | IErrorResponse>) => {
        try {
            const {id, user: {username, email, image}} = req.body as { id: number, user: IUser };
            const user = await User.findOne({where: {id}}) as IUserFromDb | null;
            if (user && (user.username !== username || user.email !== email || user.image !== image)) {
                await User.update({username, email, image}, {where: {id}})
            } else {
                res.status(401).json({message: "Some error then update user information"})
            }
            res.status(200).json({message: "Successful update"})
        } catch (e) {
            console.error(e)
            res.status(500).json({message: "Some error then update user information"})
        }
    },
}

export default UserController