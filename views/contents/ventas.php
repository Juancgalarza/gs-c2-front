<!-- Content Header (Page header) -->
<div class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
                <h1 class="m-0"> <b>Ventas</b> </h1>
            </div><!-- /.col -->
        </div><!-- /.row -->
    </div><!-- /.container-fluid -->
</div>
<!-- /.content-header -->

<!-- Main content -->
<div class="content">
    <div class="container-fluid">
        <div class="row">
            <div class="col-12">
                <div class="card card-danger shadow">
                    <div class="card-header">
                        <h3 class="card-title">
                            <i class="fas fa-shopping-cart"></i>
                            Nueva Orden de Venta
                        </h3>
                        <div class="card-tools">
                            <div class="col-12">
                                <span> <b>Número de Serie:</b> <b id="venta-serie"></b> </span>
                            </div>
                        </div>
                    </div>
                    <!-- /.card-header -->
                    <div class="card-body">
                        <input type="hidden" id="venta-id">
                        <div class="row">
                            <div class="col-12">
                                <button class="btn btn-outline-danger btn-sm mb-3" data-toggle="modal"
                                    data-target="#modal-clientes" data-backdrop="static" data-keyboard="false"><i
                                        class="fas fa-search mr-2"></i>Buscar
                                    Cliente</button>
                            </div>
                        </div>
                        <div class="row">
                            <input type="hidden" id="venta-cliente-id">
                            <div class="col-12 col-md-3">
                                <div class="form-group">
                                    <label for="">Nombre</label>
                                    <input id="venta-cliente-nombre" type="text" readOnly class="form-control form-control-sm"
                                        placeholder="Nombre">
                                </div>
                            </div>
                            <div class="col-12 col-md-3">
                                <div class="form-group">
                                    <label for="">Apellido</label>
                                    <input id="venta-cliente-apellido" type="text" readOnly class="form-control form-control-sm"
                                        placeholder="Apellido">
                                </div>
                            </div>
                            <div class="col-12 col-md-3">
                                <div class="form-group">
                                    <label for="">Dirección</label>
                                    <input id="venta-cliente-direccion" type="text" readOnly class="form-control form-control-sm"
                                        placeholder="Dirección">
                                </div>
                            </div>
                            <div class="col-12 col-md-3">
                                <div class="form-group">
                                    <label for="">Teléfono</label>
                                    <input id="venta-cliente-telefono" type="text" readOnly class="form-control form-control-sm"
                                        placeholder="Teléfono">
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-12">
                                <button class="btn btn-outline-danger btn-sm mb-3" data-toggle="modal"
                                    data-target="#modal-producto" data-backdrop="static" data-keyboard="false"><i
                                        class="fas fa-search mr-2"></i>Buscar
                                    Producto</button>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 col-md-3">
                                <input type="hidden" id="prod-id">
                                <div class="form-group">
                                    <label for="">Nombre</label>
                                    <input id="prod-nombre" type="text" readOnly class="form-control form-control-sm"
                                        placeholder="Nombre">
                                </div>
                            </div>
                            <div class="col-12 col-md-2">
                                <div class="form-group">
                                    <label for="">Stock</label>
                                    <input id="prod-stock" type="text" readOnly class="form-control form-control-sm"
                                        placeholder="Stock">
                                </div>
                            </div>
                            <div class="col-12 col-md-2">
                                <div class="form-group">
                                    <label for="">Cantidad</label>
                                    <input id="pro-cantidad" type="text" class="form-control form-control-sm numeros-vd"
                                        placeholder="Cantidad">
                                </div>
                            </div>
                            <div class="col-12 col-md-3">
                                <div class="form-group">
                                    <label for="">Precio de Venta</label>
                                    <input id="prod-precio-venta" type="text" readOnly class="form-control form-control-sm"
                                        placeholder="Precio de Venta">
                                </div>
                            </div>
                            <div class="col-12 col-md-2">
                                <button id="item-agregar" class="btn btn-dark btn-sm" style="margin-top: 30px;"><i
                                        class="fas fa-plus"></i></button>
                                <button id="btn-borrar" class="btn btn-danger btn-sm" style="margin-top: 30px;"><i
                                        class="fas fa-minus"></i></button>
                            </div>
                        </div>

                        <div class="row">
                            <div class="table-responsive">
                                <div class="box-header">
                                    <h5 class="box-title"><b>Producto a Vender</b></h5>
                                </div>
                                <div class="box-body">
                                    <table id="detalles" class="table table-striped">
                                        <thead>
                                            <tr class="bg-danger">


                                                <th class="all">#</th>
                                                <th class="all">Producto</th>
                                                <th class="min-desktop">Cantidad</th>
                                                <th class="min-desktop">Precio</th>
                                                <th class="min-desktop">Total</th>
                                                <th class="min-desktop">Acciones</th>

                                            </tr>
                                        </thead>

                                        <tbody id="listProdCompras">

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-6 col-md-4">
                                <div class="small-box bg-dark">
                                    <div class="inner">
                                        <h3 id="venta-subtotal">0</h3>

                                        <p><strong>(+) </strong>Subtotal</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-6 col-md-4">
                                <div class="small-box bg-dark">
                                    <div class="inner">
                                        <h3 id="venta-iva">0</h3>

                                        <p><strong>(+) </strong>IVA <span id="ac-valor-iva"></span>%</p>
                                    </div>
                                </div>
                            </div>
                           <!--  <div class="col-6 col-md-3">
                                <div class="small-box bg-dark">
                                    <div class="inner">
                                        <h3 id="venta-descuento">0</h3>

                                        <p><strong>(-) </strong>Descuento</p>
                                    </div>
                                </div>
                            </div> -->
                            <div class="col-6 col-md-4">
                                <div class="small-box bg-dark">
                                    <div class="inner">
                                        <h3 id="venta-totalg">0</h3>

                                        <p>Total</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="text-right">
                            <button class="btn btn-primary btn-sm" id="guardar-venta"><i
                                    class="fas fa-cart-plus mr-2"></i>Guardar
                                Venta</button>
                            <button class="btn btn-danger btn-sm" id="btn-cancelar"><i class="fas fa-times mr-2"></i>Cancelar
                                Venta</button>
                        </div>
                    </div>

                    <!-- /.card-body -->
                </div>
            </div>

        </div>
        <!-- /.row -->
    </div>
    <!-- /.container-fluid -->
</div>
<!-- /.content -->
</div>
<!-- /.content-wrapper -->

<!-- Modales -->
<div class="modal fade" id="modal-clientes">
    <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
            <div class="modal-header bg-danger">
                <h4 class="modal-title">Clientes</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-12">
                        <div class="form-group">
                            <label for="">Buscar Cliente</label>
                            <input id="buscar-cli" type="text" class="form-control"
                                placeholder="Ingrese cedula o apellido del Cliente">
                        </div>
                    </div>
                </div>
                <div class="row" style="height: 200px !important; overflow: auto;">
                    <div class="col-12">
                        <div class="tabla-buscar-cliente">
                            <table class="table table-hover text-nowrap">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th style="display: none">ID</th>
                                        <th>Cédula</th>
                                        <th>Nombre</th>
                                        <th>Apellido</th>
                                        <th style="display: none">Teléfono</th>
                                        <th style="display: none">Correo</th>
                                        <th style="display: none">Dirección</th>
                                        <th>Seleccionar</th>
                                    </tr>
                                </thead>
                                <tbody id="cliente-body">
                                    <!-- <tr>
                                        <td>1</td>
                                        <td style="display: none">1</td>
                                        <td>2400487963</td>
                                        <td>Pedro</td>
                                        <td>Roca</td>
                                        <td>
                                            <div class="div">
                                                <button class="btn btn-danger btn-sm" onclick="seleccionar_cliente(1)">
                                                    <i class="fas fa-check"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr> -->
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer justify-content-between">
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>

<div class="modal fade" id="modal-producto">
    <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
            <div class="modal-header bg-danger">
                <h4 class="modal-title">Productos</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-12">
                        <div class="form-group">
                            <input type="hidden" id="vehiculo-id">
                            <label for="">Buscar Producto</label>
                            <input id="buscar-producto" type="text" class="form-control"
                                placeholder="Ingrese código o nombre del producto a buscar">
                        </div>
                    </div>
                </div>
                <div class="row" style="height: 200px !important; overflow: auto;">
                    <div class="col-12">
                        <div class="tabla-buscar-producto">
                            <table class="table table-hover text-nowrap">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th style="display: none">ID</th>
                                        <th>Código</th>
                                        <th>Nombre</th>
                                        <th>Stock</th>
                                        <th style="display: none">P. Compra</th>
                                        <th style="display: none">P. Venta</th>
                                        <th>Seleccionar</th>
                                    </tr>
                                </thead>
                                <tbody id="producto-body">

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer justify-content-between">
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>

<script src="<?=BASE?>views/dist/js/scripts/ventas.js?ver=1.1.1.2"></script>