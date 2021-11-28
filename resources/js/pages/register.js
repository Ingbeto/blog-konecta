import { useFormik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { register } from '../services/login';
import { setToken } from '../utils/auth-helpers';
import login from '../redux/actions/login';

const validate = (values) => {
	const errors = {};
	if (!values.email)
          errors.email = 'email is required';
        if (!values.name)
          errors.name = 'name is required';
        if (!values.phone)
          errors.phone = 'phone is required';
	if(!values.password)
	   errors.password = 'password is required';
	if(!values.password_confirmation)
	   errors.password_confirmation = 'password confirmation is required';
	if(values.password_confirmation !== values.password){
	   errors.password_confirmation = 'passwords do not match'
	}
	return errors;
}

function Register() {

	const history = useHistory();
	const dispatch = useDispatch();

	const formik = useFormik({
		initialValues: {
			name:'',
			phone:'',
			email: '',
			password: '',
			password_confirmation:'',
		},
		validate: validate,
		onSubmit: handleSubmit,
	});

	async function handleSubmit(values,{resetForm}) {
	    try{
	      const {user,token} = await register(values);
	      setToken(token);
	      dispatch(login(user));
	      resetForm();
	      history.push('/');
	    }catch(error){
              alert(error);
	    }
	}

	return (
		<div className="w-full h-screen flex justify-center items-center">
			<div className="shadow rounded-lg w-96 py-4 px-4">
				<h1 className="text-center font-semibold text-2xl">Registrarse</h1>
				<form onSubmit={formik.handleSubmit}>
					<div className="flex flex-col">
						<label className="mb-2 text-sm">Nombre</label>
						<input
							name="name"
							type="text"
							placeholder="nombre de usuario"
							className="rounded-full py-1 px-2 border text-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-600"
							onChange={formik.handleChange}
							value={formik.values.name}
						/>
						{formik.errors.name && <span className="text-red-500 mt-2">{formik.errors.name}</span>}
					</div>
					<div className="flex flex-col">
						<label className="mt-2 mb-2 text-sm">Email</label>
						<input
							name="email"
							type="email"
							placeholder="Email"
							className="rounded-full py-1 px-2 border text-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-600"
							onChange={formik.handleChange}
							value={formik.values.email}
						/>
						{formik.errors.email && <span className="text-red-500 mt-2">{formik.errors.email}</span>}
					</div>
					<div className="flex flex-col">
						<label className="mt-2 mb-2 text-sm">Telefono</label>
						<input
							name="phone"
							type="text"
							placeholder="digite su numero de telefono"
							className="rounded-full py-1 px-2 border text-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-600"
							onChange={formik.handleChange}
							value={formik.values.phone}
						/>
						{formik.errors.phone && <span className="text-red-500 mt-2">{formik.errors.phone}</span>}
					</div>
					<div className="flex flex-col mt-2">
						<label className="mt-2 mb-2 text-sm">Contraseña</label>
						<input
							name="password"
							type="password"
							placeholder="contraseña"
							className="rounded-full py-1 px-2 border text-gray-500 focus:outline-none focus:ring-1  focus:ring-blue-600"
							onChange={formik.handleChange}
							value={formik.values.password}
						/>
						{formik.errors.password && <span className="text-red-500 mt-2">{formik.errors.password}</span>}
					</div>
					<div className="flex flex-col mt-2">
						<label className="mb-2 text-sm">Confirmación de Contraseña</label>
						<input
							name="password_confirmation"
							type="password"
							placeholder="verificar contraseña"
							className="rounded-full py-1 px-2 border text-gray-500 focus:outline-none focus:ring-1  focus:ring-blue-600"
							onChange={formik.handleChange}
							value={formik.values.password_confirmation}
						/>
						{formik.errors.password_confirmation && <span className="text-red-500 mt-2">{formik.errors.password}</span>}
					</div>
					<button type="submit" className="text-white bg-green-500 w-full py-1 mt-2 rounded-full font-semibold">
						Crear Cuenta
					</button>
					<div className="mt-2 text-sm">
						<span className="mr-2">Ya estas registrado ?</span>
						<Link to="/login" className="text-indigo-500">Iniciar Sesión</Link>
					</div>
				</form>
			</div>
		</div>
	);
}


export default Register;
