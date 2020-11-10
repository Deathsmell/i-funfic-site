import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, Col, FormControl, InputGroup, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {selectorUserId} from "../../store/credential/credential.selectors";
import {createComment} from "../../store/comments/comments.actions";

interface Props {
    bookId: number
}

const CreateCommentCard: React.FC<Props> = ({bookId}) => {

    const dispatch = useDispatch();
    const [text, setText] = useState<string>("");
    const id = useSelector(selectorUserId);

    const commentHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
    }

    const create = () => id && dispatch(createComment({text, userId: id, bookId}))

    const createClickHandler = () => {
        if (id) create()
    }

    const createEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") create()
    }

    return (
        <Row className="justify-content-center mt-3">
            <Col xl={5}>
                <InputGroup className="mb-3"
                            onKeyPress={createEnterHandler}
                >
                    <FormControl
                        as="textarea"
                        rows={7}
                        value={text}
                        onChange={commentHandler}
                        placeholder="Recipient's comment"
                        aria-label="Recipient's comment"
                        aria-describedby="basic-addon"
                        style={{resize: "none"}}
                    />
                    <InputGroup.Append>
                        <Button variant="outline-secondary"
                                onClick={createClickHandler}
                        >Button</Button>
                    </InputGroup.Append>
                </InputGroup>
            </Col>
        </Row>
    )
}

export default CreateCommentCard