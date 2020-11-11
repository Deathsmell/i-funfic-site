import React, {MouseEvent} from "react";
import BookCard from "./BookCard";
import {Button, Row} from "react-bootstrap";

interface Props {
    imageState: [(string | undefined), React.Dispatch<React.SetStateAction<string | undefined>>]
    annotationState: [(string), React.Dispatch<React.SetStateAction<string>>]
    titleState: [(string), React.Dispatch<React.SetStateAction<string>>]
    createBookHandler: (e: MouseEvent<HTMLButtonElement>) => void
}

const CreateBookDashboard: React.FC<Props> = ({
                                                  titleState,
                                                  imageState,
                                                  annotationState,
                                                  createBookHandler
                                              }) => {

    return (
        <>
            <BookCard
                imageState={imageState}
                annotationState={annotationState}
                titleState={titleState}
            />
            <Row className="justify-content-center mt-5">
                <Button variant="primary"
                        size="lg"
                        className="mb-3"
                        onClick={createBookHandler}
                >
                    Create
                </Button>
            </Row>
        </>
    )
}


export default CreateBookDashboard