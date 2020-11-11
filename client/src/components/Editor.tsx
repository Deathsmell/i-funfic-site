import React, {useEffect, useState} from "react";
import {convertToRaw, EditorState} from "draft-js";
import {Editor as DraftEditor} from 'react-draft-wysiwyg';
import {draftToMarkdown} from 'markdown-draft-js';


interface Props {
    mdTextState: [string, React.Dispatch<React.SetStateAction<string>>],
    minHeight?: number | string,
    maxHeight?: number | string,
}

const Editor: React.FC<Props> = ({
                                     mdTextState,
                                     maxHeight= 300,
                                     minHeight= 300
                                 }) => {


    const [, setMdText] = mdTextState;


    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );

    useEffect(() => {
        if (editorState) {
            const text = draftToMarkdown(convertToRaw(editorState.getCurrentContent()));
            setMdText(text)
        }
    }, [editorState])

    const onEditorStateChange = (editor: typeof editorState): void => {
        setEditorState(editor);
    };
    return (
        <DraftEditor wrapperClassName="border-dark"
                     editorClassName="border"
                     editorStyle={{minHeight,maxHeight}}
                     editorState={editorState}
                     onEditorStateChange={onEditorStateChange}
        />
    )
}

export default Editor