import Axios from 'axios';

export const getBlogs = async () => {
    const {data} = await Axios.get('api/blog');
    console.log(data);
    return data;
}

export const destroyBlog = async (id) => {
    const {data} = await Axios.delete('api/blog/' + id);
    return data;
}

export const createBlog = async (values) => {
    const formData = new FormData();
    formData.append("titulo", values.titulo);
    formData.append("texto_corto", values.texto_corto);
    formData.append("texto_largo", values.texto_largo);
    formData.append("categoria_id", values.categoria_id);
    formData.append("imagen", values.imagen);
    const {data} = await Axios.post('api/blog', formData);
    return data;
}

export const updateBlog = async (values) => {
    const formData = new FormData();
    formData.append("titulo", values.titulo);
    formData.append("texto_corto", values.texto_corto);
    formData.append("texto_largo", values.texto_largo);
    formData.append("categoria_id", values.categoria_id);
    formData.append("imagen", values.imagen);
    const {data} = await Axios.post('api/blog/edit/' + values.id, formData);
    return data;
}
