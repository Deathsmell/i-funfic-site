import {Request, Response} from "express"
import {IBookChapter} from "../interfaces";
import {Chapter} from "../models";


const ChapterController = {
    createChapter: async (req: Request, res: Response) => {
        try {
            const {bookId, title, text}: IBookChapter = req.body;
            const chapters = await Chapter.count({where: {bookId}});
            const newChapter = await Chapter.create({bookId, title, text, number: chapters + 1});
            res.status(200).json({chapter: newChapter, message: "Successful created"})
        } catch (e) {
            console.error(e)
            res.status(400).json({message: "Some error when create chapter"})
        }
    },
    getAll: async (req: Request, res: Response) => {
        try {
            const {id}: { id: number } = req.body;
            const chapters = await Chapter.findAll({where: {bookId: id}});
            res.status(200).json({chapters, message: "Successful get"})
        } catch (e) {
            res.status(400).json({message: "Some error when get all chapter by book id!"})
            console.error(e)
        }
    },
    updateChapter: async (req: Request, res: Response) => {
        try {
            const chapter: IBookChapter = req.body;
            const updated = await Chapter.update(chapter, {where: {id: chapter.id}});
            res.status(200).json({chapter: updated, message: "Successful updated"})
        } catch (e) {
            console.error(e)
            res.status(400).json({message: "Some error when update chapter"})
        }

    },
    deleteChapter: async (req: Request, res: Response) => {
        try {
            const {id} = req.params;
            await Chapter.destroy({where: {id}});
            res.status(200).json({message: "Successful deleted"})
        } catch (e) {
            console.error(e)
            res.status(400).json({message: "Some error when delete chapter"})
        }
    }
}

export default ChapterController