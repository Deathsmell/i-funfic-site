import {BuildOptions, Model, Sequelize} from "sequelize";
import {IUser, Roles} from "../interfaces";
import getEnums from "../utils/getEnums";

export interface UserModel extends Model<IUser>, IUser {
}

export class User extends Model<UserModel, IUser> {
}

export type UserStatic = typeof Model & {
    new(values?: object, options?: BuildOptions): UserModel
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
            type: DataTypes.ARRAY(DataTypes.ENUM(...getEnums(Roles))),
            allowNull: true,
            defaultValue: null,
        },
        blocked: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        confirm: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    });
}
