import {Model, ModelCtor, Sequelize} from "sequelize";
import {BookGenres, IBook} from "../interfaces";

type DataTypes = typeof import("sequelize/types/lib/data-types");
export const bookInit = (sequelize: Sequelize, dataTypes: DataTypes): ModelCtor<Model<IBook>> => {
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

