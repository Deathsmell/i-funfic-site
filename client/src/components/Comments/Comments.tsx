import React from "react";
import Comment from "./Comment";
import CreateCommentCard from "./CreateCommentCard";
import {connect, ConnectedProps} from "react-redux";
import {RootState} from "../../store/reducers";
import {IUserComment} from "../../../../interfaces/IComment";

interface Props {
    bookId: number
}

const mapProps = ({comments}: RootState) => ({comments})
const mapDispatch = {}
const connector = connect(mapProps, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>

const Comments: React.FC<PropsFromRedux & Props> = ({
                                                        bookId,
                                                        comments
                                                    }) => {

    const sortByDate = (a: IUserComment, b: IUserComment) =>
        new Date(Number(a.updatedAt)).getTime() - new Date(Number(b.updatedAt)).getTime();

    return (
        <>
            <CreateCommentCard bookId={bookId}/>
            {
                comments.length
                    ? comments.sort(sortByDate).map(({
                                                         text,
                                                         user: {username, img},
                                                         updatedAt
                                                     }) => {
                        return (
                            <Comment username={username}
                                     image={img}
                                     text={text}
                                     updateAt={updatedAt as string}
                            />
                        )
                    }
                    )
                    : <h1 className="text-center">No comments</h1>
            }
        </>
    )
}

export default connector(Comments);