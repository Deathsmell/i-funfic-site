import React, {useState} from "react";
import {Row} from "react-bootstrap";
import {FcLike, FcLikePlaceholder} from "react-icons/fc"

interface Props {
    bookId: number
    liked: boolean
}

const defaultClassName = "border rounded-circle border-danger"
const defaultSize = "10vh"

const LikeBtn: React.FC<Props> = ({
                                      bookId,
                                      liked,
                                  }) => {

    const [like, setLike] = useState(liked);

    const likedHandler = (e: React.MouseEvent) => {
        e.preventDefault();
        setLike(!like)
        if (like) {
            console.log("Fetch dislike")
        } else {
            console.log("Fetch like")
        }
    }



    return (
        <Row noGutters className="fixed-bottom justify-content-end m-3">
            {
                like
                    ? <FcLike size={defaultSize} className={defaultClassName}

                              onClick={likedHandler}
                    />
                    : <FcLikePlaceholder size={defaultSize} className={defaultClassName}
                                         onClick={likedHandler}
                    />
            }
        </Row>
    )
}

export default LikeBtn