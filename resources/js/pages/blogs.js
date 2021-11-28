import {useFormik} from 'formik';
import React, {useState, useEffect} from 'react';
import {getBlogs, createBlog, updateBlog, destroyBlog} from "../services/blogs";
import {getCategorias} from "../services/categorias";

const validate = (values) => {
    const errors = {};
    if (!values.titulo)
        errors.titulo = 'Titulo requerido';
    if (!values.texto_corto)
        errors.texto_corto = 'Texto corto requerido';
    if (!values.texto_largo)
        errors.texto_largo = 'Texto largo requerido';
    if (!values.categoria_id)
        errors.categoria_id = 'Categoria requerida';
    return errors;
}

function Blogs() {
    const [blogs, setBlogs] = useState([]);
    const [categorias, setCategorias] = useState([]);

    const formik = useFormik({
        initialValues: {
            id: '',
            titulo: '',
            slug: '',
            texto_corto: '',
            texto_largo: '',
            imagen: ''
        },
        validate: validate,
        onSubmit: handleSubmit
    });

    async function handleSubmit(values, {resetForm, setErrors}) {
        if (values.id) {
            try {
                const {data} = await updateBlog(values);
                const list = blogs.filter(data => {
                    return data.id !== values.id
                });
                list.push(data);
                setBlogs(list);
                resetForm();
            } catch (error) {
                alert(error);
            }
            return;
        }
        try {
            const {data} = await createBlog(values);
            console.log(data);
            blogs.push(data);
            const ListBlogs = blogs;
            setBlogs(ListBlogs);
            resetForm();
        } catch (error) {
            alert(error);
        }
    }

    useEffect(() => {
        let isMounted = true;
        const loadBlogs = async () => {
            try {
                const {data} = await getBlogs();
                if (isMounted) setBlogs(data);
            } catch (error) {
                alert(error);
            }
        }
        loadBlogs();
        return () => {
            isMounted = false
        };
    }, []);

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
            await destroyBlog(id);
            const listBlog = blogs.filter(item => {
                return item.id !== id
            });
            setBlogs(listBlog);
        } catch (error) {
            alert(error);
        }
    }

    async function edit(id) {
        const blog = blogs.find((blog) => {
            return blog.id === id;
        });
        formik.setFieldValue('id', blog.id);
        formik.setFieldValue('titulo', blog.titulo);
        formik.setFieldValue('slug', blog.slug);
        formik.setFieldValue('texto_corto', blog.texto_corto);
        formik.setFieldValue('texto_largo', blog.texto_largo);
        formik.setFieldValue('imagen', blog.imagen ?? '');
        formik.setFieldValue('categoria_id', blog.categoria_id);
        setTimeout(()=>formik.setFieldTouched('titulo',true))
    }

    return (
        <div className="flex">
            <div className="flex mx-auto w-full">
                <div className="flex flex-col w-full">
                    <h1 className="mt-6 mb-6 text-center text-xl font-semibold py-2">Blogs</h1>
                    <div className="shadow p-5">
                        <form onSubmit={formik.handleSubmit}>
                            <div className="flex">
                                <div className="flex flex-col w-1/2">
                                    <label className="mb-2 text-sm">Titulo</label>
                                    <input
                                        name="titulo"
                                        type="text"
                                        placeholder="nombre"
                                        className="rounded-full py-1 px-2 border text-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-600"
                                        onChange={formik.handleChange}
                                        value={formik.values.titulo}
                                    />
                                    {formik.errors.titulo &&
                                    <span className="text-red-500 mt-2">{formik.errors.titulo}</span>}
                                </div>
                                <div className="flex flex-col w-1/2 ml-2">
                                    <label className="mb-2 text-sm">Texto corto</label>
                                    <input
                                        name="texto_corto"
                                        type="text"
                                        placeholder="texto corto"
                                        className="rounded-full py-1 px-2 border text-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-600"
                                        onChange={formik.handleChange}
                                        value={formik.values.texto_corto}
                                    />
                                    {formik.errors.texto_corto &&
                                    <span className="text-red-500 mt-2">{formik.errors.texto_corto}</span>}
                                </div>
                            </div>
                            <div className="flex">
                                <div className="flex flex-col w-1/2">
                                    <label className="mt-2 mb-2 text-sm">Texto largo</label>
                                    <textarea
                                        name="texto_largo"
                                        placeholder="texto largo"
                                        className="rounded-full py-1 px-2 border text-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-600"
                                        onChange={formik.handleChange}
                                        value={formik.values.texto_largo}
                                    />
                                    {formik.errors.texto_largo &&
                                    <span className="text-red-500 mt-2">{formik.errors.texto_largo}</span>}
                                </div>
                                <div className="flex flex-col w-1/2 ml-2">
                                    <label className="mt-2 mb-2 text-sm">Imagen</label>
                                    <input
                                        name="imagen"
                                        type="file"
                                        placeholder=""
                                        className="rounded-full py-1 px-2 border text-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-600"
                                        onChange={(event) => {formik.setFieldValue('imagen',event.target.files[0])}}
                                    />
                                    {formik.errors.imagen &&
                                    <span className="text-red-500 mt-2">{formik.errors.imagen}</span>}
                                </div>
                            </div>
                            <div className="flex">
                                <div className="flex flex-col w-1/2">
                                    <label className="mt-2 mb-2 text-sm">Categoria</label>
                                    <select name="categoria_id" onChange={formik.handleChange}
                                            value={formik.values.categoria_id}>
                                        <option value={''}>seleccione una categoria</option>
                                        {categorias && categorias.map(item => {
                                            return (
                                                <option value={item.id}>{item.nombre}</option>
                                            );
                                        })}
                                    </select>
                                    {formik.errors.categoria_id &&
                                    <span className="text-red-500 mt-2">{formik.errors.categoria_id}</span>}
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
                    <h1 className="mt-6 mb-6 text-center text-xl my-2 font-semibold">Lista de Blogs</h1>
                    <div className="w-full">
                        <div className="border-b border-gray-200 shadow">
                            <table className="w-full">
                                <thead className="bg-blue-50">
                                <tr>
                                    <th className="px-6 py-2 text-center text-base text-gray-500">
                                        ID
                                    </th>
                                    <th className="px-6 py-2 text-center text-base text-gray-500">
                                        Titulo
                                    </th>
                                    <th className="px-6 py-2 text-center text-base text-gray-500">
                                        Slug
                                    </th>
                                    <th className="px-6 py-2 text-center text-base text-gray-500">
                                        Texto corto
                                    </th>
                                    <th className="px-6 py-2 text-center text-base text-gray-500">
                                        Texto largo
                                    </th>
                                    <th className="px-6 py-2 text-center text-base text-gray-500">
                                        Categoria
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
                                {blogs && blogs.map(item => {
                                    return (
                                        <tr className="whitespace-nowrap" key={item.id}>
                                            <td className="px-6 py-4 text-center text-sm text-gray-500">
                                                {item.id}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-center text-sm text-gray-900">
                                                    {item.titulo}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-center text-sm text-gray-500">{item.slug}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-center text-sm text-gray-500">{item.texto_corto}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-center text-sm text-gray-500">{item.texto_largo}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-center text-sm text-gray-500">{item.categoria.nombre}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <a onClick={() => edit(item.id)}
                                                   className="cursor-pointer px-4 py-1 text-sm text-white bg-blue-400 rounded">Edit</a>
                                            </td>
                                            <td className="px-6 py-4">
                                                <a onClick={() => destroy(item.id)}
                                                   className="cursor-pointer px-4 py-1 text-sm text-white bg-red-400 rounded">Delete</a>
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

export default Blogs;
