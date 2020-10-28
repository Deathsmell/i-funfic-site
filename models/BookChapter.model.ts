import {BuildOptions, Model, Sequelize} from "sequelize"
import {IBookChapter} from "../interfaces";

export interface BookChapterModel extends Model<IBookChapter>, IBookChapter {}
export class Chapter extends Model<BookChapterModel, IBookChapter> {}
export type BookChapterStatic = typeof Model & {
    new(values?: object, options?: BuildOptions): BookChapterModel
}

type DataTypes = typeof import("sequelize/types/lib/data-types");
export const chapterInit = (sequelize: Sequelize, dataTypes: DataTypes): BookChapterStatic => {
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