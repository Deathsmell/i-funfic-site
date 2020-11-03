import React from "react";
import {FormControl, InputGroup} from "react-bootstrap";

const EditChapterPage: React.FC = () => {


    return (
        <div>
            <h1>Edit chapter page</h1>
            <InputGroup size="lg" className="my-4">
                <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroup-sizing-lg">Chapter name</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" />
            </InputGroup>
            <InputGroup>
                <FormControl as="textarea"
                             aria-label="With textarea"
                             style={{minHeight:"60vh", resize: "none"}}
                />
            </InputGroup>
        </div>
    )
}

export default EditChapterPage