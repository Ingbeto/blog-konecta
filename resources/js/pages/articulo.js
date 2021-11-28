import React,{useEffect,useState} from 'react';
import { Link, useParams } from 'react-router-dom';
import { getArticulo, getArticulos } from '../services/articulos';

function Articulo() {

 let {slug} = useParams();

 const [articulo,setArticulo] = useState({});
 const [articulos, setArticulos] = useState([]);

 useEffect(() => {
   let isMounted = true;
   const loadArticulo = async () => {
      try{
	const {data} = await getArticulo(slug);
	if(isMounted) setArticulo(data);
      }catch(error){
	alert(error);
      }
   }
   loadArticulo();
   return () => {isMounted = false};
 }, [slug]);

 useEffect(() => {
   let isMounted = true;
   const loadArticulos = async () => {
	try{
	   const {data} = await getArticulos();
	   if(isMounted) setArticulos(data);
	}catch(error) {
	   alert(error);
	}
   }
   loadArticulos();
   return () => {isMounted = false};
 }, []);

 return (
   <div className="flex mt-2">
       <div className="flex-grow">
	  <Link to="/" className="flex text-indigo-500">
	       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
	       </svg>
	       <span className="ml-2">volver</span>
	  </Link>
          <h1 className="text-2xl font-semibold">{articulo.titulo}</h1>
          <img className="mt-2 w-full h-80 object-cover object-center" src={`http://localhost:8000/${articulo.imagen}`} alt="" />
	  <div className="text-indigo-500 italic text-xl mt-1">{articulo.texto_corto}</div>
	  <div className="text-xl">
	     {articulo.texto_largo}
	  </div>
       </div>
       <aside className="w-1/3 ml-4">
	  <h1 className="font-semibold text-xl mb-2 text-center">Articulos Relacionados</h1>
	  {articulos.map(articulo => {
	     return (
		<div key={articulo.id} className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm mb-5">
                <Link to={`/articulo/${articulo.slug}`} className="flex justify-center">
                    <img className="rounded-t-lg w-full h-28 object-cover object-center" src={`http://localhost:8000/${articulo.imagen}`} alt="" />
                </Link>
                <div className="p-2">
                    <Link to={`/articulo/${articulo.slug}`}>
                        <h5 className="text-gray-900 font-bold text-md tracking-tight mb-2">{articulo.titulo}</h5>
                    </Link>
                </div>
               </div>
	     );
	  })}
       </aside>
   </div>
 );
}

export default Articulo;
