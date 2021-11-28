import React from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { logout as exit } from '../services/login';
import { removeToken } from '../utils/auth-helpers';
import logout from '../redux/actions/logout';

function NavBar() {

    const history = useHistory();
    const dispatch = useDispatch();

    const user = useSelector(state => state.user,shallowEqual);

    const signOff = async () => {
	try{
	  await exit();
	  removeToken();
	  dispatch(logout());
	  history.push('/login');
	}catch(error){
	  alert(error);
	}
    }

    return  (
	<div className="flex shadow bg-blue-50 py-4">
         <div className="flex justify-between w-4/5 mx-auto">
	   <ul className="flex">
	     {user && user.type === 'Administrador' && (
	       <>
		 <li className="mr-6">
		   <Link to="/usuarios">Usuarios</Link>
		 </li>
		 <li className="mr-6">
		   <Link to="/blogs">Blogs</Link>
		 </li>
		 <li className="mr-6">
		   <Link to="/categorias">Categorias</Link>
		 </li>
		</>
	     )}
	  </ul>
	  <div className="flex">
	     <div>
             <Link to="/" className="cursor-pointer mr-6">Inicio</Link>
		     <button className="cursor-pointer" onClick={signOff}>Salir</button>
	     </div>
	  </div>
	</div>
      </div>
    )
}

export default NavBar;
