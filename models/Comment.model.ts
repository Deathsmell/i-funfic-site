import {BuildOptions, Model, Sequelize} from "sequelize"
import {IComment} from "../interfaces";

export interface CommentModel extends Model<IComment>, IComment {}
export class Tag extends Model<CommentModel, IComment> {}
export type CommentStatic = typeof Model & {
    new(values?: object, options?: BuildOptions): CommentModel
}

type DataTypes = typeof import("sequelize/types/lib/data-types");
export const CommentFactory = (sequelize: Sequelize, dataTypes: DataTypes): CommentStatic => {
    return sequelize.define("comment", {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        text: {
            type: dataTypes.STRING,
            allowNull: false
        },
        bookId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        userId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
    }, {});
}