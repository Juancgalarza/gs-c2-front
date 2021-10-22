<?php


class CompraController{

    public function __construct(){
        // echo "InicioController instanciado";
    }
    
    public function nueva(){
        require_once 'views/contents/compras.php';
    }

    public function listar(){
        require_once 'views/contents/listarCompras.php';
    }
}