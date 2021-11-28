import Axios from 'axios';

export const getCategorias = async () => {
    const {data} = await Axios.get('api/categoria');
    return data;
}

export const destroyCategoria = async (id) => {
    const {data} = await Axios.delete('api/categoria/' + id);
    return data;
}

export const createCategoria = async (values) => {
    const {data} = await Axios.post('api/categoria', values);
    return data;
}

export const updateCategoria = async (values) => {
    const {data} = await Axios.put('api/categoria/' + values.id, values);
    return data;
}


