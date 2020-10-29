import {Model, Sequelize,BuildOptions} from "sequelize";
import {BookGenres, IBook} from "../interfaces";

export interface BookModel extends Model<IBook>,IBook {}
export class Book extends Model<BookModel,IBook>{}
export type BookStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): BookModel
}

type DataTypes = typeof import("sequelize/types/lib/data-types");
export const BookFactory = (sequelize: Sequelize, DataTypes: DataTypes): BookStatic => {
    return sequelize.define("book", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        authorId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        annotation: {
            type: DataTypes.STRING,
            allowNull: false
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: true
        },
        genres: {
            type: DataTypes.ARRAY(DataTypes.ENUM(BookGenres.FANTASTIC, BookGenres.ACTION)),
            allowNull: true
        },
    }, {});
}

