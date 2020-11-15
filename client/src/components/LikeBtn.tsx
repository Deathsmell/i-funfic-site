import React from "react";
import {Row} from "react-bootstrap";
import {FcLike, FcLikePlaceholder} from "react-icons/fc"
import {LikeApi} from "../api/like";
import {useSelector} from "react-redux";
import {selectorUserId} from "../store/credential/credential.selectors";

interface Props {
    chapterId: number
    likedState: [boolean, React.Dispatch<React.SetStateAction<boolean>>]

}

const defaultClassName = "border rounded-circle border-danger"
const defaultSize = "10vh"

const LikeBtn: React.FC<Props> = ({
                                      chapterId,
                                      likedState,
                                  }) => {

    const [like, setLike] = likedState;
    const userId = useSelector(selectorUserId);

    const likedHandler = (e: React.MouseEvent) => {
        e.preventDefault();
        if (userId) {
            if (like) {
                LikeApi.dislike(userId, chapterId)
                    .then(res => {
                        if (res.status === 200) setLike(false)
                    })
                    .catch(console.error)
            } else {
                LikeApi.like(userId, chapterId)
                    .then(res => {
                        if (res.status === 200) setLike(true)
                    })
                    .catch(console.error)
            }
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