import {BuildOptions, Model, Sequelize} from "sequelize";
import {IBook} from "../interfaces";

export interface BookModel extends Model<IBook>, IBook {
}

export class Book extends Model<BookModel, IBook> {
}

export type BookStatic = typeof Model & {
    new(values?: object, options?: BuildOptions): BookModel
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
        tags: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
            defaultValue: []
        },
        annotation: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ""
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        title: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: ""
        },
        gainers: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: true,
            defaultValue: []
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        authorName: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {});
}

