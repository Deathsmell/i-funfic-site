import React from "react";
import {Dropdown, DropdownButton, FormControl, InputGroup} from "react-bootstrap";

const BookTableSearcher: React.FC = () => {

    return (
            <InputGroup className="my-4">
                <DropdownButton
                    as={InputGroup.Prepend}
                    variant="outline-secondary"
                    title="Dropdown"
                    id="input-group-dropdown-1"
                >
                    <Dropdown.Item href="#">Book name</Dropdown.Item>
                    <Dropdown.Item href="#">Tags</Dropdown.Item>
                    <Dropdown.Item href="#">Genres</Dropdown.Item>
                    <Dropdown.Divider/>
                    <Dropdown.Item href="#">All</Dropdown.Item>
                </DropdownButton>
                <FormControl aria-describedby="basic-addon1"/>
            </InputGroup>
    )
}

export default BookTableSearcher;