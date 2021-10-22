$(function(){

    _init();

    function _init(){
        guardar_nueva_persona();
        validarFormulario();
        cargar_cargos();
        validarFormularioUsuario();
        guardar_nuevo_usuario();
        changeCedula();
    }

    function guardar_nueva_persona(){
        $('#form-nuevo-persona').submit(function(e){
            e.preventDefault();

            let cedula = $('#cedula').val();
            let nombres = $('#persona-nombres').val();
            let apellidos = $('#persona-apellidos').val();
            let telefono = $('#persona-telefono').val();
            let correo = $('#persona-correo').val();
            let direccion = $('#persona-direccion').val();

            let json = {
                persona: {
                    cedula,
                    nombres,
                    apellidos,
                    telefono,
                    correo,
                    direccion
                }
            };

            if(!validar(json)){
                //procede a guardar
                console.log("debe llenar los campos");
            }else{
                $('#acordion-persona').addClass('collapsed');
                $('#acordion-persona').attr('aria-expanded','false');
                $('#collapseOne').removeClass('show');

                $('#acordion-usuario').removeClass('collapsed');
                $('#acordion-usuario').attr('aria-expanded','true');
                $('#collapseTwo').addClass('show');
            }
        });
    }

    function changeCedula(){
        $('#cedula').blur(function(){
            let cedula = $('#cedula').val();
            
            if(!validar_cedula(cedula)){
                Swal.fire({
                    title: 'Error!',
                    text: 'La cédula es incorrecta',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                  });
            }
        });
    }

    function validarFormulario(){
        $('#form-nuevo-persona').validate({
            rules:{
                cedula: {
                    required: true
                },
                nombres : {
                    required: true,
                    minlength: 4
                },
                apellidos:{
                    required: true,
                    minlength: 4
                },
                correo: {
                    required: true,
                    email: true
                },
                telefono: {
                    minlength: 10
                }
            },
            messages:{
                cedula: {
                    required: "Ingrese una cédula",
                    minlength : "La cédula debe tener 10 dígitos"
                },
                nombres: {
                    required: "Ingrese nombres completos",
                    minlength : "Debe tener mínimo 4 carácteres"
                },
                apellidos: {
                    required: "Ingrese apellidos completos",
                    minlength : "Debe tener mínimo 4 carácteres"
                },
                correo: "Ingresa un correo válido",
                telefono: {
                    minlength : "Debe tener mínimo 10 dígitos"
                }
            },
            errorElement: "em"
        });
    }

    function validar(json){
        let persona = json.persona;
        var caract = new RegExp(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/);

        if(persona.cedula.length == 0){
            return false;
        }else
        if(persona.nombres.length == 0){
            return false;
        }else
        if(persona.apellidos.length == 0){
            return false;
        }else
        if(persona.correo.length == 0){
            return false;
        }else
        if(persona.cedula.length < 10 || persona.nombres.length < 5 || persona.apellidos.length < 5){
            return false;
        }
        else 
        if(caract.test(persona.correo) == false){
            return false;
        }
        else
        if(!validar_cedula(persona.cedula)){
            Swal.fire({
                title: 'Error!',
                text: 'La cédula es incorrecta',
                icon: 'error',
                confirmButtonText: 'Ok'
              })
            return false;
        }
        else{
            return true;
        }
    }

    function cargar_cargos(){

        $.ajax({
            // la URL para la petición
            url : urlServidor + 'rol/listar',
            // especifica si será una petición POST o GET
            type : 'GET',
            // el tipo de información que se espera de respuesta
            dataType : 'json',
            success : function(response) {
                if(response.status){
                    let option = '<option value=0>Seleccione un Cargo</option>';
                    
                    response.cargo.forEach(element =>{
                        option += `<option value=${element.id}>${element.cargo}</option>`;
                    });
                    $('#select-cargo').html(option);
   
                }else{
                    Swal.fire({
                        title: 'Error!',
                        text: 'No hay cargos disponibles',
                        icon: 'error',
                        confirmButtonText: 'Ok'
                      })
                }               
            },
            error : function(jqXHR, status, error) {
                console.log('Disculpe, existió un problema');
            },
            complete : function(jqXHR, status) {
                // console.log('Petición realizada');
            }
        });
    }

    function validarFormularioUsuario(){
        $('#form-nuevo-usuario').validate({
            rules:{
                usuario: {
                    required: true,
                    minlength: 4
                },
                clave : {
                    required: true,
                    minlength: 4
                },
                confclave: {
                    required: true,
                    minlength: 4
                },
                img: {
                    required: true,
                }      
            },
            messages:{
                usuario: {
                    required: "Ingrese un usuario",
                    minlength : "Debe tener mínimo 4 carácteres"
                },
                clave: {
                    required: "Ingrese una contraseña",
                    minlength : "Debe tener mínimo 4 carácteres"
                },
                confclave: {
                    required: "Confirme la contraseña",
                    minlength : "Debe tener mínimo 4 carácteres"
                },
                img: {
                    required: "Ingrese una imagen para el usuario",
                }
            },
            errorElement: "em"
        });
    }

    function guardar_nuevo_usuario(){
        $('#form-nuevo-usuario').submit(function(e){
            e.preventDefault();

            let usuario = $('#usuario-us').val();
            let clave = $('#usuario-clave').val();
            let confclave = $('#usuario-conf-clave').val();
            let img = $('#img-usuario')[0].files[0];
            let rol_id = $('#select-cargo option:selected').val();

            let cedula = $('#cedula').val();
            let nombres = $('#persona-nombres').val();
            let apellidos = $('#persona-apellidos').val();
            let telefono = $('#persona-telefono').val();
            let correo = $('#persona-correo').val();
            let direccion = $('#persona-direccion').val();

            let def = (img == undefined) ? 'default.jpg' : img.name;

            let json = {
                usuario: {
                    usuario,
                    rol_id,
                    clave,
                    confclave,
                    img: def
                },
                persona: {
                    cedula,
                    nombres,
                    apellidos,
                    telefono,
                    correo,
                    direccion
                }
            };

            if(!validar(json)){ //Validacion para datos de personas
                //procede a guardar
                console.log("debe llenar los campos de persona");
            }else
            if(!validarUsuario(json.usuario)){
                console.log("debe llenar los campos de usuario");
            }
            else{
                //Realizar peticion ajax
                guardandoUsuario(json);
            }
        });
    }

    function validarUsuario(usuario){
        if(usuario.length == 0){
            return false;
        }else
        if(usuario.clave.length == 0){
            return false;
        }else
        if(usuario.confclave.length == 0){
            return false;
        }else
        if(usuario.clave !== usuario.confclave){
            Swal.fire({
                title: 'Error!',
                text: 'Las claves no coinciden',
                icon: 'error',
                confirmButtonText: 'Ok'
              });
            return false;
        }
        else{
            return true;
        }
    }

    function validar_cedula(cedula){
        if(cedula.length == 10){
        
            //Obtenemos el digito de la region que sonlos dos primeros digitos
            var digito_region = cedula.substring(0,2);
            
            //Pregunto si la region existe ecuador se divide en 24 regiones
            if( digito_region >= 1 && digito_region <=24 ){
              
              // Extraigo el ultimo digito
              var ultimo_digito   = cedula.substring(9,10);
    
              //Agrupo todos los pares y los sumo
              var pares = parseInt(cedula.substring(1,2)) + parseInt(cedula.substring(3,4)) + parseInt(cedula.substring(5,6)) + parseInt(cedula.substring(7,8));
    
              //Agrupo los impares, los multiplico por un factor de 2, si la resultante es > que 9 le restamos el 9 a la resultante
              var numero1 = cedula.substring(0,1);
              var numero1 = (numero1 * 2);
              if( numero1 > 9 ){ var numero1 = (numero1 - 9); }
    
              var numero3 = cedula.substring(2,3);
              var numero3 = (numero3 * 2);
              if( numero3 > 9 ){ var numero3 = (numero3 - 9); }
    
              var numero5 = cedula.substring(4,5);
              var numero5 = (numero5 * 2);
              if( numero5 > 9 ){ var numero5 = (numero5 - 9); }
    
              var numero7 = cedula.substring(6,7);
              var numero7 = (numero7 * 2);
              if( numero7 > 9 ){ var numero7 = (numero7 - 9); }
    
              var numero9 = cedula.substring(8,9);
              var numero9 = (numero9 * 2);
              if( numero9 > 9 ){ var numero9 = (numero9 - 9); }
    
              var impares = numero1 + numero3 + numero5 + numero7 + numero9;
    
              //Suma total
              var suma_total = (pares + impares);
    
              //extraemos el primero digito
              var primer_digito_suma = String(suma_total).substring(0,1);
    
              //Obtenemos la decena inmediata
              var decena = (parseInt(primer_digito_suma) + 1)  * 10;
    
              //Obtenemos la resta de la decena inmediata - la suma_total esto nos da el digito validador
              var digito_validador = decena - suma_total;
    
              //Si el digito validador es = a 10 toma el valor de 0
              if(digito_validador == 10)
                var digito_validador = 0;
    
              //Validamos que el digito validador sea igual al de la cedula
              if(digito_validador == ultimo_digito){
                return true;
              }else{
                return false;
              }
              
            }else{
              // imprimimos en consola si la region no pertenece
              return false;
            }
         }else{
            //imprimimos en consola si la cedula tiene mas o menos de 10 digitos
            return false;
         }    
    }

    function guardandoUsuario(json){

        $.ajax({
            // la URL para la petición
            url : urlServidor + 'usuario/save',
            // especifica si será una petición POST o GET
            type : 'POST',
            data: 'data=' + JSON.stringify(json),
            // el tipo de información que se espera de respuesta
            dataType : 'json',
            success : function(response) {
               if(response.status){
                Swal.fire({
                    title: 'Usuario',
                    text: response.mensaje,
                    icon: 'success',
                    confirmButtonText: 'Ok'
                });
               }            
            },
            error : function(jqXHR, status, error) {
                console.log('Disculpe, existió un problema');
            },
            complete : function(jqXHR, status) {
                // console.log('Petición realizada');
            }
        });

        if(json.usuario.img == 'default.jpg'){
           
        }else{
            //Enviar imagen al servidor

            let img = $('#img-usuario')[0].files[0];
            let formdata = new FormData();
            formdata.append('fichero',img);

            $.ajax({
                // la URL para la petición
                url : urlServidor + 'usuario/fichero',
                // especifica si será una petición POST o GET
                type : 'POST',
                data : formdata,
                contentType: false,
                processData: false,
                // el tipo de información que se espera de respuesta
                dataType : 'json',
                success : function(responseImg) {
                    Swal.fire({
                        title: 'Usuario',
                        text: 'Se ha guardado el usuario',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                      });
                },
                error : function(jqXHR, status, error) {
                    console.log('Disculpe, existió un problema');
                },
                complete : function(jqXHR, status) {
                    // console.log('Petición realizada');
                }
            });
        }
    

    }
});