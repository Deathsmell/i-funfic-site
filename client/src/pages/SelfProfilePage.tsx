import React from "react";
import {connect, ConnectedProps} from "react-redux";
import {RootState} from "../store/reducers";
import {getBooksByAuthorIdFetch} from "../store/book/books.actions";
import ProfilePage from "./ProfilePage";

const mapProps = ({books: {myBook}, credential}: RootState) => ({myBook, credential})
const mapDispatch = {getBooksByAuthorId: getBooksByAuthorIdFetch}
const connector = connect(mapProps, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>

const SelfProfilePage: React.FC<PropsFromRedux> = ({
                                                       myBook,
                                                       credential,
                                                   }) => {

    return (
        <ProfilePage myBook={myBook} credential={credential}/>
    )
}

export default connector(SelfProfilePage);