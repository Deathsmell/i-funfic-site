import React from "react";
import BookCard from "../components/CreateBookPage/BookCard";
import ListChapters from "../components/CreateBookPage/ListChapters";

const CreateBookPage: React.FC = () => {

    return (
        <div>
            <h1 className={"text-center"}>Create page</h1>
            <BookCard/>
            <ListChapters/>
        </div>
    )
}

export default CreateBookPage