<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Blog extends Model
{
    use HasFactory;

    protected $fillable = [
        'titulo',
        'slug',
        'texto_corto',
        'texto_largo',
        'imagen',
        'categoria_id',
        'created_at',
        'updated_at'
    ];

    public function getImagenAttribute($value){
        return 'storage/blogs/'.$value;
    }

    public function categoria() {
        return $this->belongsTo(Categoria::class);
    }
}
