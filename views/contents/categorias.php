<!-- Content Header (Page header) -->
<div class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
                <h1 class="m-0">Categorías</h1>
            </div><!-- /.col -->
        </div><!-- /.row -->
    </div><!-- /.container-fluid -->
</div>
<!-- /.content-header -->

<!-- Main content -->
<div class="content">
    <div class="container-fluid">
        <div class="row">
            <div class="col-12 col-md-8 col-lg-6 d-flex">
                <label class="mr-2" style="margin-top: 7px;">Nombre</label>
                <input type="text" class="form-control" placeholder="Nueva categoría" minlength="4" required
                    id="texto-categoria">
                <button class="btn btn-primary ml-2" id="nueva-categoria">
                    <i class="fas fa-save"></i>
                </button>
                <button class="btn btn-danger ml-2" id="btn-cancelar">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-12">
                <div class="card card-danger">
                    <div class="card-header">
                        <h3 class="card-title">Listado de Categorías</h3>
                    </div>
                    <!-- /.card-header -->
                    <div class="card-body">
                        <div class="div" style="overflow: auto;">
                            <table id="tabla-categorias" class="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th style="width: 10px">#</th>
                                        <th>Categoría</th>
                                        <th>Productos</th>
                                        <th>Fecha Registro</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody id="body-categoria2">

                                </tbody>
                            </table>
                        </div>
                    </div>
                    <!-- /.card-body -->
                </div>
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

<div class="modal fade" id="modal-producto">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header bg-dark">
                <h4 class="modal-title">Productos</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-12">
                        <div style="height: 248px !important; overflow: auto;">
                            <table id="tabla-categorias" class="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th style="width: 10px">#</th>
                                        <th style="display: none">ID</th>
                                        <th>Nombre del Producto</th>
                                    </tr>
                                </thead>
                                <tbody id="body-productos-categoria">

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

<div class="modal fade" id="actualizar_categoria">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header bg-danger">
                <h4 class="modal-title">Actualizar Categoría</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="contanier-fluid">
                    <form method="POST" id="update-categoria">
                        <div class="row">
                            <div class="col-12 form-group">
                                <input type="hidden" id="upd-categoria-id">
                                <label for="">Categoría</label>
                                <input type="text" class="form-control" placeholder="Categoría" id="upd-categoria">
                            </div>
                        </div>
                    </form>
                    <div class="row text-right">
                        <div class="col-12">
                            <button id="btn-update" class="btn btn-danger"><i
                                    class="fas fa-pencil-alt mr-2"></i>Actualizar</button>
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

<!-- Scripts -->

<script src="<?=BASE?>views/plugins/datatables/jquery.dataTables.min.js"></script>
<script src="<?=BASE?>views/plugins/datatables-bs4/js/dataTables.bootstrap4.min.js"></script>
<script src="<?=BASE?>views/plugins/datatables-responsive/js/dataTables.responsive.min.js"></script>
<script src="<?=BASE?>views/plugins/datatables-responsive/js/responsive.bootstrap4.min.js"></script>
<script src="<?=BASE?>views/plugins/datatables-buttons/js/dataTables.buttons.min.js"></script>
<script src="<?=BASE?>views/plugins/datatables-buttons/js/buttons.bootstrap4.min.js"></script>
<script src="<?=BASE?>views/plugins/jszip/jszip.min.js"></script>
<script src="<?=BASE?>views/plugins/pdfmake/pdfmake.min.js"></script>
<script src="<?=BASE?>views/plugins/pdfmake/vfs_fonts.js"></script>
<script src="<?=BASE?>views/plugins/datatables-buttons/js/buttons.html5.min.js"></script>
<script src="<?=BASE?>views/plugins/datatables-buttons/js/buttons.print.min.js"></script>
<script src="<?=BASE?>views/plugins/datatables-buttons/js/buttons.colVis.min.js"></script>

<script src="<?=BASE?>views/dist/js/scripts/categorias.js"></script>