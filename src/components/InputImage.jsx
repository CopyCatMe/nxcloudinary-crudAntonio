'use client'

import { useState } from "react";


// img: Drag over
function dragOverHandler(ev) {
    ev.preventDefault();
}


// img: Drop
function dropHandler(ev) {
    ev.preventDefault();
    const imgPreview = ev.target;
    const fileInput = ev.target.nextSibling;
    // console.dir(ev.target)

    if (ev.dataTransfer.items) {
        // Use DataTransferItemList interface to access the file(s)
        // console.log(...ev.dataTransfer.items);
        [...ev.dataTransfer.items].forEach((item, i) => {
            // If dropped items are files ...
            if (item.kind === "file") {
                const file = item.getAsFile();
                fileInput.files = ev.dataTransfer.files;  // IMPORTANTE: Copia imagen al input type='file'

                let reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onloadend = () => imgPreview.src = reader.result
            }
        });
    }
}


// img: Double click
function dblclickHandler(ev) {
    const fileInput = ev.target.nextSibling;

    fileInput.click();
}


// input: Change
function changeHandler(ev) {
    const imgPreview = ev.target.previousSibling;
    const fileInput = ev.target;

    if (fileInput.files && fileInput.files[0]) {
        var reader = new FileReader();
        reader.readAsDataURL(fileInput.files[0]);   // elegimos únicamente el primer archivo
        reader.onload = (e) => imgPreview.setAttribute("src", e.target.result);
    }
}

/*
Herramientas útiles para convertir imágenes:
- https://convertio.co/es/ (Para convertir cualquier formato excepto Base64)
- https://base64.guru/converter/encode/image/svg  (Para convertir a Base64)
*/


/*
La propiedad image puede tomar 3 tipos de valores string:
- imagen codificada en base64
- nombre de archivo dentro de la carpeta public, p.ej: 'image.png' o 'images/image.png'
- nombre de URL de archivo, p.ej: 'https://.../image.png'
*/
export default function InputImage({ image }) {

    return (
        <>
            <img
                id='imgPreview'
                src={image}
                onDrop={dropHandler}
                onDragOver={dragOverHandler}
                onDoubleClick={dblclickHandler}
                style={{
                    display: 'block',
                    aspectRatio: 1,
                    width: '800px',
                    height: '800px',
                    objectFit: 'cover',
                    objectPosition: 'center'
                }} />
            <input
                type='file'
                name='file'
                accept='image/*'
                onChange={changeHandler}
                style={{ display: 'none' }} />
        </>
    )
}

