import React from "react";
import FicHeaderCard from "../components/FicPage/FicHeaderCard";
import {mordorsTestFics} from '../MordorsTest'
import FicManagerBorder from "../components/FicPage/FicManagerBorder";
import FicCommentList from "../components/FicPage/FicCommentList";

const FicPage: React.FC = () => {

    return (
        <>
            <FicHeaderCard {...mordorsTestFics[0]}/>
            <FicManagerBorder/>
            <FicCommentList/>
        </>
    )
}

export default FicPage;