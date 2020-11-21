import React, {useState ,MouseEvent} from "react";
import ThesaurusCard from "./ThesaurusCard"

const ThesaurusSelector: React.FC = ({children}) => {

    let [show, setShow] = useState(false);
    let [closed, setClosed] = useState(false);
    let [setting, setSetting] = useState<{
        x: number | null,
        y: number | null,
    }>({x: null,y:null});
    let [word, setWord] = useState("");
    let [timeId, setTimeId] = useState<number | null>(null);

    function downKeyHandler(e: MouseEvent) {
        let timeout = setTimeout(() => {
            let regexp = /(\w+|([а-яА-ЯёЁ])+)/uy;
            let {anchorNode, anchorOffset} = document.getSelection() as {anchorNode: any, anchorOffset: number};
            if (anchorNode && anchorNode.nodeType === Node.TEXT_NODE) {
                let start = anchorOffset
                while (anchorNode.data[start].match(/\S/)) {
                    start--
                    if (start <= 0) break;
                }
                regexp.lastIndex = start ? start + 1 : start
                const data = anchorNode && regexp.exec(anchorNode.data);
                setWord(data?.[0] || "")
            }
            setShow(true)
            setSetting({y: e.clientY, x: e.clientX})
            setClosed(false)
        }, 1000);
        setTimeId(timeout)
    }

    const upKeyHandler = () => {
        if (timeId) {
            clearTimeout(timeId)
            setTimeId(null)
        }
        setTimeout(() => setClosed(true), 1000)

    }

    const clickHandler = () => {
        if (show && closed) {
            setShow(false)
            setSetting({x: null, y: null})
        }
    }

    return (
        <div onClick={clickHandler}
             onMouseDown={downKeyHandler}
             onMouseUp={upKeyHandler}
        >
            {children}
            <ThesaurusCard show={show} setting={setting} body={word}/>
        </div>
    )
}

export default ThesaurusSelector