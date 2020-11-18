import React from "react";
import {Badge} from "react-bootstrap";
import {FormattedMessage} from "react-intl";

interface Props {
    genre: string
}

const GenreBadge: React.FC<Props> = ({genre}) => {

    return (
        <Badge className="mx-1" variant="secondary">
            <FormattedMessage id={`common.genre.${genre}`}
                              defaultMessage={genre[0].toUpperCase() + genre.slice(1)}
                              description="Genres badge content"
            />
        </Badge>
    )
}

export default GenreBadge