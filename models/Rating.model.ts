import {BuildOptions, Model, Sequelize} from "sequelize";
import {IRating} from "../interfaces/IRating";

export interface RatingModel extends Model<IRating>,IRating {}
export class Rating extends Model<RatingModel,IRating>{}
export type RatingStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): RatingModel
}

type DataTypes = typeof import("sequelize/types/lib/data-types");
export const RatingFactory = (sequelize: Sequelize, DataTypes: DataTypes): RatingStatic => {
    return sequelize.define("rating", {
        bookId:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {});
}

