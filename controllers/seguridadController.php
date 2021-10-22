<?php


class SeguridadController{

    public function __construct(){
        // echo "InicioController instanciado";
    }
    
    public function permiso(){
        require_once 'views/contents/permisos.php';
    }
}