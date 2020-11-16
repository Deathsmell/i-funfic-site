import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {Button, ButtonGroup, Collapse, Dropdown, DropdownButton, InputGroup, Row} from "react-bootstrap";
import {TagCloud} from 'react-tagcloud'
import InputTagsField from "../CreateBookPage/InputTagsField";
import {IBookAsyncActions} from "../../store/book/book.interfaces";
import {ITagItem} from "../../../../interfaces";
import {TagsApi} from "../../api/tags";


interface Props {
    className?: string
    sortingState: [
        Array<{ key: string, action: () => IBookAsyncActions }>,
        Dispatch<SetStateAction<Array<{ key: string, action: () => IBookAsyncActions }>>>
    ]
    changeSortState: [number, React.Dispatch<React.SetStateAction<number>>]
    tagsState: [Array<ITagItem>, Dispatch<SetStateAction<Array<ITagItem>>>]
}


const FilterRow: React.FC<Props> = ({
                                        className = "",
                                        sortingState,
                                        changeSortState,
                                        tagsState
                                    }) => {

    const [open, setOpen] = useState(false);
    const [tags, setTags] = tagsState;
    const [whitelist, setWhitelist] = useState<Array<ITagItem>>([]);
    const [sorting] = sortingState
    const [changeSort, setChangeSort] = changeSortState;

    useEffect(() => {
        if (!whitelist.length) {
            TagsApi.getTags()
                .then(({data:{tags}}) => {
                    setWhitelist(tags)
                })
        }
    }, [])

    const changeSortHandler = (eventKey: any) => {
        setChangeSort(Number(eventKey))
    }

    return (
        <div className={className}>
            <Row noGutters className="justify-content-center">
                <InputGroup>
                    <InputGroup.Prepend>
                        <DropdownButton as={ButtonGroup}
                                        title={sorting[changeSort].key}
                                        className="rounded-0"
                        >
                            {
                                sorting && sorting.map(({key}, index) => {
                                    return (
                                        <Dropdown.Item key={key}
                                                       eventKey={index.toString()}
                                                       onSelect={changeSortHandler}
                                        >{key}</Dropdown.Item>
                                    )
                                })
                            }
                        </DropdownButton>
                    </InputGroup.Prepend>
                    <div className={"flex-grow-1"}>
                        <InputTagsField itemsState={tagsState}
                                        whitelist={whitelist}
                                        enforceWhitelist
                        />
                    </div>
                    <InputGroup.Append>
                        <Button variant="outline-secondary"
                                onClick={() => {
                                    setOpen(!open)
                                }}
                        >Cloud tags</Button>
                    </InputGroup.Append>
                </InputGroup>
            </Row>
            <Row className="justify-content-center">
                <Collapse in={open}>
                    {
                        whitelist && whitelist.length
                            ? (
                                <TagCloud minSize={12}
                                          maxSize={35}
                                          tags={whitelist}
                                          onClick={(tag: ITagItem) => {
                                              setTags(prev => [
                                                  ...prev.filter(({value}) => value !== tag.value),
                                                  tag
                                              ])
                                          }}
                                />
                            )
                            : (
                                <h1 className="text-center">Empty cloud</h1>
                            )
                    }
                </Collapse>

            </Row>
        </div>
    )
}

export default FilterRow