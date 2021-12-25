$(function(){
    _init();

    function _init(){
        validarFormulario();
        guardarProveedor();
        cancelarFormulario();
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
});

