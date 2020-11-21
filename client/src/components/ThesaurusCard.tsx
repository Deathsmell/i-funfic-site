import React, {useEffect, useState} from "react";
import {Card} from "react-bootstrap";
import {ThesaurusApi} from "../api/thesaurus";

interface Props {
    body: string,
    setting: {
        x: number | null,
        y: number | null,
    },
    show: boolean | null
}

type  CssProp = string | number | (string & {}) | undefined

const ThesaurusCard: React.FC<Props> = ({
                                            body,
                                            setting: {
                                                x,
                                                y,
                                            },
                                            show = true
                                        }) => {

    let [words, setWords] = useState<JSX.Element[]>([]);

    let [right, setRight] = useState<CssProp>();
    let [top, setTop] = useState<CssProp>();
    let [bottom, setBottom] = useState<CssProp>();
    let [left, setLeft] = useState<CssProp>();

    useEffect(() => {
        if (body && typeof body === "string") {
            ThesaurusApi.search(body)
                .then(res => {
                    const synonym = res.data.synonym as [{ score: number, key: string, contextScores: any }];
                    const resWords = synonym
                        .sort((a, b) => b.score - a.score)
                        .map(({key, score}) => <p key={score+key}>{key}</p>);
                    setWords(resWords)
                })
        }
    }, [body])

    useEffect(() => {
        let innerWidth: number = window.innerWidth;
        let innerHeight: number = window.innerHeight;

        if (x && ~x) {
            if (x > innerWidth / 2) {
                setRight(innerWidth - x)
            } else {
                setLeft(x)
            }
        }

        if (y && ~y) {
            if (y > innerHeight / 2) {
                setBottom((innerHeight - y))
            } else {
                setTop(y + 15)
            }
        }
        return () => {
            setRight(undefined)
            setTop(undefined)
            setLeft(undefined)
            setBottom(undefined)
        }
    }, [x, y])

    if (!show) return null

    return (
        <Card style={
            {
                position: "absolute",
                top: top,
                left: left,
                right: right,
                bottom: bottom,
                overflow: "auto",
                maxHeight: "30%"
            }
        }>
            <Card.Body>
                {words.length ? words : "No match synonym"}
            </Card.Body>
        </Card>
    )
}

export default ThesaurusCard