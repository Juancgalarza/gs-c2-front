var opciones = {
    strict: true,              // va a validar siempre, aunque la cantidad de caracteres no sea 10 ni 13
    events: "change",          // evento que va a disparar la validación
    the_classes: "invalid",    // clase que se va a agregar al nodo en el que se realiza la validación
    onValid: function () {},   // callback cuando la cédula es correcta.
    onInvalid: function () {}  // callback cuando la cédula es incorrecta.
};

$(function(){
    _init();

    function _init(){
        validarFormulario();
        guardarProveedor();
        cancelarFormulario();
        changeRUC();
    }

    function validarFormulario(){
        $.validator.setDefaults({
            submitHandler: function () {
              alert( "Form successful submitted!" );
            }
          });
        $('#formulario-proveedor').validate({
            rules:{
                ruc: {
                    required: true,
                    maxlength: 13,
                    minlength: 13
                },
                razon_social : {
                    required: true,
                    minlength: 6
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
                ruc: {
                    required: "Ingrese un RUC",
                    maxlength : "El RUC debe tener 13 dígitos",
                    minlength: "Debe tener 13 digítos"
                },
                razon_social: {
                    required: "Ingrese nombre del proveedor",
                    minlength : "Debe tener mínimo 6 carácteres"
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
        let proveedor = json.proveedor;
        var caract = new RegExp(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/);

        if(proveedor.ruc.length == 0){
            Swal.fire(
                'Proveedor',
                'Ingrese un ruc al formulario',
                'error'
              );
            return false;
        }else
        if(proveedor.razon_social.length == 0){
            return false;
        }else
        if(proveedor.correo.length == 0){
            return false;
        }else
        if(proveedor.telefono.length == 0){
            return false;
        }else
        if(proveedor.ruc.length < 13 || proveedor.razon_social.length < 6 ){
            return false;
        }else
        if(caract.test(proveedor.correo) == false){
            return false;
        }
        else{
            return true;
        }
    }

    function guardarProveedor(){
        $('#formulario-proveedor').submit(function(e){
            e.preventDefault();

            let ruc = $('#ruc-proveedor').val();
            let razon_social = $('#razon-social-proveedor').val();
            let direccion = $('#direccion-proveedor').val();
            let correo = $('#correo-proveedor').val();
            let telefono = $('#telefono-proveedor').val();

            let json = {
                proveedor: {
                    ruc,
                    razon_social,
                    direccion,
                    correo,
                    telefono
                }
            };

            if(!validar(json)){
                //procede a guardar
                console.log("debe llenar los campos");
            }else{
                guardar(json);
            }
        });
    }

    function guardar(json){
        $.ajax({
            // la URL para la petición
            url : urlServidor + 'proveedor/save',
            data : "data=" + JSON.stringify(json),
            // especifica si será una petición POST o GET
            type : 'POST',
            // el tipo de información que se espera de respuesta
            dataType : 'json',
            success : function(response) {

                if(response.status){
                    Swal.fire(
                        'Proveedor',
                        response.mensaje,
                        'success'
                    );

                    $('#formulario-proveedor')[0].reset();
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

    function cancelarFormulario(){
        $('#btn-cancelar').click(function(){
            window.location.href = urlCliente + 'inicio/administrador';
        });
    }

    function validarCedula(cedula){
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

    function changeRUC(){
        $('#ruc-proveedor').blur(function(){
            let ruc = $('#ruc-proveedor').val();

            cedula = ruc.substring(0,10);
            ext = ruc.substring(10,13);
        
            if(validarRUC(cedula,ext)){
                Swal.fire({
                    title: 'Listo!',
                    text: 'El RUC es válido',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                });    
            }else{
                Swal.fire({
                    title: 'Error!',
                    text: 'El RUC es invalido',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                  });
            }     
        }); 
    }

    function validarRUC(cedula,ext){
        ced = validarCedula(cedula);
        band = false;
        //validar 001
        if(ext === '001'){
            band = true;
        }else{
            band = false;
        }

        //validar ruc
        if(ced && band){
            return true
        }else{
            return false
        }

    }
});

