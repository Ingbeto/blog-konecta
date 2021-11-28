import React from 'react';
import { useFormik } from 'formik';
import {setToken} from '../utils/auth-helpers';
import {login as auth, whoami} from '../services/login';
import { Link, useHistory } from 'react-router-dom';
import login  from '../redux/actions/login';
import { useDispatch } from 'react-redux';

const validate = (values) => {
    const errors = {};
    if(!values.email)
      errors.email = 'email is required';
    if(!values.password)
       errors.password = 'password is required';
    return errors;
}

function Login() {

  const history = useHistory();
  const dispatch = useDispatch();

  const formik = useFormik({
     initialValues: {
       email: '',
       password: '',
     },
     validate : validate,
     onSubmit: handleSubmit,
   });

   async function handleSubmit(values){
	try{
	   const {token} = await auth(values);
	   setToken(token);
	   const {user} = await whoami();
	   dispatch(login(user));
	   history.push('/');
	}catch(error) {
	  alert(error);
	}
   }

  return (
   <div className="w-full h-screen flex justify-center items-center">
      <div className="shadow rounded-lg w-96 py-4 px-4">
	  <h1 className="text-center font-semibold text-2xl">Iniciar Sesión</h1>
	  <form onSubmit={formik.handleSubmit}>
	     <div className="flex flex-col">
		<label className="mb-2 text-sm">Email</label>
		<input
		 name="email"
		 type="email"
		 placeholder="user"
		 className="rounded-full py-1 px-2 border text-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-600"
		 onChange={formik.handleChange}
		 value={formik.values.email}
		/>
		{formik.errors.email && <span className="text-red-500 mt-2">{formik.errors.email}</span>}
	     </div>
	     <div className="flex flex-col mt-2">
		<label className="mb-2 text-sm">Contraseña</label>
		<input
		  name="password"
		  type="password"
		  placeholder="Ingrese contraseña"
		  className="rounded-full py-1 px-2 border text-gray-500 focus:outline-none focus:ring-1  focus:ring-blue-600"
		  onChange={formik.handleChange}
		  value={formik.values.password}
		/>
		{formik.errors.password && <span className="text-red-500 mt-2">{formik.errors.password}</span>}
	     </div>
	     <div className="flex justify-end mt-2">
		 <a href="" className="text-indigo-500 text-sm">Olvidó su contraseña ?</a>
	     </div>
	     <button className="text-white bg-green-500 w-full py-1 mt-2 rounded-full font-semibold">
		Ingresar
	     </button>
	     <div className="mt-2 text-sm">
		<span className="mr-2">No esta registrado aún ?</span>
		<Link to="register" className="text-indigo-500">Crear Cuenta</Link>
	     </div>
	  </form>
      </div>
   </div>
  );
}

export default Login;
