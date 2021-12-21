/* $(function(){ */

    _init();

    function _init(){
        getUsuario();
        cargarProductos();
        cargarClientes();
        agregarItem();
        guardarVenta();
        buscarProducto();
        buscarCliente();
        generarCodigo();
    }

    function getUsuario(){
        let user = JSON.parse(localStorage.getItem('sesion'));
        let nombres = user.persona.nombres + ' ' + user.persona.apellidos;

        $('#venta-usuario-actual').val(nombres);
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
                        <td>${element.precio_venta}</td>
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

    function cargarClientes(){
        $.ajax({
            // la URL para la petición
            url : urlServidor + 'cliente/listar',
            // especifica si será una petición POST o GET
            type : 'GET',
            // el tipo de información que se espera de respuesta
            dataType : 'json',
            success : function(response) {
                if(response.length > 0){
                    let tr = '';
                    let i = 1;
                    response.forEach(element => {
                        tr += `<tr id="fila-cliente-${element.cliente.id}">
                            <td>${i}</td>
                            <td style="display: none">${element.cliente.id}</td>
                            <td>${element.cliente.persona.cedula}</td>
                            <td>${element.cliente.persona.nombres}</td>
                            <td>${element.cliente.persona.apellidos}</td>
                            <th style="display: none">${element.cliente.persona.telefono}</th>
                            <th style="display: none">${element.cliente.persona.correo}</th>
                            <th style="display: none">${element.cliente.persona.direccion}</th>
                            <td>
                                <div class="div text-center">
                                    <button data-dismiss="modal" class="btn btn-danger btn-sm" onclick="seleccionar_cliente(${element.cliente.id})">
                                        <i class="fas fa-check"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>`;
                      i++;
                    });
                    $('#cliente-body').html(tr);
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
            let precio_venta = $('#prod-precio-venta').val();
            let descuento = $('#compra-descuento-input').val();
            let stock = parseInt($('#prod-stock').val());

            let total_producto = Number((parseInt(cantidad) * parseFloat(precio_venta)).toFixed(2));

           if(id.length == 0){
            Swal.fire(
                'Venta!',
                'Seleccione un producto',
                'info'
              )
           }else
            if(cantidad.length == 0){
            Swal.fire(
                'Venta!',
                'Ingrese una cantidad para el producto',
                'info'
              )
           }else
           if(parseInt(cantidad) > stock){
            Swal.fire(
                'Venta',
                'La cantidad excede al stock actual',
                'warning'
              )
           }
           else
           {
                        let tr = `<tr id="fila-prod-${id}" class="fila-productos">
                               <td><i class="fas fa-star-of-life"></i></td>
                               <td>${nombre}</td>
                               <td>${cantidad}</td>
                               <td>${precio_venta}</td>
                               <td class="total_producto">${total_producto}</td>
                               <th>
                                    <div>
                                        <button class="btn btn-outline-danger" onclick="borrar_item(${id},${total_producto})">
                                            <i class="fas fa-minus"></i>
                                        </button>
                                    </div>
                               </th>
                               <td style="display:none;">N</td>
                               <td style="display:none;">0</td>
                               <th style="display:none;">${id}</th>
                           </tr>`;
                
                           $('#listProdCompras').append(tr);
                            resetProducto();
                            calcularTotal();
                    
                }   
            
        });
    }

    function resetProducto(){
        $('#prod-id').val('');
        $('#prod-codigo').val('');
        $('#prod-nombre').val('');
        $('#pro-cantidad').val('');
        $('#prod-stock').val('');
        $('#prod-precio-venta').val('');
    }

    function guardarVenta(){
        $('#guardar-venta').click(function(){
            let serie= $('#venta-serie').val();
            let fecha_venta = $('#venta-fecha').val();
            let descuento_efectivo = $('#venta-descuento-input').val();
            let usuario_id = JSON.parse(localStorage.getItem('sesion')).id;
            let cliente_id = $('#venta-cliente-id').val();
            let subtotal = $('#venta-subtotal').text();
            let iva = $('#venta-iva').text();
            let total = $('#venta-totalg').text();

            let object = array_producto();
            //console.log(object);

            let json = {
                venta: {
                    serie,
                    fecha_venta,
                    descuento_efectivo,
                    usuario_id,
                    cliente_id,
                    subtotal,
                    iva,
                    total
                },
                    detalles: object.detalles
            };

            if(serie.length == 0){
                Swal.fire(
                    'Venta',
                    'Ingrese numero de serie',
                    'info'
                  )
            }else{
                ajax_guardar(json);
            }
            //console.log(json);
        });

        function array_producto(){      
            let tr = $('#listProdCompras tr');
    
            let detalles = [];
            let json = {};

            for(let i = 0; i < tr.length; i++){
                let hijos = tr[i].children;

                let cantidad = hijos[2].innerText;
                let precio_venta = hijos[3].innerText;
                let total = hijos[4].innerText;
                let producto_id = hijos[8].innerText;

                let object = {cantidad, precio_venta, total, producto_id};
                detalles.push(object);
            }

            json = {
                detalles
            }
            return json;
        }
    }

    function reset(){
        $('#venta-id').val('');
        $('#venta-descuento-input').val('0.00');
        $('#venta-cliente-id').val('');
        $('#venta-cliente-nombre').val('');
        $('#venta-cliente-apellido').val('');
        $('#venta-cliente-direccion').val('');
        $('#venta-cliente-telefono').val('');
        $('#prod-id').val('');
        $('#prod-codigo').val('');
        $('#prod-nombre').val('');
        $('#prod-stock').val('');
        $('#pro-cantidad').val('');
        $('#prod-precio-compra').val('');
        $('#venta-subtotal').text('0');
        $('#venta-iva').text('0');
        $('#venta-descuento').text('0');
        $('#venta-totalg').text('0');
        $('#listProdCompras').html('');
    }

    function ajax_guardar(json){
        $.ajax({
            // la URL para la petición
            url : urlServidor + 'venta/save',
            // especifica si será una petición POST o GET
            type : 'POST',

            data : "data=" + JSON.stringify(json),
            // el tipo de información que se espera de respuesta
            dataType : 'json',
            success : function(response) {
                if(response.status){
                    Swal.fire(
                        'Venta!',
                        response.mensaje,
                        'success'
                    );
                    calcularTotal();
                    guardarCodigo();
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
                            <td>${element.precio_venta}</td>
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

    function buscarCliente(){
        $('#buscar-cli').keyup(function(){
            let texto = $('#buscar-cli').val();
            $.ajax({
                // la URL para la petición
                url : urlServidor + 'cliente/buscar/'+ texto,
                // especifica si será una petición POST o GET
                type : 'GET',
                // el tipo de información que se espera de respuesta
                dataType : 'json',
                success : function(response) {
                   console.log(response);
                   if(response.status){
                    let tr = '';
                    let i = 1;
                    response.clientes.forEach(element => {
                                tr += `<tr id="fila-cliente-${element.id}">
                                    <td>${i}</td>
                                    <td style="display: none">${element.id}</td>
                                    <td>${element.cedula}</td>
                                    <td>${element.nombres}</td>
                                    <td>${element.apellidos}</td>
                                    <th style="display: none">${element.telefono}</th>
                                    <th style="display: none">${element.correo}</th>
                                    <th style="display: none">${element.direccion}</th>
                                    <td>
                                        <div class="div text-center">
                                            <button data-dismiss="modal" class="btn btn-danger btn-sm" onclick="seleccionar_cliente(${element.id})">
                                                <i class="fas fa-check"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>`;
                            i++;
                        });
                        $('#cliente-body').html(tr);
                    }else{
                        $('#cliente-body').html('No hay información disponible');
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
            url : urlServidor + 'venta/generar_codigo/ventas',
            // especifica si será una petición POST o GET
            type : 'GET',
            // el tipo de información que se espera de respuesta
            dataType : 'json',
            success : function(response) {
               if(response.status){
                   $('#venta-serie').val(response.codigo);
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
        let codigo = $('#venta-serie').val();

        let json = {
            codigo: {
                codigo: codigo,
                tipo: 'ventas'
            }
        }

        $.ajax({
            // la URL para la petición
            url : urlServidor + 'venta/aumentarCodigo',
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
/* }); */

function seleccionar_cliente(id){
    let fila = '#fila-cliente-'+id;
    let f = $(fila)[0].children;
    
    let nombres = f[3].innerText;
    let apellidos = f[4].innerText;
    let telefono = f[5].innerText;
    let direccion = f[7].innerText;

    $('#venta-cliente-id').val(id);
    $('#venta-cliente-nombre').val(nombres);
    $('#venta-cliente-apellido').val(apellidos);
    $('#venta-cliente-telefono').val(telefono);
    $('#venta-cliente-direccion').val(direccion);
}

function seleccionar_producto(id){
    let fila = '#item-prod-'+id;
    let f = $(fila)[0].children;

    let codigo = f[2].innerText;
    let nombre = f[3].innerText;
    let stock = f[4].innerText;
    let precio_venta = f[5].innerText;
    
    if(parseInt(stock) > 0){
        $('#prod-id').val(id);
        $('#prod-codigo').val(codigo);
        $('#prod-nombre').val(nombre);
        $('#prod-stock').val(stock);
        $('#prod-precio-venta').val(precio_venta)
        $('#btn-borrar').show();
        $('#modal-producto-venta').modal('hide');
    }else{
        Swal.fire(
            'Venta',
            'No hay productos en Stock',
            'warning'
          )
    }
}

function borrar_item(id,total_producto){
    let tr = '#fila-prod-'+id;
    $(tr).remove();

    let pos = array_producto.indexOf(id);

    array_producto.splice(pos,1);

    actualizar_card();
}

function calcularTotal(){
    let tr = $('#listProdCompras tr');
    let descuento_input = parseFloat($('#venta-descuento-input').val());

    let subtotal = 0;
    let descuento = 0;
    let total = 0;

    for (let i = 0; i < tr.length; i++) {
        let hijos = tr[i].children;
        subtotal += parseFloat(hijos[4].innerText); 
    }

    let iva = Number(subtotal.toFixed(2)) * 0.12;
    descuento = descuento_input;
    
    if(descuento > 0){
        total = subtotal - descuento + iva;
    }else{
        total = Number(subtotal) + Number(iva.toFixed(2));
    }

    $('#venta-subtotal').text(subtotal.toFixed(2));
    $('#venta-iva').text(iva.toFixed(2));
    $('#venta-descuento').text(descuento);
    $('#venta-totalg').text(total.toFixed(2));
}
