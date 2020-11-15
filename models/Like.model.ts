import {BuildOptions, Model, Sequelize} from "sequelize";
import {ILike} from "../interfaces/ILike";

export interface LikeModel extends Model<ILike>,ILike {}
export class Like extends Model<LikeModel,ILike>{}
export type LikeStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): LikeModel
}

type DataTypes = typeof import("sequelize/types/lib/data-types");
export const LikeFactory = (sequelize: Sequelize, DataTypes: DataTypes): LikeStatic => {
    return sequelize.define("like", {
        chapterId:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        }
    }, {});
}

