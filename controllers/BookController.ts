import {Op} from "sequelize"
import {Book} from "../models";
import {Request, Response} from "express"
import {BookModel} from "../models/Book.model";
import {IBook} from "../interfaces";


interface BookResponse {
    book?: BookModel | BookModel[],
    message?: string | any
}

const BookController = {
    deleteBook: async (req: Request, res: Response<BookResponse>) => {
        try {
            const {id}: { id: number } = req.body;
            const status = await Book.destroy({where: {id}});
            console.log(status)
            res.status(200).send()
        } catch (e) {
            res.status(500).send()
            console.log(e)
        }
    },
    getById: async (req: Request, res: Response<BookResponse>) => {
        try {
            const {id} = req.query;
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
    getAll: async (req: Request, res: Response<BookResponse>) => {
        try {
            const books = await Book.findAll();
            res.status(200).json({book: books, message: "Success"})
        } catch (e) {
            res.status(500).json({message: e.message})
        }
    },

    getByUserId: async (req: Request, res: Response<BookResponse>) => {
        try {
            const {id} = req.query;
            const books = await Book.findAll({where: {authorId: id}});
            res.status(200).json({book: books, message: "Success"})
        } catch (e) {
            res.status(500).json({message: e.message})
        }
    },

    createBook: async (req: Request, res: Response<BookResponse>) => {
        console.log("create")
        try {
            const reqBook: IBook = req.body;
            const book = await Book.create(reqBook);
            res.status(200).json({book, message: "Success create new book"})
        } catch (e) {
            res.status(500).json({message: e.message})
        }
    },

    updateBook: async (req: Request, res: Response<BookResponse>) => {
        try {
            const {authorId, annotation, genres, id, rating, title} = req.body as IBook;
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