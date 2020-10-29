import {Model, Sequelize,BuildOptions} from "sequelize";
import {IUser, Roles} from "../interfaces";

export interface UserModel extends Model<IUser>,IUser {}
export class User extends Model<UserModel,IUser>{}
export type UserStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): UserModel
}

type DataTypes = typeof import("sequelize/types/lib/data-types");
export const UserFactory = (sequelize: Sequelize, DataTypes: DataTypes): UserStatic => {
    return sequelize.define("user", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        roles: {
            type: DataTypes.ARRAY(DataTypes.ENUM(Roles.ADMIN, Roles.USER)),
            allowNull: true,
        },
    });
}
