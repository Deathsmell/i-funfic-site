import {IBook} from "../interfaces";
import {Book} from "../models";
import {IBookFromDb} from "../interfaces/IBook";


const BookService = {
    create: async (book: IBook): Promise<IBookFromDb> => {
        return await Book.create(book) as IBookFromDb
    },
    getById: async (id: number): Promise<IBookFromDb | null> => {
        return await Book.findOne({where: {id}}) as IBookFromDb | null;
    },
    getAll: async (): Promise<IBookFromDb[]> => {
        return await Book.findAll() as IBookFromDb[];
    },
    getByUserId: async (id: number): Promise<IBookFromDb[]> => {
        return await Book.findAll({where: {authorId: id}}) as IBookFromDb[]
    },
}

export default BookService