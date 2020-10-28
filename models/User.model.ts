import {Model, ModelCtor, Sequelize} from "sequelize";
import {IUser, Roles} from "../interfaces";

type DataTypes = typeof import("sequelize/types/lib/data-types");
export const userInit = (sequelize: Sequelize, DataTypes: DataTypes): ModelCtor<Model<IUser>> => {
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
            type: DataTypes.ENUM(Roles.ADMIN, Roles.USER),
            allowNull: true,
        },
    });
}
