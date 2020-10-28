import {Model, Sequelize,BuildOptions} from "sequelize";
import {BookGenres, IBook} from "../interfaces";

export interface BookModel extends Model<IBook>,IBook {}
export class Book extends Model<BookModel,IBook>{}
export type BookStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): BookModel
}

type DataTypes = typeof import("sequelize/types/lib/data-types");
export const bookInit = (sequelize: Sequelize, dataTypes: DataTypes): BookStatic => {
    return sequelize.define("book", {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        authorId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        annotation: {
            type: dataTypes.STRING,
            allowNull: false
        },
        rating: {
            type: dataTypes.INTEGER,
            allowNull: true
        },
        title: {
            type: dataTypes.STRING,
            allowNull: true
        },
        genres: {
            type: dataTypes.ENUM(BookGenres.FANTASTIC, BookGenres.ACTION),
            allowNull: true
        },
    }, {});
}

