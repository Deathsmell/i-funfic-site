import {Request, Response} from "express"
import {IChapter} from "../interfaces";
import {Chapter} from "../models";
import {IChapterFromDb} from "../interfaces/IChapter";
import {IChapterResponse, IChaptersResponse, IErrorResponse, IResponse} from "../interfaces/IResponse";

const ChapterController = {
    createChapter: async (req: Request, res: Response<IChapterResponse | IErrorResponse>) => {
        try {
            const {bookId, title, text}: IChapter = req.body;
            const chapters = await Chapter.count({where: {bookId}});
            const newChapter =
                await Chapter.create({bookId, title, text, number: chapters + 1}) as IChapterFromDb;
            res.status(200).json({chapter: newChapter, message: "Successful created"})
        } catch (e) {
            console.error(e)
            res.status(400).json({message: "Some error when create chapter"})
        }
    },
    getAll: async (req: Request, res: Response<IChaptersResponse | IErrorResponse>) => {
        try {
            const {id}: { id: number } = req.body;
            const chapters = await Chapter.findAll({where: {bookId: id}}) as IChapterFromDb[];
            res.status(200).json({chapters, message: "Successful get"})
        } catch (e) {
            console.error(e)
            res.status(400).json({message: "Some error when get all chapter by book id!"})
        }
    },
    updateChapter: async (req: Request, res: Response<IChapterResponse | IErrorResponse>) => {
        try {
            const chapter: IChapter = req.body;
            const [number,updatedChapter] =
                await Chapter.update(chapter, {where: {id: chapter.id}}) as [number, IChapterFromDb[]];
            if (number === 1){
                res.status(200).json({chapter: updatedChapter[0], message: "Successful updated"})
            } else {
                res.status(400).json({message: "Error then updating chapter"})
            }
        } catch (e) {
            console.error(e)
            res.status(400).json({message: "Some error when update chapter"})
        }

    },
    deleteChapter: async (req: Request, res: Response<IResponse | IErrorResponse>) => {
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