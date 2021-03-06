import React, {ChangeEvent, useEffect, useState} from "react";
// @ts-ignore
import Tags from "@yaireo/tagify/dist/react.tagify"
import "@yaireo/tagify/dist/tagify.css"
import {ITagItem} from "../../../../interfaces";


interface Props {
    blacklist?: []
    maxTags?: number
    whitelist?: Array<ITagItem | string | JSX.Element>
    placeholder?: string
    itemsState: [Array<ITagItem>, React.Dispatch<React.SetStateAction<Array<ITagItem>>>],
    className?: string
    enforceWhitelist?: boolean
    style?: object
}

type TagifyProps = {
    blacklist: Array<ITagItem | string[]>
    whitelist: Array<ITagItem | string[]>
    placeholder: string
    enforceWhitelist: boolean
    maxTags: number
    dropdown: {
        enabled: number,
        maxItems: number
    }
}

const InputTagsField: React.FC<Props> = ({
                                             blacklist,
                                             whitelist,
                                             placeholder = "",
                                             maxTags = 5,
                                             itemsState,
                                             className = "",
                                             enforceWhitelist = false,
                                             style = {}
                                         }) => {

    const [tags, setTags] = itemsState
    const [value] = useState<ITagItem[]>(tags);

    const initialState: TagifyProps = {
        blacklist: [],
        enforceWhitelist,
        maxTags,
        placeholder,
        whitelist: [],
        dropdown: {
            enabled: 0,
            maxItems: 3
        }
    };

    const [wList, setWList] = useState(whitelist);
    const [bList, setBList] = useState(blacklist);

    useEffect(() => {
        if (whitelist) {
            setWList(whitelist)
        }
    }, [whitelist])

    useEffect(() => {
        if (blacklist) {
            setBList(blacklist)
        }
    }, [blacklist])

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const values: Array<ITagItem> = value ? JSON.parse(value) : [];
        setTags(values)
    }

    return (
        <Tags className={className}
              settings={initialState}
              value={value}
              whitelist={wList}
              blacklist={bList}
              onChange={onChangeHandler}
        />
    )
}

export default InputTagsField;