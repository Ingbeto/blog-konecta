<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::post('/auth/login', 'App\Http\Controllers\UserController@authenticate');
Route::post('/auth/register', 'App\Http\Controllers\UserController@register');

Route::group(['middleware' => ['jwt.verify']], function () {
    Route::post('/auth/user', 'App\Http\Controllers\UserController@getAuthenticatedUser');
    Route::post('/auth/logout', 'App\Http\Controllers\UserController@logout');
    Route::resource('users', 'App\Http\Controllers\UserController');
    Route::resource('categoria', 'App\Http\Controllers\CategoriaController');
    Route::resource('blog', 'App\Http\Controllers\BlogController');
    Route::post('blog/edit/{id}','App\Http\Controllers\BlogController@update');
});
