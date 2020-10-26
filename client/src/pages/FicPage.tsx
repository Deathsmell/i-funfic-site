import React from "react";
import FicHeaderCard from "../components/FicHeaderCard";
import {mordorsTestFics} from '../MordorsTest'
import FicManagerBorder from "../components/FicManagerBorder";
import FicCommentList from "../components/FicCommentList";

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