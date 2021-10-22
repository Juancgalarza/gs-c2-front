<?php

class VentaController{

    public function __construct(){
        // echo "InicioController instanciado";
    }
    
    public function nueva(){
        require_once 'views/contents/ventas.php';
    }

    public function listar(){
        require_once 'views/contents/listarVentas.php';
    }
}