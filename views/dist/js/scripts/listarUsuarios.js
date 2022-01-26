var tabla;

/* $(function(){ */

    _init();

    function _init(){
        iniciar_tabla();
        actualizar_usuario();
        recuperar_rol();
    }

    function iniciar_tabla(){
        tabla=$('#tabla-usuario').dataTable({
            "lengthMenu": [ 5, 10, 25, 75, 100],//mostramos el menú de registros a revisar
            "responsive": true, "lengthChange": false, "autoWidth": false,
            "aProcessing": true,//Activamos el procesamiento del datatables
            "aServerSide": true,//Paginación y filtrado realizados por el servidor
            dom: '<Bl<f>rtip>',//Definimos los elementos del control de tabla
            buttons: [		          
                    ],
            "ajax":
                    {
                        url:  urlServidor + 'usuario/datatable',
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

    function actualizar_usuario(){
        $('#btn-update').click(function(){
            let id = $('#upd-usuario-id').val();
            let persona_id = $('#upd-persona-id').val();
            let rol_id = $('#upd-select-rol option:selected').val();
            let usuario = $('#upd-usuario').val();
            let nombres = $('#upd-nombres').val();
            let apellidos = $('#upd-apellidos').val();
            
            
            if(usuario.length == 0){
                Swal.fire(
                    'Usuario',
                    'Complete el campo usuario',
                    'warning'
                  )
            }else
            if(nombres.length == 0){
                Swal.fire(
                    'Usuario',
                    'Complete el campo nombres',
                    'warning'
                  )
            }else
            if(apellidos.length == 0){
                Swal.fire(
                    'Usuario',
                    'Complete el campo apellidos',
                    'warning'
                  )
            }else
            {
                let json = {
                    usuario: {
                        id:id,
                        persona_id: persona_id,
                        rol_id: rol_id,
                        usuario: usuario,
                        nombres: nombres,
                        apellidos: apellidos,
                    }
                };

                $.ajax({
                    // la URL para la petición
                    url : urlServidor + 'usuario/editar',
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
                                 confirmButtonColor: '#004a43' 
                            })

                            $('#actualizar_usuario').modal('hide');
                            iniciar_tabla();
                        }else{
                            Swal.fire({
                                title: 'Error!',
                                text: response.mensaje,
                                icon: 'error',
                                confirmButtonText: 'Ok',
                                confirmButtonColor: '#004a43' 
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
/* }); */

function editar_usuario(id){
    $('#actualizar_usuario').modal('show');
    cargar_usuario(id);
}

function cargar_usuario(id){
    $.ajax({
        // la URL para la petición
        url : urlServidor + 'usuario/listar/' + id,
        // especifica si será una petición POST o GET
        type : 'GET',
        // el tipo de información que se espera de respuesta
        dataType : 'json',
        success : function(response) { 
            console.log(response);
            if(response.status){
                $('#upd-usuario-id').val(response.usuario.id);
                $('#upd-persona-id').val(response.usuario.persona.id);
                $('#upd-usuario').val(response.usuario.usuario);
                $('#upd-nombres').val(response.usuario.persona.nombres);
                $('#upd-apellidos').val(response.usuario.persona.apellidos);
                $('#upd-select-rol').val(response.usuario.rol_id);
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

function recuperar_rol(){
    $.ajax({
        // la URL para la petición
        url : urlServidor + 'rol/listar',
        // especifica si será una petición POST o GET
        type : 'GET',
        // el tipo de información que se espera de respuesta
        dataType : 'json',
        success : function(response){
            if(response.status){
                let option = '<option value=0>Seleccione el Rol</option>';

                response.rol.forEach(element => {
                     option += `<option value=${element.id}>${element.cargo}</option>`;                                            
                });
                $('#upd-select-rol').html(option);
            }else{
                Swal.fire({
                     title: 'Error!',
                     text: 'No hay roles disponibles',
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

function eliminar_usuario(id){    
    Swal.fire({
        title: '¿Estás seguro de eliminar el usuario?',
        text: "No se podra recuperar el registro",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
            let json = {usuario: { id }};

            $.ajax({
                // la URL para la petición
                url : urlServidor + 'usuario/eliminar/'+id,
                // especifica si será una petición POST o GET
                type : 'POST',
                // el tipo de información que se espera de respuesta
                data: {data: JSON.stringify(json)},
                dataType : 'json',
                success : function(response) {
                    if(response.status){
                        Swal.fire({
                            title:'Usuario!',
                            icon: 'success',
                            text:'Se ha borrado el usuario correctamente',
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
    tabla=$('#tabla-usuario').dataTable({
        "lengthMenu": [ 5, 10, 25, 75, 100],//mostramos el menú de registros a revisar
        "responsive": true, "lengthChange": false, "autoWidth": false,
        "aProcessing": true,//Activamos el procesamiento del datatables
        "aServerSide": true,//Paginación y filtrado realizados por el servidor
        dom: '<Bl<f>rtip>',//Definimos los elementos del control de tabla
        buttons: [		          
                ],
        "ajax":
                {
                    url:  urlServidor + 'usuario/datatable',
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