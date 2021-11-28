<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index() {
        $blogs = Blog::with('categoria')->get();
        return response()->json([
            'message' => count($blogs) <= 0 ? 'No hay datos' : 'Datos encontrados',
            'data' => $blogs
        ], 200);

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create() {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request) {
        $validator = Validator::make($request->all(), [
            'titulo' => 'required',
            'texto_corto' => 'required',
            'texto_largo' => 'required',
            'imagen' => 'required|file',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }

        $blog = new Blog($request->all());
        $blog->slug = Str::slug($request->titulo, '-');
        if ($request->hasFile('imagen')) {
            $path = $request->imagen->store('public/blogs');
            $blog->imagen = explode('/',$path)[2];
        }
        if ($blog->save()) {
            $blog->categoria = $blog->categoria;
            return response()->json([
                'message' => 'Blog alamacenado con exito',
                'data' => $blog
            ], 201);
        } else {
            return response()->json([
                'message' => 'El blog no pudo ser alamacenado',
                'data' => []
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Blog $blog
     * @return \Illuminate\Http\Response
     */
    public function show(string $slug) {
        $blog = Blog::where('slug', $slug)->first();
        if ($blog == null)
            return response()->json(['message' => 'Blog no encontrado'], 400);

        return response()->json([
            'message' => 'Datos encontrados',
            'data' => $blog
        ], 200);

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\Blog $blog
     * @return \Illuminate\Http\Response
     */
    public function edit(Blog $blog) {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Blog $blog
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id) {
        $validator = Validator::make($request->all(), [
            'titulo' => 'required',
            'texto_corto' => 'required',
            'texto_largo' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }

        $blog = Blog::findOrFail($id);
        $blog->fill($request->all());
        $blog->slug = Str::slug($request->titulo, '-');
        if ($request->hasFile('imagen')) {
            $path = $request->imagen->store('public/blogs');
            $blog->imagen = $path;
        }
        if ($blog->save()) {
            $blog->categoria = $blog->categoria;
            return response()->json([
                'message' => 'Blog modificado con exito',
                'data' => $blog
            ], 200);
        } else {
            return response()->json([
                'message' => 'El blog no pudo ser modificado',
                'data' => []
            ], 500);
        }

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Blog $blog
     * @return \Illuminate\Http\Response
     */
    public function destroy($id) {
        $blog = Blog::find($id);
        Storage::delete($blog->imagen);
        if ($blog->delete()) {
            return response()->json([
                'message' => 'Blog eliminado correctamente',
                'data' => []
            ], 200);
        } else {
            return response()->json([
                'message' => 'El blog no pudo ser eliminado',
                'data' => []
            ], 500);
        }
    }
}
