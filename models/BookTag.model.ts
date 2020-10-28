import {Model, ModelCtor, Sequelize} from "sequelize"

import {IBookTag} from "../interfaces";

type DataTypes = typeof import("sequelize/types/lib/data-types");
export const tagInit = (sequelize: Sequelize, dataTypes: DataTypes): ModelCtor<Model<IBookTag>> => {
    return sequelize.define("tag", {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        tag: {
            type: dataTypes.STRING,
            allowNull: false
        },
    }, {});
}