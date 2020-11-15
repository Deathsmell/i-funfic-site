import {BuildOptions, Model, Sequelize} from "sequelize"
import {IChapter} from "../interfaces";

export interface ChapterModel extends Model<IChapter>, IChapter {}
export class Chapter extends Model<ChapterModel, IChapter> {}
export type ChapterStatic = typeof Model & {
    new(values?: object, options?: BuildOptions): ChapterModel
}

type DataTypes = typeof import("sequelize/types/lib/data-types");
export const ChapterFactory = (sequelize: Sequelize, dataTypes: DataTypes): ChapterStatic => {
    return sequelize.define("chapter", {
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