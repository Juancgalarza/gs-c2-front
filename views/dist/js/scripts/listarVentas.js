var tabla;

$(function(){
    _init();

    function _init(){
        iniciar_tabla();
        imprimir();
    }

    function iniciar_tabla(){
        tabla=$('#tabla-ventas').dataTable({
            "lengthMenu": [ 5, 10, 25, 75, 100],//mostramos el menú de registros a revisar
            "responsive": true, "lengthChange": false, "autoWidth": false,
            "aProcessing": true,//Activamos el procesamiento del datatables
            "aServerSide": true,//Paginación y filtrado realizados por el servidor
            dom: '<Bl<f>rtip>',//Definimos los elementos del control de tabla
            buttons: [		          
                    ],
            "ajax":
                    {
                        url:  urlServidor + 'venta/datatable',
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

    function imprimir(){
        $('#btn-imprimir').click(function(){
            let element = document.getElementById('factura-venta');
            let opt = {
            margin:       0.5,
            filename:     'Factura_Venta.pdf',
            image:        { type: 'jpeg', quality: 1.5 },
            html2canvas:  { scale: 1 },
            jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
            };

            // New Promise-based usage:
            html2pdf().set(opt).from(element).save();
        });
    }

});

function ir_venta_factura(id){
    $('#modal-factura').modal("show");
    $.ajax({
        // la URL para la petición
        url : urlServidor + 'venta/listar/' + id,
        // especifica si será una petición POST o GET
        type : 'GET',
        // el tipo de información que se espera de respuesta
        dataType : 'json',
        success : function(response) {
            console.log(response);
            let tr = '';
              if(response.status){
                  let compra_id = response.venta.id;
                  let numero_serie = response.venta.serie;
                  let compra_fecha = response.venta.fecha_venta;
                  let proveedor_compra = response.venta.cliente.persona.nombres + ' ' + response.venta.cliente.persona.apellidos;
                  let proveedor_direccion = response.venta.cliente.persona.direccion;
                  let proveedor_correo = response.venta.cliente.persona.correo;
                  
                  let compra_descuento = response.venta.descuento_efectivo;
                  let compra_iva = response.venta.iva;
                  let compra_subtotal = response.venta.subtotal;
                  let compra_total = response.venta.total;
                  

                  $('#compra_id').text(compra_id);
                  $('#compra_numero_serie').text(numero_serie);
                  $('#compra_fecha').text(compra_fecha);
                  $('#compra_proveedor').text(proveedor_compra);
                  $('#direccion_proveedor').text(proveedor_direccion);
                  $('#correo_proveedor').text(proveedor_correo);
                  
                  $('#compra_descuento').text(compra_descuento);
                  $('#compra_iva').text(compra_iva);
                  $('#compra_subtotal').text(compra_subtotal);
                  $('#compra_total').text(compra_total);
                 
                response.venta.detalle_venta.forEach((element, i) => {
                    tr += `<tr>
                    <td style="color: black;">${i+1} </td>
                    <td style="color: black;">${element.producto.nombre}</td>
                    <td style="color: black;">${element.cantidad}</td>
                    <td style="color: black;">${element.precio_venta}</td>
                    <td style="color: black;">${element.total}</td>
                </tr>`;
                });
                $('#body_detalle_venta').html(tr);
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