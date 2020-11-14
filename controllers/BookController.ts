import {Op} from "sequelize"
import {Book} from "../models";
import {Request, Response} from "express"
import {IBook} from "../interfaces";
import {BodyIdRequest, ParamIdRequest} from "../interfaces/IAxiosRequest";
import {
    IBookResponse,
    IBooksResponse,
    IErrorResponse
} from "../interfaces/IResponse";
import BookService from "../services/BookService";


const BookController = {
    createBook: async (req: Request, res: Response<IBookResponse | IErrorResponse>) => {
        try {
            const reqBook = req.body as IBook;
            const book = await BookService.create(reqBook);
            res.status(200).json({book, message: "Success create new book"})
        } catch (e) {
            res.status(500).json({message: e.message})
        }
    },
    getAll: async (req: Request, res: Response<IBooksResponse | IErrorResponse>) => {
        try {
            const books = await BookService.getAll();
            res.status(200).json({books, message: "Success"})
        } catch (e) {
            res.status(500).json({message: e.message})
        }
    },
    getById: async (req: Request, res: Response<IBookResponse | IErrorResponse>) => {
        try {
            const {id} = req.query as ParamIdRequest;
            const book = await BookService.getById(Number(id));
            if (book) {
                res.status(200).json({book, message: "Success"})
            } else {
                res.status(400).json({message: "Not found. Check params"})
            }
        } catch (e) {
            res.status(500).json({message: e.message})
        }
    },
    getByUserId: async (req: Request, res: Response<IBooksResponse | IErrorResponse>) => {
        try {
            const {id} = req.query as ParamIdRequest;
            const books = await BookService.getByUserId(Number(id));
            res.status(200).json({books: books || [], message: "Success"})
        } catch (e) {
            res.status(500).json({message: e.message})
        }
    },
    updateBook: async (req: Request, res: Response<IBookResponse | IErrorResponse>) => {
        try {
            const {authorId, annotation, gainers, id, title,tags} = req.body as IBook;
            const [number] = await Book.update({
                annotation,
                title,
                gainers,
                tags
            }, {where: {[Op.and]: [{id}, {authorId}]}});
            if (number === 1) {
                res.status(200).json({message: "Successful updated"})
            } else {
                res.status(400).json({message: `Updated ${number} books.`})
            }
        } catch (e) {
            res.status(500).json({message: e.message})
        }
    },
    deleteBook: async (req: Request, res: Response<IBookResponse | IErrorResponse>) => {
        try {
            const {id} = req.body as BodyIdRequest;
            await Book.destroy({where: {id}});
            res.status(200).send()
        } catch (e) {
            res.status(500).send()
            console.log(e)
        }
    },
}

export default BookController