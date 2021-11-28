import { data } from 'autoprefixer';
import axios from 'axios';

export const getArticulos = async () => {
   const {data} = await axios.get('/api/blog');
   return data;
}

export const getArticulo = async slug => {
   const {data} = await axios.get('api/blog/'+slug);
   return data;
}