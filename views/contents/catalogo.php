<!-- Content Header (Page header) -->
<div class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
                <h1 class="m-0"> <b>Asignación Proveedor con Producto</b> </h1>
            </div><!-- /.col -->
        </div><!-- /.row -->
    </div><!-- /.container-fluid -->
</div>
<!-- /.content-header -->

<!-- Main content -->
<div class="content">
    <div class="container-fluid">
        <div class="row">
            <div class="col-12 col-md-6">
                <div class="card card-danger shadow">
                    <div class="card-header">
                        <h3 class="card-title">Proveedor</h3>

                        <div class="card-tools">
                            <button type="button" class="btn btn-tool" data-card-widget="collapse">
                                <i class="fas fa-minus"></i>
                            </button>
                        </div>
                    </div>
                    <div class="card-body">
                        <input type="hidden" id="prov-id">
                        <div class="row" style="height: 200px !important; overflow: auto;">
                            <div class="col-12">
                                <div class="tabla-buscar-proveedor">
                                    <table class="table table-hover text-nowrap table-striped table-bordered">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th style="display: none">ID</th>
                                                <th>RUC</th>
                                                <th>Razón Social</th>
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
                    <!-- /.card-body -->
                </div>
            </div>
            <div class="col-12 col-md-6">
                <div class="card card-danger shadow">
                    <div class="card-header">
                        <h3 class="card-title">Productos</h3>

                        <div class="card-tools">
                            <button type="button" class="btn btn-tool" data-card-widget="collapse">
                                <i class="fas fa-minus"></i>
                            </button>
                        </div>
                    </div>
                    <div class="card-body">
                        <input type="hidden" id="prod-id">
                        <div class="row" style="height: 200px !important; overflow: auto;">
                            <div class="col-12">
                                <div class="tabla-buscar-producto">
                                    <table class="table table-hover text-nowrap table-striped table-bordered">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th style="display: none">ID</th>
                                                <th>Nombre</th>
                                                <th>Categoría</th>
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
                    <!-- /.card-body -->
                </div>
            </div>
        </div>
        <div class="row d-flex justify-content-center">
            <div class="col-12 col-md-10">
                <div class="card card-danger shadow">
                    <div class="card-header">
                        <h3 class="card-title">Asignar Precio Compra</h3>

                        <div class="card-tools">
                            <button type="button" class="btn btn-tool" data-card-widget="collapse">
                                <i class="fas fa-minus"></i>
                            </button>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="info-box mb-3 bg-info">
                                    <span class="info-box-icon"><i class="fas fa-truck-moving"></i></span>

                                    <div class="info-box-content">
                                        <span class="info-box-text">Proveedor</span>
                                        <span class="info-box-number" id="prov-seleccionado">----------</span>
                                    </div>
                                    <!-- /.info-box-content -->
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="info-box mb-3 bg-info">
                                    <span class="info-box-icon"><i class="fas fa-box-open"></i></span>

                                    <div class="info-box-content">
                                        <span class="info-box-text">Producto</span>
                                        <span class="info-box-number" id="prod-seleccionado">----------</span>
                                    </div>
                                    <!-- /.info-box-content -->
                                </div>
                            </div>
                        </div>
                        <div class="row d-flex justify-content-center">
                            <div class="col-12 col-md-6">
                                <div class="form-group">
                                    <label for="">Precio de Compra</label>
                                    <input id="prod-precio-compra" type="text" class="form-control form-control-sm"
                                        placeholder="Precio de Compra" data-mask
                                        data-inputmask='"mask":"9{1,5}.9{1,2}"'>
                                </div>
                            </div>
                        </div>
                        <div class="row d-flex justify-content-end">
                            <button class="btn btn-primary btn-sm" id="asignar-pcompra"><i
                                    class="fas fa-check mr-2"></i>Asignar Precio</button>

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

<script src="<?=BASE?>views/dist/js/scripts/catalogo.js"></script>