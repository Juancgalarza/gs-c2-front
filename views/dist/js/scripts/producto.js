$(function(){
    const WIDTH = 600;
    const HEIGHT = 500;
    _init();

    function _init(){
        cargarCategorias();
        validar_form();
        guardar();
        cancelarFormulario();
        generarCodigo();
        changeImagen();
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
        if(json.producto.categoria_id == '0'){     
              return false;
        }else
        if(json.producto.nombre.length == 0){
            Swal.fire(
                'Producto',
                'Ingrese un nombre al producto',
                'error'
              );
            return false;
        }else
        if(json.producto.fecha.length == 0){
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
            let codigo = $('#codigo-producto').text();
            let nombre = $('#nombre-producto').val();
            let descripcion = $('#descripcion-producto').val();
            //let precio_venta = $('#precio-venta-producto').val();
            let fecha = $('#fecha-producto').val();
            let img = $('#imagen-producto')[0].files[0];

            let def = (img == undefined) ? 'producto-default.png' : img.name;

            let json = {
                producto: {
                    categoria_id : id_categoria,
                    codigo : codigo,
                    nombre : nombre,
                    descripcion : descripcion,
                    fecha : fecha,
                    img : def
                }
            };

            if(!validando(json)){
                console.log('formulario incorrecto')
            }else{
                guardarNuevo(json);
            }

        });
    }

    function guardarNuevo(json){
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
                    guardarCodigo(); 
                    
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

        if(json.producto.img == 'producto-default.png'){

        }else{
            let img = $('#imagen-producto')[0].files[0];
            let formdata = new FormData();
            formdata.append('fichero',img);

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
        }
    }

    function cancelarFormulario(){
        $('#btn-cancelar').click(function(){
            window.location.href = urlCliente + 'inicio/administrador';
        });
    }

    function generarCodigo(){
        $.ajax({
            // la URL para la petición
            url : urlServidor + 'producto/generar_codigo/producto',

            // especifica si será una petición POST o GET
            type : 'GET',
            // el tipo de información que se espera de respuesta
            dataType : 'json',
            success : function(response) {
                   /*  console.log(response); */
               if(response.status){
                   $('#codigo-producto').text(response.codigo);
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

    function guardarCodigo(){
        let codigo = $('#codigo-producto').text();
        console.log(codigo);

        let json = {
            codigo: {
                codigo: codigo,
                tipo: 'producto'
            }
        }

        $.ajax({
            // la URL para la petición
            url : urlServidor + 'producto/aumentarCodigo',
            // especifica si será una petición POST o GET
            type : 'POST',
            data : "data=" + JSON.stringify(json),
            // el tipo de información que se espera de respuesta
            dataType : 'json',
            success : function(response) {
                console.log(response); 
                generarCodigo();
            },
            error : function(jqXHR, status, error) {
                console.log('Disculpe, existió un problema');
            },
            complete : function(jqXHR, status) {
                // console.log('Petición realizada');
            }
        });
    }

    function changeImagen() {
        var _URL = window.URL || window.webkitURL;
        $('#imagen-producto').change((event) => {
            var file, img;
            if ((file = event.target.files[0])) {
                img = new Image(); 

                 img.onload = function () {    
                    if(this.width <= WIDTH && this.height <= HEIGHT){
                        Swal.fire({
                            title: 'Listo!',
                            text: 'La imagen cumple con las dimensiones',
                            icon: 'success',
                            confirmButtonText: 'Ok'
                        });
                        $('#guardar-producto').attr('disabled',false);
                        return true;
                        

                    }else{
                        Swal.fire({
                            title: 'Error!',
                            text: 'La imgen no cumple con las dimensiones ' + WIDTH + ' x ' + HEIGHT,
                            icon: 'error',
                            confirmButtonText: 'Ok'
                        });
                        $('#guardar-producto').attr('disabled',true);                        
                        return false;
                    }
   
                };
    
                img.src = _URL.createObjectURL(file);
            }
        });
    }

});
