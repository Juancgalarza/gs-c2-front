$(function(){

    _init();

    function _init(){
        iniciar_tabla();
        recuperarCategorias();
        actualizar_producto();
    }

    function iniciar_tabla(){
        tabla=$('#tabla-producto').dataTable({
            "lengthMenu": [ 5, 10, 25, 75, 100],//mostramos el menú de registros a revisar
            "responsive": true, "lengthChange": false, "autoWidth": false,
            "aProcessing": true,//Activamos el procesamiento del datatables
            "aServerSide": true,//Paginación y filtrado realizados por el servidor
            dom: '<Bl<f>rtip>',//Definimos los elementos del control de tabla
            buttons: [		          
                    ],
            "ajax":
                    {
                        url:  urlServidor + 'producto/datatable',
                        type : "get",
                        dataType : "json",						
                        error: function(e){
                            console.log(e.responseText);	
                        }
                    },
            "bDestroy": true,
            "iDisplayLength": 10,//Paginación

            "language": {
 
			    "sProcessing":     "Procesando...",
			 
			    "sLengthMenu":     "Mostrar _MENU_ registros",
			 
			    "sZeroRecords":    "No se encontraron resultados",
			 
			    "sEmptyTable":     "Ningún dato disponible en esta tabla",
			 
			    "sInfo":           "Mostrando un total de _TOTAL_ registros",
			 
			    "sInfoEmpty":      "Mostrando un total de 0 registros",
			 
			    "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
			 
			    "sInfoPostFix":    "",
			 
			    "sSearch":         "Buscar:",
			 
			    "sUrl":            "",
			 
			    "sInfoThousands":  ",",
			 
			    "sLoadingRecords": "Cargando...",
			 
			    "oPaginate": {
			 
			        "sFirst":    "Primero",
			 
			        "sLast":     "Último",
			 
			        "sNext":     "Siguiente",
			 
			        "sPrevious": "Anterior"
			 
			    },
			 
			    "oAria": {
			 
			        "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
			 
			        "sSortDescending": ": Activar para ordenar la columna de manera descendente"
			 
			    }

			   }//cerrando language
        });
    }

    function recuperarCategorias(){
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

                $('#upd-categoria').html(inicio);
            },
            error : function(jqXHR, status, error) {
                console.log('Disculpe, existió un problema');
            },
            complete : function(jqXHR, status) {
                // console.log('Petición realizada');
            }
        });
    }

    function actualizar_producto(){
        $('#btn-update').click(function(){
            let id = $('#upd-producto-id').val();

            let categoria_id = $('#upd-categoria').val();
            let nombre = $('#upd-nombre').val();
            let precio_venta = $('#upd-precio-venta').val();
            let descripcion = $('#upd-descripcion').val();
            
            if(nombre.length == 0){
                Swal.fire(
                    'Usuario',
                    'Complete el campo nombre',
                    'warning'
                  )
            }else
            if(precio_venta.length == 0){
                Swal.fire(
                    'Usuario',
                    'Complete el campo precio de venta',
                    'warning'
                  )
            }else
            if(categoria_id == 0){
                Swal.fire(
                    'Usuario',
                    'Seleccione una categoría',
                    'warning'
                  )
            }
            else
            {
                let json = {
                    producto: {
                        id:id,
                        categoria_id: categoria_id,
                        nombre: nombre,
                        precio_venta: precio_venta,
                        descripcion: descripcion
                    }
                };

                $.ajax({
                    // la URL para la petición
                    url : urlServidor + 'producto/editar',
                    type : 'POST',
                    data: {data: JSON.stringify(json)},
                    dataType : 'json',
                    success : function(response){
                        console.log(response);
                        if(response.status){
                            Swal.fire({
                                 title: 'Listo !',
                                 text: response.mensaje,
                                 icon: 'success',
                                 confirmButtonText: 'Ok',
                                 confirmButtonColor: '#3085d6' 
                            })

                            $('#actualizar_producto').modal('hide');
                            iniciar_tabla();
                        }else{
                            Swal.fire({
                                title: 'Error!',
                                text: response.mensaje,
                                icon: 'error',
                                confirmButtonText: 'Ok',
                                confirmButtonColor: '#3085d6' 
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
        })
    }

});

function editar_producto(id){
    $('#actualizar_producto').modal('show');
    cargar_producto(id);
}

function cargar_producto(id){
    $.ajax({
        // la URL para la petición
        url : urlServidor + 'producto/listar/' + id,
        // especifica si será una petición POST o GET
        type : 'GET',
        // el tipo de información que se espera de respuesta
        dataType : 'json',
        success : function(response) { 
            if(response.status){
                $('#upd-producto-id').val(response.producto.id);
                $('#upd-codigo').val(response.producto.codigo);
                $('#upd-nombre').val(response.producto.nombre);
                $('#upd-categoria').val(response.producto.categoria.id);
                $('#upd-precio-venta').val(response.producto.precio_venta);
                $('#upd-descripcion').val(response.producto.descripcion);
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

function eliminar_producto(id){    
    Swal.fire({
        title: '¿Estás seguro de eliminar el producto?',
        text: "No se podrá recuperar el registro",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
            let json = {producto: { id }};

            $.ajax({
                // la URL para la petición
                url : urlServidor + 'producto/eliminar/'+id,
                // especifica si será una petición POST o GET
                type : 'POST',
                // el tipo de información que se espera de respuesta
                data: {data: JSON.stringify(json)},
                dataType : 'json',
                success : function(response) {
                    if(response.status){
                        Swal.fire({
                            title:'Producto!',
                            icon: 'success',
                            text:'Se ha borrado el producto correctamente',
                            confirmButtonColor: '#004a43',
                        });
                          iniciar_tabla2(); 
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
    })
}

function iniciar_tabla2(){
    tabla=$('#tabla-producto').dataTable({
        "lengthMenu": [ 5, 10, 25, 75, 100],//mostramos el menú de registros a revisar
        "responsive": true, "lengthChange": false, "autoWidth": false,
        "aProcessing": true,//Activamos el procesamiento del datatables
        "aServerSide": true,//Paginación y filtrado realizados por el servidor
        dom: '<Bl<f>rtip>',//Definimos los elementos del control de tabla
        buttons: [		          
                ],
        "ajax":
                {
                    url:  urlServidor + 'producto/datatable',
                    type : "get",
                    dataType : "json",						
                    error: function(e){
                        console.log(e.responseText);	
                    }
                },
        "bDestroy": true,
        "iDisplayLength": 10,//Paginación

        "language": {

            "sProcessing":     "Procesando...",
         
            "sLengthMenu":     "Mostrar _MENU_ registros",
         
            "sZeroRecords":    "No se encontraron resultados",
         
            "sEmptyTable":     "Ningún dato disponible en esta tabla",
         
            "sInfo":           "Mostrando un total de _TOTAL_ registros",
         
            "sInfoEmpty":      "Mostrando un total de 0 registros",
         
            "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
         
            "sInfoPostFix":    "",
         
            "sSearch":         "Buscar:",
         
            "sUrl":            "",
         
            "sInfoThousands":  ",",
         
            "sLoadingRecords": "Cargando...",
         
            "oPaginate": {
         
                "sFirst":    "Primero",
         
                "sLast":     "Último",
         
                "sNext":     "Siguiente",
         
                "sPrevious": "Anterior"
         
            },
         
            "oAria": {
         
                "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
         
                "sSortDescending": ": Activar para ordenar la columna de manera descendente"
         
            }

           }//cerrando language
    });
}