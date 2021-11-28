import {useFormik} from 'formik';
import React, {useState, useEffect} from 'react';
import {createCategoria, destroyCategoria, getCategorias, updateCategoria} from "../services/categorias";

const validate = (values) => {
    const errors = {};
    if (!values.nombre)
        errors.nombre = 'el nombre es requerido';
    return errors;
}

function Categorias() {
    const [categorias, setCategorias] = useState([]);

    const formik = useFormik({
        initialValues: {
            id: '',
            nombre: '',
            descripcion: ''
        },
        validate: validate,
        onSubmit: handleSubmit
    });

    async function handleSubmit(values, {resetForm, setErrors}) {
        if (values.id) {
            try {
                const {data} = await updateCategoria(values);
                const list = categorias.filter(data => {
                    return data.id !== values.id
                });
                list.push(data);
                setCategorias(list);
                resetForm();
            } catch (error) {
                alert(error);
            }
            return;
        }

        try {
            const {data} = await createCategoria(values);
            categorias.push(data);
            const ListCategorias = categorias;
            setCategorias(ListCategorias);
            resetForm();
        } catch (error) {
            alert(error);
        }
    }

    useEffect(() => {
        let isMounted = true;
        const loadCategorias = async () => {
            try {
                const {data} = await getCategorias();
                if (isMounted) setCategorias(data);
            } catch (error) {
                alert(error);
            }
        }
        loadCategorias();
        return () => {
            isMounted = false
        };
    }, []);


    async function destroy(id) {
        try {
            await destroyCategoria(id);
            const listCategoria = categorias.filter(item => {
                return item.id !== id
            });
            setCategorias(listCategoria);
        } catch (error) {
            alert(error);
        }
    }

    async function edit(id) {
        const categoria = categorias.find((categoria) => {
            return categoria.id === id;
        });

        formik.setFieldValue('id', categoria.id);
        formik.setFieldValue('nombre', categoria.nombre);
        formik.setFieldValue('descripcion', categoria.descripcion ?? '');
        setTimeout(() => formik.setFieldTouched('nombre', true))
    }


    return (
        <div className="flex">
            <div className="flex mx-auto w-full">
                <div className="flex flex-col w-full">
                    <h1 className="mt-6 mb-6 text-xl text-center w-full font-semibold py-2">Categorías</h1>
                    <div className="shadow p-5">
                        <form onSubmit={formik.handleSubmit}>
                            <div className="flex">
                                <div className="flex flex-col w-1/2">
                                    <label className="mb-2 text-sm">Nombre</label>
                                    <input
                                        name="nombre"
                                        type="text"
                                        placeholder="ingrese nombre"
                                        className="rounded-full py-1 px-2 border text-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-600"
                                        onChange={formik.handleChange}
                                        value={formik.values.nombre}
                                    />
                                    {formik.errors.nombre &&
                                    <span className="text-red-500 mt-2">{formik.errors.nombre}</span>}
                                </div>
                                <div className="flex flex-col w-1/2 ml-2">
                                    <label className="mb-2 text-sm">Descripción</label>
                                    <input
                                        name="descripcion"
                                        type="text"
                                        placeholder="describa la categoría"
                                        className="rounded-full py-1 px-2 border text-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-600"
                                        onChange={formik.handleChange}
                                        value={formik.values.descripcion}
                                    />
                                    {formik.errors.descripcion &&
                                    <span className="text-red-500 mt-2">{formik.errors.descripcion}</span>}
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
                    <h1 className="mt-6 mb-6 text-xl text-center font-semibold">Lista de Categorías</h1>
                    <div className="w-full">
                        <div className="border-b border-white-200 shadow">
                            <table className="w-full">
                                <thead className="bg-blue-50">
                                <tr>
                                    <th className="px-6 py-2 text-base text-center text-gray-500">
                                        ID
                                    </th>
                                    <th className="px-6 py-2 text-base text-center text-gray-500">
                                        Name
                                    </th>
                                    <th className="px-6 py-2 text-base text-center text-gray-500">
                                        Description
                                    </th>
                                    <th className="px-6 py-2 text-base text-center text-gray-500">
                                        Edit
                                    </th>
                                    <th className="px-6 py-2 text-base text-center text-gray-500">
                                        Delete
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="bg-white">
                                {categorias && categorias.map(item => {
                                    return (
                                        <tr className="whitespace-nowrap" key={item.id}>
                                            <td className="px-6 py-4 text-center text-sm text-gray-500">
                                                {item.id}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className=" text-center text-sm text-gray-900">
                                                    {item.nombre}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div
                                                    className=" text-center text-sm text-gray-500">{item.descripcion}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <a onClick={() => edit(item.id)}
                                                   className="px-4 py-1 text-sm text-white bg-blue-400 rounded-full">Editar</a>
                                            </td>
                                            <td className="px-6 py-4">
                                                <a onClick={() => destroy(item.id)}
                                                   className="cursor-pointer px-4 py-1 text-sm text-white bg-red-400 rounded-full">Eliminar</a>
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

export default Categorias;
