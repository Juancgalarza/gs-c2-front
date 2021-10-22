$(function(){

    _init();

    function _init(){
        cargarCategorias();
        validar_form();
        guardar();
    }

    function cargarCategorias(){
        $.ajax({
            // la URL para la petición
            url : urlServidor + 'categoria/listar',
            // especifica si será una petición POST o GET
            type : 'GET',
            // el tipo de información que se espera de respuesta
            dataType : 'json',
            success : function(response) {
                //console.log(response);
                let inicio = '<option value=0>Seleccione una Categoría</option>';
                let aux = 0;

                if(response.length > 0){
                    response.forEach(element => {
                        aux += `<option value='${element.id}'>${element.categoria}</option>`;
                    });
                    inicio += aux;
                }

                $('#select-categoria').html(inicio);
            },
            error : function(jqXHR, status, error) {
                console.log('Disculpe, existió un problema');
            },
            complete : function(jqXHR, status) {
                // console.log('Petición realizada');
            }
        });
    }

    function validar_form(){
        $.validator.setDefaults({
            submitHandler: function () {
              alert( "Form successful submitted!" );
            }
          });
          $('#formulario-producto').validate({
            rules: {
              codigo: {
                required: true,
                minlength: 4,
              },
              nombre: {
                required: true,
                minlength: 5
              },
              precio_venta: {
                required: true
              },
              fecha: {
                required: true
              },
              categoria: {
                required: true
              }
            },
            messages: {
              codigo: {
                required: "Ingrese un código para el producto",
                minlength: "El código debe tener 4 dígitos"
              },
              nombre: {
                required: "Ingrese un nombre para el producto",
                minlength: "Debe tener mínimo 5 carácteres"
              },
              precio_venta: "Ingrese un precio de venta para el producto",
              fecha: "Ingrese una fecha para el producto",
              categoria: "Debe seleccionar una categoria"
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

    function validando(json){
        if(json.codigo.length == 0){
            Swal.fire(
                'Producto',
                'Ingrese un código',
                'error'
              );
            return false;
        }else
        if(json.categoria_id == '0'){     
              return false;
        }else
        if(json.nombre.length == 0){
            return false;
        }else
        if(json.precio_venta.length == 0){
            return false
        }else
        if(json.fecha.length == 0){
            return false;
        }
        else{
            return true;
        }
    }

    function guardar(){
        $('#formulario-producto').submit(function(e){
            e.preventDefault();

            let id_categoria = $('#select-categoria option:selected').val();
            let codigo = $('#codigo-producto').val();
            let nombre = $('#nombre-producto').val();
            let descripcion = $('#descripcion-producto').val();
            let precio_venta = $('#precio-venta-producto').val();
            let fecha = $('#fecha-producto').val();
            let imagen = $('#imagen-producto')[0].files[0];

            let json = {
                categoria_id : id_categoria,
                codigo : codigo,
                nombre : nombre,
                descripcion : descripcion,
                precio_venta : precio_venta,
                fecha : fecha,
                img : imagen
            };

            let formdata = new FormData();

            if(validando(json)){
                if(imagen == undefined){
                    json.img = 'producto-default.png';
                    //formdata.append('producto',json);
                }else{
                    //subir archivo
                    if(imagen.type == 'image/jpeg'  || imagen.type == 'image/jpg' || imagen.type == 'image/png'){
                        json.img = imagen.name;
                        guardarNuevo(json,imagen);
                    }else{
                        Swal.fire(
                            'Producto',
                            'Tipo de archivo no admitido',
                            'error'
                          )
                    }
                }  
            }else{
                console.log('formulario incorrecto')
            }

        });
    }

    function guardarNuevo(data,imagen){

        let json = {
            producto: data
        }
        let formdata = new FormData();
        formdata.append('fichero',imagen);

        $.ajax({
            // la URL para la petición
            url : urlServidor + 'producto/save',
            data : "data=" + JSON.stringify(json),
            // especifica si será una petición POST o GET
            type : 'POST',
            // el tipo de información que se espera de respuesta
            dataType : 'json',
            success : function(response) {

                if(response.status){
                    Swal.fire(
                        'Producto',
                        response.mensaje,
                        'success'
                    );

                    $('#formulario-producto')[0].reset();

                    $.ajax({
                        // la URL para la petición
                        url : urlServidor + 'producto/fichero',
                        data : formdata,
                        contentType: false,
                        processData: false, 
                        // especifica si será una petición POST o GET
                        type : 'POST',
                        // el tipo de información que se espera de respuesta
                        dataType : 'json',
                        success : function(response) {
                            //console.log(response);
                        },
                        error : function(jqXHR, status, error) {
                            console.log('Disculpe, existió un problema');
                        },
                        complete : function(jqXHR, status) {
                            // console.log('Petición realizada');
                        }
                    }); 

                }else{
                    Swal.fire({
                        title: 'Error!',
                        text: response.mensaje,
                        icon: 'error',
                        confirmButtonText: 'Ok'
                      })
                }
                //console.log(response);
            },
            error : function(jqXHR, status, error) {
                console.log('Disculpe, existió un problema');
            },
            complete : function(jqXHR, status) {
                // console.log('Petición realizada');
            }
        });
    }

});