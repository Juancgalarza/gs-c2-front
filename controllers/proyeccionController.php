<?php


class ProyeccionController{

    public function __construct(){
        // echo "InicioController instanciado";
    }
    
    public function compra(){
        require_once 'views/contents/proyCompra.php';
    }

    public function venta(){
        require_once 'views/contents/proyVenta.php';
    }

}