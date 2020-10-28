import {Model, ModelCtor, Sequelize} from "sequelize"
import {IBookChapter} from "../interfaces";

type DataTypes = typeof import("sequelize/types/lib/data-types");
export const chapterInit = (sequelize: Sequelize, dataTypes: DataTypes): ModelCtor<Model<IBookChapter>> => {
    return sequelize.define("chapter",{
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        bookId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        number: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        title: {
            type: dataTypes.STRING,
            allowNull: false
        },
        text: {
            type: dataTypes.STRING,
            allowNull: false
        },
    }, {});
}