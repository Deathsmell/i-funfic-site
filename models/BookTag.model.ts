import {Model, Sequelize,BuildOptions} from "sequelize"
import {IBookTag} from "../interfaces";

export interface BookTagModel extends Model<IBookTag>, IBookTag {}
export class Tag extends Model<BookTagModel, IBookTag> {}
export type TagStatic = typeof Model & {
    new(values?: object, options?: BuildOptions): BookTagModel
}

type DataTypes = typeof import("sequelize/types/lib/data-types");
export const TagFactory = (sequelize: Sequelize, dataTypes: DataTypes): TagStatic => {
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