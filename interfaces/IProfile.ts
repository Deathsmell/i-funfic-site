import {IUserFromDb} from "./IUser";
import {IBookFromDb} from "./IBook";


export interface IProfile extends IUserFromDb{
    books: IBookFromDb[]
}