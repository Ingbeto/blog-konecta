<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categoria extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre',
        'descripcion',
        'created_at',
        'updated_at'
    ];


    public function blogs() {
        return $this->hasMany(Blog::class);
    }


}
