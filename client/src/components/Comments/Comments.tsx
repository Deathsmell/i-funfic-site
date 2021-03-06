import React from "react";
import Comment from "./Comment";
import CreateCommentCard from "./CreateCommentCard";
import {connect, ConnectedProps} from "react-redux";
import {RootState} from "../../store/reducers";
import {IUserComment} from "../../../../interfaces/IComment";
import {FormattedMessage} from "react-intl";

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
                                                         user: {username, image},
                                                         updatedAt
                                                     },index) => {
                        return (
                            <Comment key={updatedAt + "" + index}
                                     username={username}
                                     image={image}
                                     text={text}
                                     updateAt={updatedAt}
                            />
                        )
                    }
                    )
                    : <h1 className="text-center">
                        <FormattedMessage id="comments.empty"
                                          defaultMessage="No comments"
                                          description="Empty comments message"
                        />
                    </h1>
            }
        </>
    )
}

export default connector(Comments);