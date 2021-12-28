<!-- Content Header (Page header) -->
<div class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
                <h1 class="m-0">Compras</h1>
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
                <div class="card card-danger" style="border: 1px solid #000;">
                    <div class="card-header">
                        <h3 class="card-title">
                            <i class="fas fa-shopping-cart"></i>
                            Nueva Compra
                        </h3>
                        <div class="card-tools">
                            <div class="col-12">
                                <span> <b>Número de Serie:</b> <b id="compras-serie"></b> </span>
                            </div>
                        </div>
                    </div>
                    <!-- /.card-header -->
                    <div class="card-body">
                        <input type="hidden" id="compra-id">
                        <div class="row">
                            <div class="col-12">
                                <button class="btn btn-outline-danger btn-sm mb-3" data-toggle="modal"
                                    data-target="#modal-proveedor" data-backdrop="static" data-keyboard="false"><i
                                        class="fas fa-search mr-2"></i>Buscar
                                    Proveedor</button>
                            </div>
                        </div>
                        <div class="row">
                            <input type="hidden" id="prov-id">
                            <div class="col-12 col-md-3">
                                <div class="form-group">
                                    <label for="">RUC</label>
                                    <input id="prov-ruc" type="text" readOnly class="form-control form-control-sm" placeholder="RUC">
                                </div>
                            </div>
                            <div class="col-12 col-md-3">
                                <div class="form-group">
                                    <label for="">Razón Social</label>
                                    <input id="prov-razon-social" type="text" readOnly class="form-control form-control-sm"
                                        placeholder="Razón Social">
                                </div>
                            </div>
                            <div class="col-12 col-md-3">
                                <div class="form-group">
                                    <label for="">Correo</label>
                                    <input id="prov-correo" type="text" readOnly class="form-control form-control-sm"
                                        placeholder="Correo">
                                </div>
                            </div>
                            <div class="col-12 col-md-3">
                                <div class="form-group">
                                    <label for="">Teléfono</label>
                                    <input id="prov-telefono" type="text" readOnly class="form-control form-control-sm"
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
                                    <label for="">Precio de Compra</label>
                                    <input id="prod-precio-compra" type="text" class="form-control form-control-sm"
                                        placeholder="Precio de Compra" data-mask
                                        data-inputmask='"mask":"9{1,5}.9{1,2}"'>
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
                                    <h5 class="box-title"><b>Producto a Comprar</b></h5>
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
                                        <h3 id="compra-subtotal">0</h3>

                                        <p><strong>(+) </strong>Subtotal</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-6 col-md-4">
                                <div class="small-box bg-dark">
                                    <div class="inner">
                                        <h3 id="compra-iva">0</h3>

                                        <p><strong>(+) </strong>IVA <span id="ac-valor-iva"></span>%</p>
                                    </div>
                                </div>
                            </div>
                            <!-- <div class="col-6 col-md-3">
                                <div class="small-box bg-dark">
                                    <div class="inner">
                                        <h3 id="compra-descuento">0</h3>

                                        <p><strong>(-) </strong>Descuento</p>
                                    </div>
                                </div>
                            </div> -->
                            <div class="col-6 col-md-4">
                                <div class="small-box bg-dark">
                                    <div class="inner">
                                        <h3 id="compra-totalg">0</h3>

                                        <p>Total</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="text-right">
                            <button class="btn btn-primary btn-sm" id="guardar-compra"><i
                                    class="fas fa-cart-plus mr-2"></i>Guardar
                                Compra</button>
                            <button class="btn btn-danger btn-sm mr-2" id="btn-cancelar"><i
                                    class="fas fa-times mr-2"></i>Cancelar
                                Compra</button>
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
<div class="modal fade" id="modal-proveedor">
    <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content">
            <div class="modal-header bg-danger">
                <h4 class="modal-title">Proveedores</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-12">
                        <div class="form-group">
                            <input type="hidden" id="vehiculo-id">
                            <label for="">Buscar Proveedor</label>
                            <input id="buscar-prov" type="text" class="form-control"
                                placeholder="Ingrese RUC o razón social del proveedor a buscar">
                        </div>
                    </div>
                </div>
                <div class="row" style="height: 200px !important; overflow: auto;">
                    <div class="col-12">
                        <div class="tabla-buscar-prveedor">
                            <table class="table table-hover text-nowrap">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th style="display: none">ID</th>
                                        <th>RUC</th>
                                        <th>Razón Social</th>
                                        <th>Correo</th>
                                        <th>Teléfono</th>
                                        <th>Seleccionar</th>
                                    </tr>
                                </thead>
                                <tbody id="proveedor-body">
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


<script src="<?=BASE?>views/dist/js/scripts/compras.js?Ver=1.1.1.2"></script>