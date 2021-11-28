<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;

class CategoriaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index() {
        $categoria = Categoria::all();

        return response()->json([
            'message' => count($categoria) <= 0 ? 'No hay datos' : 'Datos encontrados',
            'data' => $categoria
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
            'nombre' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }

        $categoria = new Categoria($request->all());
        if ($categoria->save()) {
            return response()->json([
                'message' => 'Categoria almacenada con exito',
                'data' => $categoria
            ], 201);
        } else {
            return response()->json([
                'message' => 'La categoria no pudo ser almacenada',
                'data' => []
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Categoria $categoria
     * @return \Illuminate\Http\Response
     */
    public function show($id) {
        $categoria = Categoria::find($id);
        if ($categoria == null)
            return response()->json(['message'=>'Categoria no encontrada'], 400);
        return response()->json([
            'message' =>  'Datos encontrado',
            'data' => $categoria
        ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\Categoria $categoria
     * @return \Illuminate\Http\Response
     */
    public function edit(Categoria $categoria) {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Categoria $categoria
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id) {
        $validator = Validator::make($request->all(), [
            'nombre' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }
        $categoria = Categoria::findOrFail($id);
        $categoria->fill($request->all());
        if ($categoria->save()) {
            return response()->json([
                'message' => 'Categoria modificada con exito',
                'data' => $categoria
            ], 200);
        } else {
            return response()->json([
                'message' => 'La categoria no pudo ser modificada',
                'data' => []
            ], 500);
        }

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Categoria $categoria
     * @return \Illuminate\Http\Response
     */
    public function destroy($id) {
        $categoria = Categoria::findOrFail($id);
        if ($categoria->blogs()->count() > 0)
            return response()->json(['message' => 'La categoria tiene blogs relacionados.'], 400);

        if ($categoria->delete()) {
            return response()->json([
                'message' => 'Categoria eliminada con exito',
                'data' => []
            ], 200);
        } else {
            return response()->json([
                'message' => 'La categoria no pudo ser eliminada',
                'data' => []
            ], 500);
        }
    }
}
