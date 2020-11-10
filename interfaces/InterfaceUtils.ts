import {ModelOptions, Model} from "sequelize"


export type ICommentContent<T> = Omit<T, "id">

export type IModelOptions<T extends Model> =  Pick<ModelOptions<T>, "createdAt" | "updatedAt">

