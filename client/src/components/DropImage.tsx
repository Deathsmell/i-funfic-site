import React from 'react';
import {FileRejection, useDropzone} from 'react-dropzone';
import {Image} from "react-bootstrap";
import {CloudinaryApi} from "../api";

type Props = {
    image?: string,
    setImage: React.Dispatch<React.SetStateAction<string | undefined>>
}

const DropImage: React.FC<Props> = ({image,setImage}) => {


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
                {
                    // FIXME: sometimes then redirect on this page holder.js dont work
                }
                <Image src={image ? image : "holder.js/250x350?text=Drop img here"}
                       thumbnail
                       style={{minHeight: 350, minWidth: 225}}
                />
            </div>
        </section>
    );
}

export default DropImage