/* $(function(){ */
    _init();

    function _init(){
        cargarProveedor();
        getUsuario();
        getIVA();
        //cargarProductos();
        agregarItem();
        guardarCompra();
        generarDescuento();
        reset();
        buscarProveedor();
        buscarProducto();
        generarCodigo();
        cancelarFormulario();
    }

    function getUsuario(){
        let user = JSON.parse(localStorage.getItem('sesion'));
        let nombres = user.persona.nombres + ' ' + user.persona.apellidos;

        $('#compra-usuario-actual').val(nombres);
    }

    function getIVA(){
        $.ajax({
            // la URL para la petición
            url : urlServidor + 'configuraciones/listar/' + 1,
            // especifica si será una petición POST o GET
            type : 'GET',
            // el tipo de información que se espera de respuesta
            dataType : 'json',
            success : function(response) { 
                if(response.status){
                   $('#ac-valor-iva').text(response.config.iva); 
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
                        <td>${element.correo}</td>
                        <td>${element.telefono}</td>
                        <td>
                          <div class="div text-center">
                            <button class="btn btn-danger btn-sm" data-dismiss="modal" onclick="seleccionar_prov(${element.id})">
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
                        <td>${element.codigo}</td>
                        <td>${element.nombre}</td>
                        <td>${element.stock}</td>
                        <td>
                          <div class="div text-center">
                            <button class="btn btn-danger btn-sm" data-dismiss="modal" onclick="seleccionar_producto(${element.id})">
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

    function agregarItem(){
        $('#item-agregar').click(function(){
            let id = $('#prod-id').val();
            let nombre = $('#prod-nombre').val();
            let cantidad = $('#pro-cantidad').val();
            let precio_compra = $('#prod-precio-compra').val();

            let total_producto = Number((parseInt(cantidad) * parseFloat(precio_compra)));
            let totalp = total_producto.toFixed(2);

           if(id.length == 0){
            Swal.fire(
                'Compra',
                'Seleccione un producto',
                'info'
              )
           }else
            if(cantidad.length == 0){
            Swal.fire(
                'Compra',
                'Ingrese una cantidad para el producto',
                'info'
              )
           }else
           if(precio_compra.length == 0){
            Swal.fire(
                'Compra',
                'Ingrese el precio unitario del producto',
                'info'
              )
           }else{
               let tr = `<tr id="fila-prod-${id}" class="fila-productos">
                   <td><i class="fas fa-star-of-life"></i></td>
                   <td>${nombre}</td>
                   <td>${cantidad}</td>
                   <td>${precio_compra}</td>
                   <td class="total_producto">${totalp}</td>
                   <th>
                        <div>
                            <button class="btn btn-outline-danger" onclick="borrar_item(${id})">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                   </th>
                   <th style="display:none;">${id}</th>
               </tr>`;

               $('#listProdCompras').append(tr);
               resetProducto();
               calcularTotal();
           }
        });
    }

    function generarDescuento(){
        $('#compra-descuento-input').blur(function(){
            let descuento = $('#compra-descuento-input').val();
            let total_global = parseFloat($('#compra-totalg').text());

            if(total_global > 0){
                if(total_global > 0){
                    let subtotal = parseFloat($('#compra-subtotal').text());

                    let iva = parseFloat($('#compra-iva').text());
                    let total_general = subtotal + iva - descuento;
                    total_general = Number(total_general.toFixed(2));
                    
                    let total_parcial = subtotal + iva;

                    if(descuento >= total_parcial){
                        Swal.fire(
                            'Compra!',
                            'El descuento no puede se mayor o igual a la compra',
                            'error'
                          );
                    }else{
                        $('#compra-totalg').text(total_general);
                        $('#compra-descuento').text(descuento);
                    }
                }
            }
        });
    }

    function resetProducto(){
        $('#prod-id').val('');
        $('#prod-codigo').val('');
        $('#prod-nombre').val('');
        $('#pro-cantidad').val('');
        $('#prod-stock').val('');
        $('#prod-precio-compra').val('');
    }

    function guardarCompra(){
        $('#guardar-compra').click(function(){
            
            let serie_documento = $('#compras-serie').text();
            let fecha_compra = $('#compra-fecha').val();
            let usuario_id = JSON.parse(localStorage.getItem('sesion')).id;
            let proveedor_id = $('#prov-id').val();
            let sub_total = $('#compra-subtotal').text();
            let iva = $('#compra-iva').text();
            let total = $('#compra-totalg').text();

            let productos = $('.fila-productos');
            let items = $('.total_producto');

            if(proveedor_id.length == 0){
                Swal.fire(
                    'Compra!',
                    'Debe seleccionar un proveedor',
                    'error'
                  );
            }else
            if(items.length == 0){
                Swal.fire(
                    'Compra!',
                    'Debe agregar al menos un producto',
                    'error'
                  );
            }else{

                let detalles = [];
               for(let i = 0; i < productos.length; i++){

                   let producto_id = productos[i].children[6].innerText;
                   let cantidad = productos[i].children[2].innerText;
                   let precio_compra = productos[i].children[3].innerText;
                   let total = productos[i].children[4].innerText;

                   let aux = {
                        producto_id, cantidad, precio_compra, total
                   };
                   detalles.push(aux);
               }

               let json = {
                    compra: {
                        serie_documento,
                        fecha_compra,
                        usuario_id,
                        proveedor_id,
                        sub_total,
                        iva,
                        total
                    },
                    detalle_compras: detalles
                };

                ajaxGuardar(json);
                //console.log(json);
            }
        });
    }

    function ajaxGuardar(json){
        $.ajax({
            // la URL para la petición
            url : urlServidor + 'compra/save',
            // especifica si será una petición POST o GET
            type : 'POST',

            data : "data=" + JSON.stringify(json),
            // el tipo de información que se espera de respuesta
            dataType : 'json',
            success : function(response) {
                console.log(response);
                if(response.status){
                    Swal.fire(
                        'Compra',
                        response.mensaje,
                        'success'
                    );
                    reset();
                    guardarCodigo();
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
        $('#compra-id').val('');  
        $('#compra-descuento-input').val('0.00');
        $('#prov-id').val('');
        $('#prov-ruc').val('');
        $('#prov-razon-social').val('');
        $('#prov-correo').val('');
        $('#prov-telefono').val('');
        $('#prod-id').val('');
        $('#prod-codigo').val('');
        $('#prod-nombre').val('');
        $('#prod-stock').val('');
        $('#pro-cantidad').val('');
        $('#prod-precio-compra').val('');
        $('#compra-subtotal').text('0');
        $('#compra-iva').text('0');
        $('#compra-descuento').text('0');
        $('#compra-totalg').text('0');
        $('#listProdCompras').html('');
    }

    function buscarProveedor(){
        $('#buscar-prov').keyup(function(){
            let texto = $('#buscar-prov').val();
            $.ajax({
                // la URL para la petición
                url : urlServidor + 'proveedor/buscar/'+ texto,
                // especifica si será una petición POST o GET
                type : 'GET',
                // el tipo de información que se espera de respuesta
                dataType : 'json',
                success : function(response) {
                   console.log(response);
                   if(response.status){
                    let tr = '';
                    let i = 1;
                    response.proveedores.forEach(element => {
                            tr += `<tr id="item-prov-${element.id}">
                            <td>${i}</td>
                            <td style="display: none">${element.id}</td>
                            <td>${element.ruc}</td>
                            <td>${element.razon_social}</td>
                            <td>${element.correo}</td>
                            <td>${element.telefono}</td>
                            <td>
                            <div class="div text-center">
                                <button class="btn btn-danger btn-sm" data-dismiss="modal" onclick="seleccionar_prov(${element.id})">
                                <i class="fas fa-check"></i>
                                </button>
                            </div>
                            </td>
                        </tr>`;
                        i++;
                        });
                        $('#proveedor-body').html(tr);
                    }else{
                        $('#proveedor-body').html('No hay información disponible');
                   }
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

    function buscarProducto(){
        $('#buscar-producto').keyup(function(){
            let texto = $('#buscar-producto').val();
            $.ajax({
                // la URL para la petición
                url : urlServidor + 'producto/buscar/'+ texto,
                // especifica si será una petición POST o GET
                type : 'GET',
                // el tipo de información que se espera de respuesta
                dataType : 'json',
                success : function(response) {
                   console.log(response);
                   if(response.status){
                    let tr = '';
                    let i = 1;
                    response.productos.forEach(element => {
                            tr += `<tr id="item-prod-${element.id}">
                            <td>${i}</td>
                            <td style="display: none">${element.id}</td>
                            <td>${element.codigo}</td>
                            <td>${element.nombre}</td>
                            <td>${element.stock}</td>
                            <td>
                            <div class="div text-center">
                                <button class="btn btn-danger btn-sm" data-dismiss="modal" onclick="seleccionar_producto(${element.id})">
                                <i class="fas fa-check"></i>
                                </button>
                            </div>
                            </td>
                        </tr>`;
                        i++;
                        });
                        $('#producto-body').html(tr);
                    }else{
                        $('#producto-body').html('No hay información disponible');
                   }
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

    function generarCodigo(){
        $.ajax({
            // la URL para la petición
            url : urlServidor + 'compra/generar_codigo/compras',

            // especifica si será una petición POST o GET
            type : 'GET',
            // el tipo de información que se espera de respuesta
            dataType : 'json',
            success : function(response) {
                   /*  console.log(response); */
               if(response.status){
                   $('#compras-serie').text(response.codigo);
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
        let codigo = $('#compras-serie').text();

        let json = {
            codigo: {
                codigo: codigo,
                tipo: 'compras'
            }
        }

        $.ajax({
            // la URL para la petición
            url : urlServidor + 'compra/aumentarCodigo',
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

    function cancelarFormulario(){
        $('#btn-cancelar').click(function(){
            window.location.href = urlCliente + 'inicio/administrador';
        });
    }

/* }); */

function seleccionar_prov(id){
    let fila = '#item-prov-'+id;
    let f = $(fila)[0].children;

    let ruc = f[2].innerText;
    let correo = f[4].innerText;
    let telefono = f[5].innerText;
    let razon_social = f[3].innerText;
    
    $('#prov-id').val(id);
    $('#prov-ruc').val(ruc);
    $('#prov-razon-social').val(razon_social);
    $('#prov-correo').val(correo);
    $('#prov-telefono').val(telefono);

    $.ajax({
        // la URL para la petición
        url : urlServidor + 'catalogo/listar/' + id,
        // especifica si será una petición POST o GET
        type : 'GET',
        // el tipo de información que se espera de respuesta
        dataType : 'json',
        success : function(response) {
            if(response.status){
                let tr = '';
                let i = 1;
                response.catalogo.forEach(element => {
                    tr += `<tr id="item-prod-${element.producto.id}">
                    <td>${i}</td>
                    <td style="display: none">${element.producto.id}</td>
                    <td>${element.producto.codigo}</td>
                    <td>${element.producto.nombre}</td>
                    <td>${element.producto.stock}</td>
                    <td>${element.producto.precio_compra}</td>
                    <td>
                      <div class="div text-center">
                        <button class="btn btn-danger btn-sm" data-dismiss="modal" onclick="seleccionar_producto(${element.producto.id})">
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

function seleccionar_producto(id){   
    let fila = '#item-prod-'+id;
    let f = $(fila)[0].children;

    let codigo = f[2].innerText;
    let nombre = f[3].innerText;
    let stock = f[4].innerText;
    let precio_compra = f[5].innerText;
    
    $('#prod-id').val(id);
    $('#prod-codigo').val(codigo);
    $('#prod-nombre').val(nombre);
    $('#prod-stock').val(stock);
    $('#prod-precio-compra').val(precio_compra);
    $('#btn-borrar').show();          
}

function seleccionar_producto2(id){
    $.ajax({
        // la URL para la petición
        url : urlServidor + 'configuraciones/listar/' + 1,
        // especifica si será una petición POST o GET
        type : 'GET',
        // el tipo de información que se espera de respuesta
        dataType : 'json',
        success : function(response) {     
            if(response.status){
                let fila = '#item-prod-'+id;
                let f = $(fila)[0].children;

                let codigo = f[2].innerText;
                let nombre = f[3].innerText;
                let stock = f[4].innerText;
                let precio_compra = f[5].innerText;
                
                $('#prod-id').val(id);
                $('#prod-codigo').val(codigo);
                $('#prod-nombre').val(nombre);
                $('#prod-stock').val(stock);
                $('#prod-precio-compra').val(precio_compra);
                $('#btn-borrar').show();

                let margen = (precio_compra * (response.config.porcentaje_ganancia)/100);
                let precio_venta =  Number(precio_compra) + Number(margen);
                //console.log(precio_venta.toFixed(2));
                let producto_id = id;
                let json = {
                    datos: {
                        producto_id,
                        precio_venta,
                        margen
                    },
                };
                $.ajax({
                    // la URL para la petición
                    url : urlServidor + 'compra/actualizarPrecioVentaMargen',
                    // especifica si será una petición POST o GET
                    type : 'POST',
                    data : "data=" + JSON.stringify(json),
                    // el tipo de información que se espera de respuesta
                    dataType : 'json',
                    success : function(response) {
                        console.log(response);
                        if(response.status){
                            Swal.fire(
                                'Listo!',
                                response.mensaje,
                                'success'
                            );
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
        },
        error : function(jqXHR, status, error) {
            console.log('Disculpe, existió un problema');
        },
        complete : function(jqXHR, status) {
            // console.log('Petición realizada');
        }
    });
}

function calcularTotal(){
    $.ajax({
        // la URL para la petición
        url : urlServidor + 'configuraciones/listar/' + 1,
        // especifica si será una petición POST o GET
        type : 'GET',
        // el tipo de información que se espera de respuesta
        dataType : 'json',
        success : function(response) { 
            if(response.status){
                let tr = $('#listProdCompras tr');
                let descuento_input = parseFloat($('#compra-descuento-input').val());
            
                let subtotal = 0;
                let descuento = 0;
                let total = 0;
            
                for (let i = 0; i < tr.length; i++) {
                    let hijos = tr[i].children;
                    subtotal += parseFloat(hijos[4].innerText); 
                }
            
                let iva = Number(subtotal.toFixed(2)) * (response.config.iva)/100;
                descuento = descuento_input;
                
                if(descuento > 0){
                    total = subtotal - descuento + iva;
                }else{
                    total = Number(subtotal) + Number(iva.toFixed(2));
                }
            
                $('#compra-subtotal').text(subtotal.toFixed(2));
                $('#compra-iva').text(iva.toFixed(2));
                $('#compra-descuento').text(descuento.toFixed(2));
                $('#compra-totalg').text(total.toFixed(2));
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

function borrar_item(id){
    let tr = '#fila-prod-'+id;
    $(tr).remove();

    calcularTotal();
}