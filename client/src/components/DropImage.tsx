import React, {useEffect, useRef} from 'react';
import {FileRejection, useDropzone} from 'react-dropzone';
import {Image} from "react-bootstrap";
import {CloudinaryApi} from "../api";
import Holder from "holderjs"

type Props = {
    image?: string,
    setImage: React.Dispatch<string | undefined>
    maxHeight?: number | string
    maxWidth?: number | string
    component?: any
}

const DropImage: React.FC<Props> = ({
                                        component,
                                        image,
                                        setImage,
                                        maxHeight = 350,
                                        maxWidth = 250,
                                    }) => {

    const ref = useRef() as any;

    useEffect(() => {
        if (!component) Holder.run(ref.target)
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
        <section className="container"
                 style={{maxHeight, maxWidth}}
        >
            <div {...getRootProps({className: 'dropzone'})}>
                <input {...getInputProps()} />
                {component
                    ? component
                    : (
                        < Image src={image ? image : `holder.js/${maxWidth}x${maxHeight}?text=Drop img here`}
                                ref={ref}
                                thumbnail
                        />
                    )
                }
            </div>
        </section>
    );
}

export default DropImage