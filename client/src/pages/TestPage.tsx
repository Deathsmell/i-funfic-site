import React from "react";
import {Button} from "react-bootstrap";
import {RatingApi} from "../api/rating";


const TestPage: React.FC = () => {


    const clickHandler = (e: React.MouseEvent) => {
        e.preventDefault()
        RatingApi.setRating(1,1,5).then(res => {
            console.log(res.data);
        })
    }

    return (
        <>
            <h1>Test page</h1>
            <Button onClick={clickHandler}
            >
                Click me
            </Button>
        </>
    )
}

export default TestPage