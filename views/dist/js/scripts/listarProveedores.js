var tabla;

$(function(){

    _init();

    function _init(){
        iniciar_tabla();
        actualizar_proveedor();
    }

    function iniciar_tabla(){
        tabla=$('#tabla-proveedor').dataTable({
            "lengthMenu": [ 5, 10, 25, 75, 100],//mostramos el menú de registros a revisar
            "responsive": true, "lengthChange": false, "autoWidth": false,
            "aProcessing": true,//Activamos el procesamiento del datatables
            "aServerSide": true,//Paginación y filtrado realizados por el servidor
            dom: '<Bl<f>rtip>',//Definimos los elementos del control de tabla
            buttons: [		          
                    ],
            "ajax":
                    {
                        url:  urlServidor + 'proveedor/datatable',
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

    function actualizar_proveedor(){
        $('#btn-update').click(function(){
            let id = $('#upd-proveedor-id').val();
            let razon_social = $('#upd-razon-social').val();
            let direccion = $('#upd-direccion').val();
            let correo = $('#upd-correo').val();
            let telefono = $('#upd-telefono').val();
            
            if(razon_social.length == 0){
                Swal.fire(
                    'Usuario',
                    'Complete el campo razón social',
                    'warning'
                  )
            }else
            if(direccion.length == 0){
                Swal.fire(
                    'Usuario',
                    'Complete el campo dirección',
                    'warning'
                  )
            }else
            if(telefono.length == 0){
                Swal.fire(
                    'Usuario',
                    'Complete el campo teléfono',
                    'warning'
                  )
            }else
            if(correo.length == 0){
                Swal.fire(
                    'Usuario',
                    'Complete el campo correo',
                    'warning'
                  )
            }else
            {
                let json = {
                    proveedor: {
                        id:id,
                        razon_social: razon_social,
                        direccion: direccion,
                        correo: correo,
                        telefono: telefono,
                    }
                };

                $.ajax({
                    // la URL para la petición
                    url : urlServidor + 'proveedor/editar',
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

                            $('#actualizar_proveedor').modal('hide');
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

function editar_proveedor(id){
    $('#actualizar_proveedor').modal('show');
    cargar_proveedor(id);
}

function cargar_proveedor(id){
    $.ajax({
        // la URL para la petición
        url : urlServidor + 'proveedor/listar/' + id,
        // especifica si será una petición POST o GET
        type : 'GET',
        // el tipo de información que se espera de respuesta
        dataType : 'json',
        success : function(response) {
       
            console.log(response);
            if(response.status){
                $('#upd-proveedor-id').val(response.proveedor.id);
                $('#upd-ruc').val(response.proveedor.ruc);
                $('#upd-razon-social').val(response.proveedor.razon_social);
                $('#upd-correo').val(response.proveedor.correo);
                $('#upd-telefono').val(response.proveedor.telefono);
                $('#upd-direccion').val(response.proveedor.direccion);
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

function eliminar_proveedor(id){    
    Swal.fire({
        title: '¿Estás seguro de eliminar el proveedor?',
        text: "No se podra recuperar el registro",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
            let json = {proveedor: { id }};

            $.ajax({
                // la URL para la petición
                url : urlServidor + 'proveedor/eliminar/'+id,
                // especifica si será una petición POST o GET
                type : 'POST',
                // el tipo de información que se espera de respuesta
                data: {data: JSON.stringify(json)},
                dataType : 'json',
                success : function(response) {
                    if(response.status){
                        Swal.fire({
                            title:'Proveedor!',
                            icon: 'success',
                            text:'Se ha borrado el proveedor correctamente',
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
    tabla=$('#tabla-proveedor').dataTable({
        "lengthMenu": [ 5, 10, 25, 75, 100],//mostramos el menú de registros a revisar
        "responsive": true, "lengthChange": false, "autoWidth": false,
        "aProcessing": true,//Activamos el procesamiento del datatables
        "aServerSide": true,//Paginación y filtrado realizados por el servidor
        dom: '<Bl<f>rtip>',//Definimos los elementos del control de tabla
        buttons: [		          
                ],
        "ajax":
                {
                    url:  urlServidor + 'proveedor/datatable',
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
