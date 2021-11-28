import { useFormik } from 'formik';
import React, { useState, useEffect } from 'react';
import { createUser, destroyUser, getUsers, updateUser } from '../services/users';

const validate = (values) => {
    const errors = {};
    if (!values.email)
        errors.email = 'email is required';
    if (!values.name)
        errors.name = 'name is required';
    if (!values.phone)
        errors.phone = 'phone is required';
    return errors;
}

function Usuarios() {

    const [users, setUsers] = useState([]);

    const formik = useFormik({
        initialValues: {
            id:'',
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
            phone: '',
            type: '',
        },
        validate: validate,
        onSubmit: handleSubmit
    });

    function validatePassword(values) {
        const errors = {};
        if(!values.password)
          errors.password = 'password required';
        if(!values.password_confirmation)
          errors.password_confirmation = 'password required';
        if(values.password_confirmation !== values.password)
           errors.password = 'password no coinciden';
        return errors;
    }

    async function handleSubmit(values,{resetForm,setErrors}) {
        const validate = validatePassword(values);
        if(values.id === '' && Object.keys(validate).length > 0){
            setErrors(validate);
            return;
        }
        if(values.id) {
            try {
                const { user } = await updateUser(values);
                const list = users.filter(user => {
                   return user.id !== values.id
                });
                list.push(user);
                setUsers(list);
                resetForm();
            } catch (error) {
                alert(error);
            }
            return;
        }

        try {
            const { user } = await createUser(values);
            users.push(user);
            const ListUsers = users;
            setUsers(ListUsers);
            resetForm();
        } catch (error) {
            alert(error);
        }
    }

    useEffect(() => {
        let isMounted = true;
        const loadUsers = async () => {
            try {
                const { users } = await getUsers();
                if (isMounted) setUsers(users);
            } catch (error) {
                alert(error);
            }
        }
        loadUsers();
        return () => { isMounted = false };
    }, []);

    async function destroy(id) {
        try {
            await destroyUser(id);
            const listUsers = users.filter(item => {
                return item.id !== id
            });
            setUsers(listUsers);
        } catch (error) {
            alert(error);
        }
    }

    async function edit(id) {

       const user =  users.find((user) => {
            return user.id === id;
       });

      formik.setFieldValue('id', user.id);
      formik.setFieldValue('name',user.name);
      formik.setFieldValue('phone',user.phone);
      formik.setFieldValue('email',user.email);
      formik.setFieldValue('type',user.type);
      setTimeout(() => formik.setFieldTouched('name', true))

    }

    return (
        <div className="flex">
            <div className="flex mx-auto w-full">
                <div className="flex flex-col w-full">
                    <h1 className="text-xl text-center font-semibold py-2">Usuario</h1>
                    <div className="shadow p-5">
                        <form onSubmit={formik.handleSubmit}>
                            <div className="flex">
                                <div className="flex flex-col w-1/2">
                                    <label className="mb-2 text-sm">Nombre</label>
                                    <input
                                        name="name"
                                        type="text"
                                        placeholder="nombre"
                                        className="rounded-full py-1 px-2 border text-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-600"
                                        onChange={formik.handleChange}
                                        value={formik.values.name}
                                    />
                                    {formik.errors.name && <span className="text-red-500 mt-2">{formik.errors.name}</span>}
                                </div>
                                <div className="flex flex-col w-1/2 ml-2">
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
                            </div>
                            <div className="flex">
                                <div className="flex flex-col mt-2 w-1/2">
                                    <label className="mb-2 text-sm">Telefono</label>
                                    <input
                                        name="phone"
                                        type="text"
                                        placeholder="digite número de telefono"
                                        className="rounded-full py-1 px-2 border text-gray-500 focus:outline-none focus:ring-1  focus:ring-blue-600"
                                        onChange={formik.handleChange}
                                        value={formik.values.phone}
                                    />
                                    {formik.errors.phone && <span className="text-red-500 mt-2">{formik.errors.phone}</span>}
                                </div>
                                <div className="flex flex-col mt-2 w-1/2 ml-2">
                                    <label className="mb-2 text-sm">Tipo</label>
                                    <select name="type" onChange={formik.handleChange} value={formik.values.type}>
                                        <option value={''}>seleccione un rol</option>
                                        <option value="Administrador">Administrador</option>
                                        <option value="Usuario">Usuario</option>
                                    </select>
                                    {formik.errors.type && <span className="text-red-500 mt-2">{formik.errors.type}</span>}
                                </div>
                            </div>
                            <div className="flex">
                                <div className="flex flex-col mt-2 w-1/2">
                                    <label className="mb-2 text-sm">Contraseña</label>
                                    <input
                                        name="password"
                                        type="password"
                                        placeholder="ingrese contraseña"
                                        className="rounded-full py-1 px-2 border text-gray-500 focus:outline-none focus:ring-1  focus:ring-blue-600"
                                        onChange={formik.handleChange}
                                        value={formik.values.password}
                                    />
                                    {formik.errors.password && <span className="text-red-500 mt-2">{formik.errors.password}</span>}
                                </div>
                                <div className="flex flex-col mt-2 w-1/2 ml-2">
                                    <label className="mb-2 text-sm">Confirmar Contraseña</label>
                                    <input
                                        name="password_confirmation"
                                        type="password"
                                        placeholder="confirme la contraseña"
                                        className="rounded-full py-1 px-2 border text-gray-500 focus:outline-none focus:ring-1  focus:ring-blue-600"
                                        onChange={formik.handleChange}
                                        value={formik.values.password_confirmation}
                                    />
                                    {formik.errors.password && <span className="text-red-500 mt-2">{formik.errors.password}</span>}
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <button type="submit"
                                        className="text-white bg-green-500 w-72 py-1 mt-2 rounded-full font-semibold">
                                    Guardar
                                </button>
                            </div>
                        </form>
                    </div>
                    <h1 className="text-center text-xl my-2 font-semibold">Lista de usuarios</h1>
                    <div className="w-full">
                        <div className="border-b border-gray-200 shadow">
                            <table className="w-full">
                                <thead className="bg-blue-50">
                                    <tr>
                                        <th className="px-6 py-2 text-center text-base text-gray-500">
                                            ID
                                        </th>
                                        <th className="px-6 py-2 text-center text-base text-gray-500">
                                            Name
                                        </th>
                                        <th className="px-6 py-2 text-center text-base text-gray-500">
                                            Email
                                        </th>
                                        <th className="px-6 py-2 text-center text-base text-gray-500">
                                            Tipo
                                        </th>
                                        <th className="px-6 py-2 text-center text-base text-gray-500">
                                            Edit
                                        </th>
                                        <th className="px-6 py-2 text-center text-base text-gray-500">
                                            Delete
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    {users && users.map(item => {
                                        return (
                                            <tr className="whitespace-nowrap" key={item.id} >
                                                <td className="px-6 py-4 text-center text-sm text-gray-500">
                                                    {item.id}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-center text-gray-900">
                                                        {item.name}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-center text-gray-500">{item.email}</div>
                                                </td>
                                                <td className="px-6 py-4 text-center text-sm text-gray-500">
                                                    {item.type}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <a onClick={() => edit(item.id)} className="px-4 py-1 text-center text-sm text-white bg-blue-400 rounded">Edit</a>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <a onClick={() => destroy(item.id)} className="cursor-pointer px-4 py-1 text-center text-sm text-white bg-red-400 rounded">Delete</a>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Usuarios;
