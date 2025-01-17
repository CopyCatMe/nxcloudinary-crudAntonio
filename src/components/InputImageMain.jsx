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
export const default_image = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxODcwIiBoZWlnaHQ9IjEyNDciPjxwYXRoIGQ9Ik0wIDBoMTg3MHYxMjQ3SDBWMHoiIGZpbGw9IiNFNUU4RUMiLz48cGF0aCBkPSJtODY0LjM3NCA1MjAuODUzIDEuOTY5LS4wMTFjMi4xOC0uMDExIDQuMzYxLS4wMTUgNi41NDItLjAxOWw0LjY4Ny0uMDJjNS4xMzUtLjAyMSAxMC4yNy0uMDMxIDE1LjQwNS0uMDQxbDUuMzA2LS4wMTNjOC4zMTMtLjAxOSAxNi42MjYtLjAzMyAyNC45MzktLjA0MSA5LjU4OC0uMDEgMTkuMTc1LS4wMzYgMjguNzYzLS4wNzcgNy40MTUtLjAzIDE0LjgzLS4wNDUgMjIuMjQ1LS4wNDggNC40MjYtLjAwMiA4Ljg1Mi0uMDExIDEzLjI3OS0uMDM2IDQuMTY4LS4wMjQgOC4zMzYtLjAyOCAxMi41MDQtLjAxOCAxLjUyNSAwIDMuMDUtLjAwNiA0LjU3NC0uMDIgMTEuNTk1LS4wOTggMTkuOTQgMS40NTMgMjguNjIgOS40OTEgNS43MTYgNi4zNzYgNy45MDggMTIuODYgNy45NCAyMS4yODVsLjAyMiAzLjkxNi4wMDggNC4yOTEuMDIgNC41MjVjLjAyIDQuOTUzLjAzMSA5LjkwNS4wNDEgMTQuODU4bC4wMTMgNS4xMjVjLjAxOSA4LjAzMi4wMzMgMTYuMDYzLjA0MSAyNC4wOTUuMDEgOS4yNS4wMzYgMTguNTAyLjA3NyAyNy43NTMuMDMgNy4xNjIuMDQ1IDE0LjMyMy4wNDggMjEuNDg2LjAwMiA0LjI3MS4wMTEgOC41NDMuMDM2IDEyLjgxNC4wMjQgNC4wMjUuMDI4IDguMDUuMDE4IDEyLjA3NiAwIDEuNDY5LjAwNSAyLjkzNy4wMiA0LjQwNi4wOTggMTEuMDc4LS42OTYgMjIuNTMxLTguNzg4IDMwLjkxLTYuNjQ4IDUuNzAyLTEzLjQ0MiA4LjcwNS0yMi4yODYgOC43MmwtMy45NjQuMDIyLTQuMzEyLS4wMDctNC41Ny4wMTVjLTQuMTI4LjAxNC04LjI1Ni4wMTQtMTIuMzg0LjAxMi0zLjQ1MS0uMDAxLTYuOTAzLjAwMy0xMC4zNTUuMDA4LTguMTQ3LjAxMS0xNi4yOTQuMDEyLTI0LjQ0LjAwNi04LjM5Mi0uMDA2LTE2Ljc4My4wMDYtMjUuMTc0LjAyNy03LjIxNS4wMTgtMTQuNDMuMDI0LTIxLjY0Ni4wMi00LjMwNS0uMDAxLTguNjA5LjAwMS0xMi45MTMuMDE1LTQuMDUxLjAxMy04LjEwMS4wMS0xMi4xNTItLjAwMi0xLjQ4Mi0uMDAyLTIuOTYzIDAtNC40NDQuMDA5LTExLjYyMi4wNi0yMS4xMTYtLjgxMi0yOS44OC05LjEwNC04LjU3LTkuMDE3LTguNjMtMTguODMyLTguNjAzLTMwLjc0YTIxOTUuMDM1IDIxOTUuMDM1IDAgMCAxLS4wNDktMTcuMjMxYzAtMy41MDktLjAwOC03LjAxOC0uMDE3LTEwLjUyNi0uMDE5LTguMjgyLS4wMjItMTYuNTY0LS4wMTUtMjQuODQ2LjAwNy04LjUyNC0uMDE2LTE3LjA0OS0uMDUzLTI1LjU3My0uMDMxLTcuMzM4LS4wNDItMTQuNjc2LS4wMzgtMjIuMDE0LjAwMi00LjM3NC0uMDA0LTguNzQ4LS4wMjgtMTMuMTIzLS4wMjMtNC4xMTUtLjAyLTguMjI5IDAtMTIuMzQ0LjAwMy0xLjUwMy0uMDAyLTMuMDA3LS4wMTYtNC41MS0uMDgtOC44ODQuNzA1LTE1Ljc2NyA1LjYzNi0yMy4zNzRsMS42ODctMi43NWM2LjE4LTYuMDEzIDEzLjExNC05LjM2NiAyMS42ODctOS4zOTd6IiBmaWxsPSIjOUNBNkIwIi8+PHBhdGggZD0ibTg2Ni4xMjIgNTM2Ljg1MyAzLjk2LS4wMjIgNC4zNy0uMDA4IDQuNTgzLS4wMmM0LjE1Ny0uMDE3IDguMzE0LS4wMjggMTIuNDcxLS4wMzZhMTg0NTAuNDUzIDE4NDUwLjQ1MyAwIDAgMSAzMi4xNi0uMDZjOS4zOC0uMDA5IDE4Ljc2LS4wMzUgMjguMTM5LS4wNzYgNy4yNDctLjAzIDE0LjQ5NS0uMDQ1IDIxLjc0My0uMDQ4IDQuMzMtLjAwMiA4LjY1OS0uMDExIDEyLjk4OC0uMDM2IDQuMDc1LS4wMjQgOC4xNDktLjAyOCAxMi4yMjMtLjAxOCAxLjQ5NCAwIDIuOTg4LS4wMDYgNC40ODItLjAyIDIuMDQzLS4wMTcgNC4wODYtLjAwOCA2LjEyOS4wMDNsMy40NjEtLjAwN2M0Ljc3OS43NDYgNy45NCAzLjAzNCAxMS4wMjMgNi42OTkgMS41NzUgMy44NDMgMS41NCA3LjQ1IDEuNDg3IDExLjUzNHYyLjYzMmMtLjAwMSAyLjg2My0uMDI0IDUuNzI1LS4wNDggOC41ODdhMzc2My40NTkgMzc2My40NTkgMCAwIDEtLjA4NyAyMS42NDNjLS4wMyA1LjMzNi0uMDQ0IDEwLjY3Mi0uMDYgMTYuMDA3LS4wMzIgMTAuNDY1LS4wODMgMjAuOTI5LS4xNDYgMzEuMzkzLTcuMzcxLTYuMjQyLTcuMzcxLTYuMjQyLTEwLjU5My05LjQ5NWwtMS44NS0xLjg2LTEuOTE2LTEuOTQyLTIuMDM0LTIuMDQ1Yy0yLjEyMS0yLjEzMy00LjI0LTQuMjctNi4zNTctNi40MDhhNjMzMy44MjQgNjMzMy44MjQgMCAwIDAtOC40MjItOC40ODRjLS42NC0uNjUtMS4yODEtMS4yOTgtMS45NDEtMS45NjdsLTEuODEyLTEuODIxLTEuNTg0LTEuNjAxYy0zLjEyOC0yLjg5LTUuODItNC4yMjItMTAuMTI3LTQuMDgxLTUuNiAxLjY2OC05LjU5MyA2Ljk3OS0xMy41NSAxMS4wOTNhMTQ5My4zOTggMTQ5My4zOTggMCAwIDEtMy4zMTQgMy4zNDUgMTA5My4zMDggMTA5My4zMDggMCAwIDAtNy4wOSA3LjIyNGMtMy43MTkgMy44MjItNy40NjggNy42MTUtMTEuMjIyIDExLjQwNGE2ODE3LjYwNyA2ODE3LjYwNyAwIDAgMC0yMS43OSAyMi4xMzkgODIyNS4yNzcgODIyNS4yNzcgMCAwIDEtMjcuNzU4IDI4LjE5MmMtMy43MzEgMy43Ny03LjQ0NCA3LjU1Ni0xMS4xNDUgMTEuMzU2LTIuMzAyIDIuMzU4LTQuNjE5IDQuNzAxLTYuOTQgNy4wNGEzOTYuNDQ2IDM5Ni40NDYgMCAwIDAtMy4yMDQgMy4yODcgMzQzLjU2NCAzNDMuNTY0IDAgMCAxLTQuMzkzIDQuNDU0bC0yLjQ3NyAyLjUyOEM4NjMgNzA5IDg2MyA3MDkgODU5LjgzNSA3MDguOTEzYy0zLjYxOC0xLjE2NS00Ljc3NC0yLjc4My02LjgzNS01LjkxMy0xLjM4NC0yLjc2Ny0xLjE0Mi01LjAxOC0xLjE2LTguMTE2bC0uMDMxLTMuOTU1LS4wMTgtNC4zNjUtLjAzLTQuNTc4Yy0uMDMtNS4wMi0uMDUxLTEwLjA0LS4wNy0xNS4wNmwtLjAxLTIuNTg4Yy0uMDMtOC4wNTMtLjA1Ny0xNi4xMDYtLjA3NC0yNC4xNmE2Njc4LjQ2IDY2NzguNDYgMCAwIDAtLjEzMy0zMC45MDRjLS4wNDgtNy4yNDItLjA3Mi0xNC40ODUtLjA4LTIxLjcyOC0uMDA0LTQuMzI1LS4wMi04LjY1LS4wNTktMTIuOTc2YTk5MS4zOTQgOTkxLjM5NCAwIDAgMS0uMDMyLTEyLjIxNmMwLTEuNDkyLS4wMS0yLjk4NC0uMDMyLTQuNDc2LS4xNzItMTIuNjY1LS4xNzItMTIuNjY1IDMuNjQ4LTE3LjI1OCAzLjY3MS0zLjQ5NSA2LjE2MS0zLjc0OCAxMS4yMDMtMy43Njd6IiBmaWxsPSIjRTVFOEVCIi8+PHBhdGggZD0iTTk3OSA2MTRjOS42MzYgNC42NTIgMTcuNDkzIDEzLjIzMiAyNS4yNSAyMC41bDEuNDkzIDEuMzk3YzExLjIxNSAxMC41ODcgMjEuMzI0IDIwLjY4NiAyMi4zNTUgMzYuODgyLjE2OCAxMS41NS0uMTg3IDI0LjU0Mi03LjA5OCAzNC4yMjEtNS43MTYgNC4wODMtMTEuOTggMy40LTE4LjcwNyAzLjM0bC0zLjg3NC4wMDJjLTMuNDk0IDAtNi45ODctLjAxNy0xMC40OC0uMDM4LTMuNjU2LS4wMTktNy4zMTEtLjAyLTEwLjk2Ny0uMDI0YTY4OTMuMzggNjg5My4zOCAwIDAgMS0yMC43NS0uMDY0Yy03Ljg3Ni0uMDM0LTE1Ljc1My0uMDUtMjMuNjMtLjA2NUEyMjEzMy4wNyAyMjEzMy4wNyAwIDAgMSA4ODQgNzEwYzQuNjc3LTUuNjIgOS42NzEtMTAuODA4IDE0Ljg1MS0xNS45NjVsMi42MzMtMi42MzNjMi4zNjQtMi4zNjMgNC43My00LjcyNCA3LjA5Ni03LjA4MyAyLjQ4LTIuNDc0IDQuOTU4LTQuOTUxIDcuNDM1LTcuNDI4IDQuNjgzLTQuNjggOS4zNy05LjM1NyAxNC4wNTYtMTQuMDM0IDUuMzQtNS4zMjggMTAuNjc2LTEwLjY2IDE2LjAxMi0xNS45OUE4NTc0Mi4xODggODU3NDIuMTg4IDAgMCAxIDk3OSA2MTR6IiBmaWxsPSIjRTVFOEVCIi8+PHBhdGggZD0iTTkxMi4zMTMgNTY1YzYuNDg2IDMuNjMgMTAuMzI1IDkuMDIgMTIuNjg3IDE2IDEuMTY5IDguMDEtLjQyMiAxNC4zNTUtNSAyMS0xLjkwNyAyLjEzMi0zLjU3NSAzLjM2Ny02IDVsLTIuNjg4IDEuODEzYy01Ljc1IDIuMDYxLTExLjU1NSAxLjcyOC0xNy41LjU2Mi03LjA2My0zLjQ1My0xMS43NC03LjM2MS0xNC45Ni0xNC42NjgtMi4xMS02LjcwNC0xLjY3OS0xMi42MDcgMS4xNDgtMTkuMDIgNi41NjYtMTEuNzMzIDIwLjAzNy0xNi4xOTQgMzIuMzEzLTEwLjY4N3oiIGZpbGw9IiM5Q0E2QjAiLz48cGF0aCBkPSJNOTA1IDU3OWMyLjQzOCAxLjU2MyAyLjQzOCAxLjU2MyA0IDQgLjU2MyAzLjk0LjYwNCA2LjA1OC0xLjU2MyA5LjQzOC0zLjM4IDIuMTY2LTUuNDk3IDIuMTI1LTkuNDM3IDEuNTYyLTIuNDM4LTEuNTYzLTIuNDM4LTEuNTYzLTQtNC0uNTYzLTMuOTQtLjYwNC02LjA1OCAxLjU2My05LjQzOCAzLjM4LTIuMTY2IDUuNDk3LTIuMTI1IDkuNDM3LTEuNTYyeiIgZmlsbD0iI0U0RTdFQSIvPjwvc3ZnPg=="


/*
La propiedad image puede tomar 3 tipos de valores string:
- imagen codificada en base64
- nombre de archivo dentro de la carpeta public, p.ej: 'image.png' o 'images/image.png'
- nombre de URL de archivo, p.ej: 'https://.../image.png'
*/
export default function InputImage({ image = default_image }) {

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
                    width: '300px',
                    height: '300px',
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

