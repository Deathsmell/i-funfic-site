import {IUser} from "./IUser";
import {IBook} from "./IBook";


export interface IProfile extends IUser{
    books?: IBook[]
}