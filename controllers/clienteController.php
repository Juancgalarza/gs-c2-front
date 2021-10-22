<?php


class ClienteController{

    public function __construct(){
        // echo "InicioController instanciado";
    }
    
    public function nuevo(){
        require_once 'views/contents/clientes.php';
    }

    public function listar(){
        require_once 'views/contents/listarClientes.php';
    }

}