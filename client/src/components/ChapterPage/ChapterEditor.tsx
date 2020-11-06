import React, {ChangeEvent} from "react";
import {FormControl, InputGroup} from "react-bootstrap";

interface Props {
    title: string,
    titleHandler: (e: ChangeEvent<HTMLInputElement>) => void
    text: string,
    textHandler: (e: ChangeEvent<HTMLInputElement>) => void,
}

const ChapterEditor: React.FC<Props> = ({
                                            text,
                                            title,
                                            textHandler,
                                            titleHandler
                                        }) => {

    return (
        <>
            <InputGroup size="lg" className="my-4">
                <FormControl aria-label="Large"
                             value={title}
                             aria-describedby="input-chapter-title"
                             placeholder={"Chapter name"}
                             onChange={titleHandler}
                />
            </InputGroup>
            <InputGroup>
                <FormControl as="textarea"
                             value={text}
                             aria-label="With textarea"
                             placeholder={"Chapter text here..."}
                             style={{minHeight: "60vh", resize: "none"}}
                             onChange={textHandler}
                />
            </InputGroup>
        </>
    )
}

export default ChapterEditor