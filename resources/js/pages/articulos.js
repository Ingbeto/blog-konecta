import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { getArticulos } from '../services/articulos';

function Articulos () {

  const [articulos, setArticulos] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const loadArticulos = async () => {
       try{
         const {data} = await getArticulos();
         if(isMounted) setArticulos(data);
       }catch(error){
         alert(error);
       }
    }
    loadArticulos();
    return () => {isMounted = false}
  },[]);

  return (
     <div className="flex">
     {articulos && articulos.map(articulo => {
         return (
              <div key={articulo.id} className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm mb-5 ml-4">
                <Link to={`/articulo/${articulo.slug}`} className="flex justify-center">
                    <img className="rounded-t-lg w-full h-80 object-cover object-center" src={`http://localhost:8000/${articulo.imagen}`} alt="" />
                </Link>
                <div className="p-5">
                    <Link to={`/articulo/${articulo.slug}`}>
                        <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2">{articulo.titulo}</h5>
                    </Link>
                    <p className="font-normal text-gray-700 mb-3">{articulo.texto_corto}</p>
                    <Link to={`/articulo/${articulo.slug}`} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center" href="#">
                       Ver Articulo
                    </Link>
                </div>
               </div>
         )
     })}
     </div>

  );
}

export default Articulos;
