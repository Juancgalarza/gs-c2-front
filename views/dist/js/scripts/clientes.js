$(function(){
    _init();

    function _init(){
        validarFormulario();
        guardarCliente();
        changeCedula();
    }

    function validarFormulario(){
      
        $('#formulario-cliente').validate({
            rules:{
                cedula: {
                    required: true,
                    maxlength: 10,
                    minlength: 10
                },
                nombres : {
                    required: true,
                    minlength: 5
                },
                apellidos: {
                    required: true,
                    minlength: 4
                },
                correo: {
                    required: true,
                    email: true
                },
                telefono: {
                    required: true,
                    minlength: 10
                }
            },
            messages:{
                cedula: {
                    required: "Ingrese una cédula",
                    maxlength: "La cédula debe tener 10 dígitos",
                    minlength: "Debe tener 10 digítos"
                },
                nombres: {
                    required: "Ingrese nombre para el cliente",
                    minlength: "Debe tener mínimo 5 carácteres"
                },
                apellidos: {
                    required: "Ingrese apellido para el cliente",
                    minlength: "Debe tener mínimo 4 carácteres"
                },
                correo: "Ingresa un correo válido",
                telefono: {
                    required: "Ingrese un teléfono",
                    minlength: "Debe tener mínimo 10 dígitos"
                }
            },
            errorElement: 'span',
            errorPlacement: function (error, element) {
              error.addClass('invalid-feedback');
              element.closest('.form-group').append(error);
            },
            highlight: function (element, errorClass, validClass) {
              $(element).addClass('is-invalid');
            },
            unhighlight: function (element, errorClass, validClass) {
              $(element).removeClass('is-invalid');
            }
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
        if(persona.telefono.length == 0){
            return false;
        }else
        if(persona.cedula.length < 10 || persona.nombres.length < 5 || persona.apellidos.length < 4 || persona.telefono.length < 10){
            return false;
        }
        else 
        if(caract.test(persona.correo) == false){
            return false;
        }
        else{
            return true;
        }
    }

    function guardarCliente(){
        $('#formulario-cliente').submit(function(e){
            e.preventDefault();

            let cedula = $('#cedula-cliente').val();
            let nombres = $('#nombres-cliente').val();
            let apellidos = $('#apellidos-cliente').val();
            let telefono = $('#telefono-cliente').val();
            let correo = $('#correo-cliente').val();
            let direccion = $('#direccion-cliente').val();

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
                //console.log(json);
                guardar(json);
            }
        });
    }

    function guardar(json){
        $.ajax({
            // la URL para la petición
            url : urlServidor + 'cliente/save',
            data : "data=" + JSON.stringify(json),
            // especifica si será una petición POST o GET
            type : 'POST',
            // el tipo de información que se espera de respuesta
            dataType : 'json',
            success : function(response) {

                if(response.status){
                    Swal.fire(
                        'Cliente',
                        response.mensaje,
                        'success'
                    );

                    $('#formulario-cliente')[0].reset();
                }else{
                    Swal.fire({
                        title: 'Error!',
                        text: response.mensaje,
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

    function changeCedula(){
        $('#cedula-cliente').blur(function(){
            let cedula = $('#cedula-cliente').val();
            
            if(!validar_cedula(cedula)){
                Swal.fire({
                    title: 'Error!',
                    text: 'La cédula es invalida',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                  });
            }
        });
    }
});