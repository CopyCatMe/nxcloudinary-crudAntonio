'use server'
import cloudinary from '@/lib/cloudinary'
import { revalidatePath } from 'next/cache';
import path from 'node:path'

/*
OPERACIONES CRUD

C: CREATE -> imgCreate
R: READ   -> imgRetrieveAll
U: UPDATE -> imgUpdate
D: DELETE -> imgDelete

*/

const FOLDER = 'galería'




export async function imgRetrieveAll() {

  const result = await cloudinary.api.resources_by_asset_folder(FOLDER, {
    max_results: 500
  });

  return result.resources;
}




export async function imgCreate(prevState, formData) {
  const file = formData.get('file')

  // console.log(file);

  const fileBuffer = await file.arrayBuffer();

  let mime = file.type;
  let encoding = 'base64';
  let base64Data = Buffer.from(fileBuffer).toString('base64');
  let fileUri = 'data:' + mime + ';' + encoding + ',' + base64Data;

  try {
    // Transformamos imagen al subirla
    // width: 600, height: 370, aspect-ratio: 1.62
    const result = await cloudinary.uploader.upload(fileUri, {
      invalidate: true,
      asset_folder: FOLDER,
      public_id: path.parse(file.name).name,
      aspect_ratio: "1",
      width: 800,
      height: 800,
      crop: "fill",
      gravity: "center"
    })

    revalidatePath('/');
    return { success: `Imagen subida: ${result.public_id}` }
  } catch (error) {
    return { error: error.message }
  }
}




export async function imgUpdate(prevState, formData) {
  const public_id = formData.get('public_id')
  const file = formData.get('file')

  const fileBuffer = await file.arrayBuffer();

  let mime = file.type;
  let encoding = 'base64';
  let base64Data = Buffer.from(fileBuffer).toString('base64');
  let fileUri = 'data:' + mime + ';' + encoding + ',' + base64Data;

  try {
    // Transformamos imagen al subirla
    // width: 600, height: 370, aspect-ratio: 1.62
    const result = await cloudinary.uploader.upload(fileUri, {
      invalidate: true,
      asset_folder: FOLDER,
      public_id,
      aspect_ratio: "1.62",
      width: 600,
      crop: "fill",
      gravity: "center"
    })

    revalidatePath('/');
    return { success: `Imagen actualizada: ${result.public_id}` }
  } catch (error) {
    console.log(error);
    return { error: error.message }
  }
}



/*
cuando eliminamos un elemento usaremos refresh en el cliente 
en lugar de revalidatePath en el servidor para dar tiempo
a mostrar el mensaje success o error antes de 
eliminar el elemento de la vista
*/
export async function imgDelete(prevState, formData) {
  const public_id = formData.get('public_id')

  try {
    await cloudinary.uploader.destroy(public_id, { invalidate: true });

    // revalidatePath('/');  
    return { success: `Imagen eliminada: ${public_id}` }
  } catch (error) {
    console.log(error);
    return { error: error.message }
  }
}
