import React, {useEffect, useState} from 'react';
import {DropEvent, FileRejection, useDropzone} from 'react-dropzone';
import {Image} from "react-bootstrap";

const DropImage = () => {

    const [image,setImage] = useState<string>("holder.js/250x350?text=Drop img here");

    useEffect(()=> {
        console.log(image)
    },[image])

    function onDrop<T extends File>(file:T[],reg:FileRejection[],event: DropEvent){
        setImage("http://www.kartinki24.ru/uploads/gallery/main/511/kartinki24_ru_towers_15.jpg")
    }

    const {acceptedFiles, getRootProps, getInputProps} = useDropzone({
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
                />
            </div>
        </section>
    );
}

export default DropImage