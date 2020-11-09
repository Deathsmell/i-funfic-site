import {Op} from "sequelize"
import {Book} from "../models";
import {Request, Response} from "express"
import {IBook} from "../interfaces";
import {BodyIdRequest, ParamIdRequest} from "../interfaces/IAxiosRequest";
import {IBookResponse, IBooksResponse, IErrorResponse} from "../interfaces/IResponse";


const BookController = {
    deleteBook: async (req: Request, res: Response<IBookResponse | IErrorResponse>) => {
        try {
            const {id} = req.body as BodyIdRequest;
            const status = await Book.destroy({where: {id}});
            console.log(status)
            res.status(200).send()
        } catch (e) {
            res.status(500).send()
            console.log(e)
        }
    },
    getById: async (req: Request, res: Response<IBookResponse | IErrorResponse>) => {
        try {
            const {id} = req.query as ParamIdRequest;
            const book = await Book.findOne({where: {id}});
            if (book) {
                res.status(200).json({book, message: "Success"})
            } else {
                res.status(400).json({message: "Not found. Check params"})
            }
        } catch (e) {
            res.status(500).json({message: e.message})
        }
    },
    getAll: async (req: Request, res: Response<IBooksResponse | IErrorResponse>) => {
        try {
            const books = await Book.findAll();
            res.status(200).json({books, message: "Success"})
        } catch (e) {
            res.status(500).json({message: e.message})
        }
    },

    getByUserId: async (req: Request, res: Response<IBooksResponse | IErrorResponse>) => {
        try {
            const {id} = req.query as ParamIdRequest;
            const books = await Book.findAll({where: {authorId: id}});
            res.status(200).json({books, message: "Success"})
        } catch (e) {
            res.status(500).json({message: e.message})
        }
    },

    createBook: async (req: Request, res: Response<IBookResponse | IErrorResponse>) => {
        console.log("create")
        try {
            const reqBook = req.body as IBook;
            const book = await Book.create(reqBook);
            res.status(200).json({book, message: "Success create new book"})
        } catch (e) {
            res.status(500).json({message: e.message})
        }
    },
    updateBook: async (req: Request, res: Response<IBookResponse | IErrorResponse>) => {
        try {
            const {authorId, annotation, genres, id, title} = req.body as IBook;
            const [number] = await Book.update({
                annotation,
                title,
                genres
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
}

export default BookController