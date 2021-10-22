<?php


class ReporteController{

    public function __construct(){
        // echo "InicioController instanciado";
    }
    
    public function compra(){
        require_once 'views/contents/reporteCompra.php';
    }

    public function venta(){
        require_once 'views/contents/reporteVenta.php';
    }

    public function repuestos(){
        require_once 'views/contents/reporteMasVendido.php';
    }

    public function comprados(){
        require_once 'views/contents/reporteMasComprado.php';
    }


}