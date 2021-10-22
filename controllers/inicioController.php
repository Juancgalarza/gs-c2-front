<?php


class InicioController{

    public function __construct(){
        // echo "InicioController instanciado";
    }
    
    public function administrador(){
        require_once 'views/contents/administrador.php';
    }

    public function bodeguero(){
        require_once 'views/contents/bodeguero.php';
    }

    public function vendedor(){
        require_once 'views/contents/vendedor.php';
    }

}