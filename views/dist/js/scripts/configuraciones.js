$(function(){
    _init();

    function _init(){
        guardarConfig();
        cancelarFormulario();
        cargarDataConfig();
    }

    function cargarDataConfig(){
        $.ajax({
            // la URL para la petición
            url : urlServidor + 'configuraciones/listar',
            // especifica si será una petición POST o GET
            type : 'GET',
            // el tipo de información que se espera de respuesta
            dataType : 'json',
            success : function(response) {
                if(response.status){
                    response.config.forEach(element => {
                        $('#config-id').val(element.id);
                        $('#config-porcentaje').val(element.porcentaje_ganancia);
                        $('#config-iva').val(element.iva);
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
    }

    function guardarConfig(){
        $('#formulario-configuraciones').submit(function(e){
            e.preventDefault();

            let id = $('#config-id').val();
            let porcentaje_ganancia = $('#config-porcentaje').val();
            let iva = $('#config-iva').val();

            let json = {
                configuraciones: {
                    id: id,
                    porcentaje_ganancia: porcentaje_ganancia,
                    iva: iva
                }
            };

            if(porcentaje_ganancia.length == 0){
               Swal.fire(
                    'Configuraciones',
                    response.mensaje,
                    'error'
                );
            }else{
                //console.log(json);
                guardandoConfig(json);
            }
        });
    }

    function guardandoConfig(json){
        $.ajax({
            // la URL para la petición
            url : urlServidor + 'configuraciones/editar',
            data : "data=" + JSON.stringify(json),
            // especifica si será una petición POST o GET
            type : 'POST',
            // el tipo de información que se espera de respuesta
            dataType : 'json',
            success : function(response) {

                if(response.status){
                    Swal.fire({
                        title: 'Configuraciones',
                        text: response.mensaje,
                        icon: 'success',
                        confirmButtonText: 'Ok',
                        confirmButtonColor: '#3085d6' 
                    });
                    $('#formulario-configuraciones')[0].reset();
                    cargarDataConfig();
                    actulizarPventa();   
                }else{
                    Swal.fire({
                        title: 'Configuraciones',
                        text: response.mensaje,
                        icon: 'error',
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
    }

    function cancelarFormulario(){
        $('#btn-cancelar').click(function(){
            window.location.href = urlCliente + 'inicio/administrador';
        });
    }

    function actulizarPventa(){
        $.ajax({
            // la URL para la petición
            url : urlServidor + 'configuraciones/listar/'+1,
            // especifica si será una petición POST o GET
            type : 'GET',
            // el tipo de información que se espera de respuesta
            dataType : 'json',
            success : function(response) {
                if(response.status){
                    let porcentaje_ganancia = response.config.porcentaje_ganancia;
                    $.ajax({
                        // la URL para la petición
                        url : urlServidor + 'producto/listar',
                        // especifica si será una petición POST o GET
                        type : 'GET',
                        // el tipo de información que se espera de respuesta
                        dataType : 'json',
                        success : function(response) {
                         
                            if(response.length > 0){
                                let i = 1;
                                response.forEach(element => {
                                    let producto_id = element.id;
                                    let margenf = (element.precio_compra * (porcentaje_ganancia)/100);
                                    let margen = margenf.toFixed(2);
                                    let precio_ventaf =  Number(element.precio_compra) + Number(margen);
                                    let precio_venta = precio_ventaf.toFixed(2);
                                    console.log(precio_venta);

                                    let json = {
                                        config :{
                                           producto_id : producto_id,
                                            margen: margen,
                                            precio_venta: precio_venta
                                        }
                                    }

                                    $.ajax({
                                        // la URL para la petición
                                        url : urlServidor + 'configuraciones/actualizarPventa',
                                        data : "data=" + JSON.stringify(json),
                                        // especifica si será una petición POST o GET
                                        type : 'POST',
                                        // el tipo de información que se espera de respuesta
                                        dataType : 'json',
                                        success : function(response) {
                                            console.log('Exito');
                                        },
                                        error : function(jqXHR, status, error) {
                                            console.log('Disculpe, existió un problema');
                                        },
                                        complete : function(jqXHR, status) {
                                            // console.log('Petición realizada');
                                        }
                                    });
                                  
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
});