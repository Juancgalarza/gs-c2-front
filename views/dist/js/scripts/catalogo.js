$(function(){

    _init();

    function _init(){
        cargarProveedor();
        cargarProductos();
        guardarCatalogo();
    }

    function cargarProveedor(){
        $.ajax({
            // la URL para la petición
            url : urlServidor + 'proveedor/listar',
            // especifica si será una petición POST o GET
            type : 'GET',
            // el tipo de información que se espera de respuesta
            dataType : 'json',
            success : function(response) {
                if(response.length > 0){
                    let tr = '';
                    let i = 1;
                    response.forEach(element => {
                        tr += `<tr id="item-prov-${element.id}">
                        <td>${i}</td>
                        <td style="display: none">${element.id}</td>
                        <td>${element.ruc}</td>
                        <td>${element.razon_social}</td>
                        <td>
                          <div class="div text-center">
                            <button class="btn btn-danger btn-sm" onclick="seleccionar_prov(${element.id})">
                              <i class="fas fa-check"></i>
                            </button>
                          </div>
                        </td>
                      </tr>`;
                      i++;
                    });
                    $('#proveedor-body').html(tr);
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

    function cargarProductos(){
        $.ajax({
            // la URL para la petición
            url : urlServidor + 'producto/listar',
            // especifica si será una petición POST o GET
            type : 'GET',
            // el tipo de información que se espera de respuesta
            dataType : 'json',
            success : function(response) {
                if(response.length > 0){
                    let tr = '';
                    let i = 1;
                    response.forEach(element => {
                        tr += `<tr id="item-prod-${element.id}">
                        <td>${i}</td>
                        <td style="display: none">${element.id}</td>
                        <td>${element.nombre}</td>
                        <td>${element.categoria.categoria}</td>
                        <td>
                          <div class="div text-center">
                            <button class="btn btn-danger btn-sm" onclick="seleccionar_producto(${element.id})">
                              <i class="fas fa-check"></i>
                            </button>
                          </div>
                        </td>
                      </tr>`;
                      i++;
                    });
                    $('#producto-body').html(tr);
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

    function guardarCatalogo(){
        $('#asignar-pcompra').click(function(){  
            let proveedor_id = $('#prov-id').val();
            let producto_id = $('#prod-id').val();
            let precio_compra = $('#prod-precio-compra').val();

            if(proveedor_id.length == 0){
                Swal.fire(
                    'Compra!',
                    'Debe seleccionar un proveedor',
                    'error'
                  );
            }else
            if(producto_id.length == 0){
                Swal.fire(
                    'Compra!',
                    'Debe agregar al menos un producto',
                    'error'
                  );
            }else
            if(precio_compra.length == 0){
                Swal.fire(
                    'Compra!',
                    'Debe agregar un precio de compra',
                    'error'
                  );
            }else{

               let json = {
                    catalogo: {
                        proveedor_id,
                        producto_id,
                        precio_compra
                    },
                };

                ajaxGuardar(json);
            }
        });
    }

    function ajaxGuardar(json){
        $.ajax({
            // la URL para la petición
            url : urlServidor + 'catalogo/save',
            // especifica si será una petición POST o GET
            type : 'POST',
            data : "data=" + JSON.stringify(json),
            // el tipo de información que se espera de respuesta
            dataType : 'json',
            success : function(response) {
                console.log(response);
                if(response.status){
                    Swal.fire(
                        'Catalogo',
                        response.mensaje,
                        'success'
                    );
                    reset();
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

    function reset(){ 
        $('#prod-precio-compra').val('0.00');
        $('#prov-id').val('');
        $('#prov-seleccionado').text('----------');
        $('#prod-id').val('');
        $('#prod-seleccionado').text('----------');
    }

});

function seleccionar_prov(id){
    let fila = '#item-prov-'+id;
    let f = $(fila)[0].children;

    let ruc = f[2].innerText;
    let razon_social = f[3].innerText;
    
    $('#prov-id').val(id);
    $('#prov-seleccionado').text(ruc + ' - ' + razon_social);
}

function seleccionar_producto(id){
    let fila = '#item-prod-'+id;
    let f = $(fila)[0].children;

    let nombre = f[2].innerText;
    let categoria = f[3].innerText;
    
    $('#prod-id').val(id);
    $('#prod-seleccionado').text(nombre + ' - ' + categoria);
}
