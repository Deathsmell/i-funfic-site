import React from "react";
import FicListCard from "../components/MainPage/FicListCard";
import {mordorsTestFics} from '../MordorsTest'

const MainPage: React.FC = () => {


    return (
        <div>
            {mordorsTestFics.map(fic =>
                <FicListCard {...fic} key={fic.ficId}/>
            )}
        </div>
    )
}

export default MainPage;