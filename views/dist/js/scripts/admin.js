$(function(){
    
    _init();

    function _init(){
        cargar_datos();
        iniciar_grafico();
    }

    function cargar_datos(){
        contar_cliente();

        function contar_cliente(){
            $.ajax({
                // la URL para la petición
                url : urlServidor + 'cliente/contar',
                // especifica si será una petición POST o GET
                type : 'GET',
                // el tipo de información que se espera de respuesta
                dataType : 'json',
                success : function(response) {
                    console.log(response);
                    if(response.status){
                        $('#conta-cliente').text(response.cantidad);
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

        contar_producto();

        function contar_producto(){
            $.ajax({
                // la URL para la petición
                url : urlServidor + 'producto/contar',
                // especifica si será una petición POST o GET
                type : 'GET',
                // el tipo de información que se espera de respuesta
                dataType : 'json',
                success : function(response) {
                    console.log(response);
                    if(response.status){
                        $('#conta-prod').text(response.cantidad);
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

        total_compra()

        function total_compra(){
            $.ajax({
                // la URL para la petición
                url : urlServidor + 'compra/total',
                // especifica si será una petición POST o GET
                type : 'GET',
                // el tipo de información que se espera de respuesta
                dataType : 'json',
                success : function(response) {
                    if(response.status){
                        $('#total-compra').text('$' + response.total);
                    }    
                    $('#mes-compra').text('Compras ('+ response.mes +')')  ;
                },
                error : function(jqXHR, status, error) {
                    console.log('Disculpe, existió un problema');
                },
                complete : function(jqXHR, status) {
                    // console.log('Petición realizada');
                }
            });
        }

        total_venta()

        function total_venta(){
            $.ajax({
                // la URL para la petición
                url : urlServidor + 'venta/total',
                // especifica si será una petición POST o GET
                type : 'GET',
                // el tipo de información que se espera de respuesta
                dataType : 'json',
                success : function(response) {
                    if(response.status){
                        $('#total-venta').text('$' + response.total);
                    }    
                    $('#mes-venta').text('Ventas ('+ response.mes +')')  ;
                },
                error : function(jqXHR, status, error) {
                    console.log('Disculpe, existió un problema');
                },
                complete : function(jqXHR, status) {
                    // console.log('Petición realizada');
                }
            });
        }

        contar_proveedor();

        function contar_proveedor(){
            $.ajax({
                // la URL para la petición
                url : urlServidor + 'proveedor/contar',
                // especifica si será una petición POST o GET
                type : 'GET',
                // el tipo de información que se espera de respuesta
                dataType : 'json',
                success : function(response) {
                    console.log(response);
                    if(response.status){
                        $('#conta-proveedor').text(response.cantidad);
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

        contar_categoria();

        function contar_categoria(){
            $.ajax({
                // la URL para la petición
                url : urlServidor + 'categoria/contar',
                // especifica si será una petición POST o GET
                type : 'GET',
                // el tipo de información que se espera de respuesta
                dataType : 'json',
                success : function(response) {
                    console.log(response);
                    if(response.status){
                        $('#conta-catg').text(response.cantidad);
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

        contar_usuario();

        function contar_usuario(){
            $.ajax({
                // la URL para la petición
                url : urlServidor + 'usuario/contar',
                // especifica si será una petición POST o GET
                type : 'GET',
                // el tipo de información que se espera de respuesta
                dataType : 'json',
                success : function(response) {
                    console.log(response);
                    if(response.status){
                        $('#conta-usu').text(response.cantidad);
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
    }

    function iniciar_grafico(){

        reporte_compras();

        function reporte_compras(){
              $.ajax({
                // la URL para la petición
                url : urlServidor + 'compra/grafica_compra',
                // especifica si será una petición POST o GET
                type : 'GET',
                // el tipo de información que se espera de respuesta
                dataType : 'json',
                success : function(response) {
                    if(response){
                        new Chart(document.getElementById("compra-box"), {
                            type: 'bar',
                            data: {
                              labels: response.compra.labels,
                              datasets: [
                                {
                                  label: "Total",
                                  backgroundColor: ["#fff706", "#fe0612","#282f34","#009000","#fff706", "#fe0612","#282f34","#fff706","#009000","#fe0612","#282f34","#009000"],
                                  data: response.compra.data
                                }
                              ]
                            },
                            options: {
                              legend: { display: false },
                              title: {
                                display: true,
                                text: 'Compras Anuales'
                              }
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

        reporte_ventas();

        function reporte_ventas(){
              $.ajax({
                // la URL para la petición
                url : urlServidor + 'venta/grafica_venta',
                // especifica si será una petición POST o GET
                type : 'GET',
                // el tipo de información que se espera de respuesta
                dataType : 'json',
                success : function(response) {
                    if(response){
                        new Chart(document.getElementById("venta-box"), {
                            type: 'bar',
                            data: {
                              labels: response.venta.labels,
                              datasets: [
                                {
                                  label: "Total",
                                  backgroundColor: ["#fff706", "#fe0612","#282f34","#009000","#fff706", "#fe0612","#282f34","#009000","#fff706","#fe0612","#282f34","#009000"],
                                  data: response.venta.data
                                }
                              ]
                            },
                            options: {
                              legend: { display: false },
                              title: {
                                display: true,
                                text: 'Ventas Anuales'
                              }
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
    }
});