import {IUser} from "../interfaces";
import {Op} from "sequelize"
import {User} from "../models";
import {SuccessCreateUser} from "./types";

const UserService = {
    create: async (user: IUser): Promise<SuccessCreateUser> => {
            const findUser = await User
                .findOne({where: {[Op.or]: [{username: user.username}, {email: user.email}]}})
            if (!!findUser) {
                throw new Error("Username or email exist. Please change another params")
            }
            const newUser = await User.create(user);
            return {message: "Success create new user", user: newUser}
    },
}

export default UserService