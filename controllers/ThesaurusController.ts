import {Request,Response} from "express"
import axios from "axios"

const ThesaurusController = {
    search: async (req: Request, res: Response) => {
        try {
            const {word} = req.query as {word: string};
            const SEARCH_URL = `http://ltmaggie.informatik.uni-hamburg.de/jobimviz/ws/api/russianTrigram/jo/similar`;
            const url = new URL(`${SEARCH_URL}/${word}`)
            const response = await axios.get(url.toString(), {});
            const results = response.data.results as [{ score: number, key: string, contextScores: any }];
            res.status(200).json({synonym: results, message: "Success search"})
        } catch (e) {
            console.error(e)
            res.status(500).json({message: `Some error when search synonym: ${e.message}`})
        }
    },
}

export default ThesaurusController