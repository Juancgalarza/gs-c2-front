<?php


class ProductoController{

    public function __construct(){
        // echo "InicioController instanciado";
    }
    
    public function nuevo(){
        require_once 'views/contents/productos.php';
    }

    public function categoria(){
        require_once 'views/contents/categorias.php';
    }

    public function listar(){
        require_once 'views/contents/listarProducto.php';
    }

}