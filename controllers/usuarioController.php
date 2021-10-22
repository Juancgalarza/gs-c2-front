<?php


class UsuarioController{

    public function __construct(){
        // echo "InicioController instanciado";
    }
    
    public function nuevo(){
        require_once 'views/contents/usuarios.php';
    }

    public function listar(){
        require_once 'views/contents/listarUsuarios.php';
    }

}