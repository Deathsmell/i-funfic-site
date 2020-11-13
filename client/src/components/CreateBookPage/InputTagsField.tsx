import React, {ChangeEvent, useRef, useState} from "react";
// @ts-ignore
import Tags from "@yaireo/tagify/dist/react.tagify"
import "@yaireo/tagify/dist/tagify.css"


export type TagItem<T = string> = { value: T };

interface Props {
    blacklist?: []
    maxTags?: number
    whitelist?: []
    placeholder?: string
    itemsState: [Array<TagItem>, React.Dispatch<React.SetStateAction<Array<TagItem>>>],
    className?: string
    enforceWhitelist?: boolean
}

const InputTagsField: React.FC<Props> = ({
                                        blacklist = [],
                                        whitelist = [],
                                        placeholder = "",
                                        maxTags = 5,
                                        itemsState,
                                        className = "",
                                        enforceWhitelist = false
                                    }) => {

    const baseTagifySettings = {
        blacklist,
        maxTags,
        whitelist,
        placeholder,
        enforceWhitelist,
        dropdown: {
            enabled: 0,
            maxItems: 3
        }
    }

    const tagifyRef = useRef();
    const [tags, setTags] = itemsState
    const initialState = {value: tags.length ? tags : []};
    const [tagifyProps] = useState<{ value: Array<TagItem> }>(initialState)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        e.persist()
        const value = e.target.value;
        const values: Array<TagItem> = value ? JSON.parse(value) : [];
        setTags(values)
    }

    return (
        <Tags className={className}
              tagifyRef={tagifyRef}
              settings={baseTagifySettings}
              {...tagifyProps}
              onChange={onChangeHandler}
        />

    )
}

export default InputTagsField;