import React, {useEffect, useRef} from 'react';
import {FileRejection, useDropzone} from 'react-dropzone';
import {Image, Row} from "react-bootstrap";
import {CloudinaryApi} from "../api";
import Holder from "holderjs"

type Props = {
    image?: string,
    setImage: React.Dispatch<string | undefined>
    height?: number | string
    width?: number | string
    component?: any
    text?: string
}

const DropImage: React.FC<Props> = ({
                                        component,
                                        image,
                                        setImage,
                                        height = 350,
                                        width = 250,
                                        text = "Drop img here"
                                    }) => {

    const ref = useRef() as any;

    useEffect(() => {
        if (!component && !image) Holder.run(ref.target)
    })

    function onDrop<T extends File>(file: T[], reg: FileRejection[]) {
        CloudinaryApi.upload(file[0]).then(resp => {
            setImage(resp.data.url)
        })
        if (reg.length) {
            console.log("some error")
        }
    }

    const {getRootProps, getInputProps} = useDropzone({
        maxFiles: 1,
        accept: "image/*",
        onDrop
    });

    return (
        <section className="container">
            <Row {...getRootProps({className: 'dropzone justify-content-center'})}>
                <input {...getInputProps()} />
                {
                    component && !image
                        ? component
                        : < Image src={image ? image : `holder.js/${width}x${height}?text=${text}`}
                                  ref={ref}
                                  thumbnail
                        />
                }
            </Row>
        </section>
    );
}

export default DropImage