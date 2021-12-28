<?php


class ConfiguracionesController{

    public function __construct(){
        // echo "InicioController instanciado";
    }
    
    public function general(){
        require_once 'views/contents/configuraciones.php';
    }
}