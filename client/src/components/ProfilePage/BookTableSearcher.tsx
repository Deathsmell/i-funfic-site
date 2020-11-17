import React, {ChangeEvent, useState} from "react";
import {Dropdown, DropdownButton, FormControl, InputGroup} from "react-bootstrap";
import {IFilterBookTableState} from "./UserProfileTabs";
import {FormattedMessage} from "react-intl";


interface IKeys {
    title: string,
    gainers: string,
    all: string,
}

export type FilterKeys = keyof IKeys

const KEYS: IKeys = {
    title: "Book name",
    gainers: "Gainers",
    all: "All"
}

interface Props {
    filterState: [IFilterBookTableState, React.Dispatch<React.SetStateAction<IFilterBookTableState>>]
}

const BookTableSearcher: React.FC<Props> = ({filterState}) => {

    const [filter, setFilter] = filterState

    const filterHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setFilter((prev) => ({...prev, string: e.target.value}))
    }

    const [title, setTitle] = useState<string>(KEYS.all);

    const changeFilterHandler = (eventKey: any) => {
        setTitle(eventKey);
        const strings = Object.keys(KEYS) as Array<FilterKeys>;
        const type = strings.find(key => KEYS[key] === eventKey) as FilterKeys;
        setFilter((prev) => ({...prev, type: type}))
    }

    return (
        <InputGroup className="my-4">
            <DropdownButton
                as={InputGroup.Prepend}
                variant="outline-secondary"
                title={title}
                id="profile-book-filter"
            >
                <Dropdown.Item eventKey={KEYS.title}
                               href="#"
                               onSelect={changeFilterHandler}
                >
                    <FormattedMessage id="account.tabs.books.table.searcher.title"
                                      defaultMessage="Book name"
                                      description="Book name button"
                    />
                </Dropdown.Item>
                <Dropdown.Item href="#"
                               eventKey={KEYS.gainers}
                               onSelect={changeFilterHandler}
                >
                    <FormattedMessage id="account.tabs.books.table.searcher.gainers"
                                      defaultMessage="Gainers"
                                      description="Book name button"
                    />
                </Dropdown.Item>
                <Dropdown.Divider/>
                <Dropdown.Item href="#"
                               eventKey={KEYS.all}
                               onSelect={changeFilterHandler}
                >
                    <FormattedMessage id="account.tabs.books.table.searcher.all"
                                      defaultMessage="All"
                                      description="All button"
                    />
                </Dropdown.Item>
            </DropdownButton>
            <FormControl aria-describedby="profile-book-filter"
                         value={filter.string}
                         onChange={filterHandler}
            />
        </InputGroup>
    )
}

export default BookTableSearcher;