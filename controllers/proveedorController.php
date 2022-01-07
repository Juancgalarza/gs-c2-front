<?php


class ProveedorController{

    public function __construct(){
        // echo "InicioController instanciado";
    }
    
    public function nuevo(){
        require_once 'views/contents/proveedores.php';
    }

    public function listar(){
        require_once 'views/contents/listarProveedores.php';
    }

    public function catalogo(){
        require_once 'views/contents/catalogo.php';
    }

}