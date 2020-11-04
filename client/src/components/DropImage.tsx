import React, {useEffect, useState} from 'react';
import {DropEvent, FileRejection, useDropzone} from 'react-dropzone';
import {Image} from "react-bootstrap";
import {CloudinaryApi} from "../api";

const DropImage = () => {

    const [image, setImage] = useState<string>("holder.js/250x350?text=Drop img here");

    useEffect(() => {
        console.log(image)
    }, [image])

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
            <div {...getRootProps({className: 'dropzone'})}>
                <input {...getInputProps()} />
                <Image src={image}
                       thumbnail
                       style={{minHeight: 350, minWidth: 225}}
                />
            </div>
        </section>
    );
}

export default DropImage