import {NextFunction, Request, Response} from "express"
import UserService from "../services/UserService";
import {IUser} from "../interfaces";

const UserController = {
    create: async (req: Request, res: Response, next: NextFunction) => {
        const data = <IUser>req.body;
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
    }
}

export default UserController