import React, {ChangeEvent} from "react";
import {FormControl, InputGroup} from "react-bootstrap";
import Editor from "../Editor";

interface Props {
    title: string,
    titleHandler: (e: ChangeEvent<HTMLInputElement>) => void
    textState: [string, React.Dispatch<React.SetStateAction<string>>],
}

const ChapterEditor: React.FC<Props> = ({
                                            textState,
                                            title,
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
            <Editor mdTextState={textState}/>
        </>
    )
}

export default ChapterEditor