'use client'
import InputImage, { hola } from "@/components/InputImage"
import InputImageMain, { default_image } from "@/components/InputImageMain"
import { imgCreate } from '@/lib/actions';
import { CloudUpload } from 'lucide-react';
import { useActionState, useEffect } from "react";
import { toast } from 'sonner';


function ImageNew() {
    const [stateCreate, actionCreate, pendingCreate] = useActionState(imgCreate, null)


    useEffect(() => {
        if (stateCreate?.success) toast.success(stateCreate.success)
        if (stateCreate?.error) toast.error(stateCreate.error)
        document.getElementById('preview').firstChild.setAttribute('src', default_image)
    }, [stateCreate])


    return (
        <form id="preview" className='w-fit relative mb-10'>
            <InputImageMain />
            <button formAction={actionCreate} title='SUBIR' disabled={pendingCreate}
                className={`absolute bottom-2 right-2 p-1 border border-slate-300 bg-green-400 text-white hover:bg-green-500 rounded-full disabled:bg-slate-400`}>
                <CloudUpload />
            </button>
        </form>
    );
}

export default ImageNew;