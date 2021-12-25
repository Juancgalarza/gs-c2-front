<style>
.box-img-producto {
    width: 95px;
    height: 80px;
    overflow: hidden;
}

.box-img-producto>img {
    width: 100% !important;
    height: 100% !important;
}

.pt-25 {
    padding-top: 30px !important;
}
</style>
<!-- Content Header (Page header) -->
<div class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
                <h1 class="m-0">Listado de Productos</h1>
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
                <div class="card card-outline card-danger">
                    <!-- /.card-header -->
                    <div class="card-body">
                        <div class="div" style="overflow: auto;">
                            <table id="tabla-producto" class="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th style="width: 10px">#</th>
                                        <th>Imagen</th>
                                        <th>Código</th>
                                        <th>Nombre</th>
                                        <th>Categoría</th>
                                        <th>Precio Venta</th>
                                        <th>Stock</th>
                                        <th>Estado</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>

                            </table>
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
<div class="modal fade" id="actualizar_producto">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header bg-danger">
                <h4 class="modal-title">Actualizar Producto</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="contanier-fluid">
                    <form method="POST" id="update-cliente">

                        <div class="row">
                            <div class="col-6 form-group">
                                <input type="hidden" id="upd-producto-id">
                                <label for="">Código</label>
                                <input type="text" class="form-control solo-numeros" readOnly placeholder="Código"
                                    id="upd-codigo" readonly maxlength="10" minlength="10">
                            </div>
                            <div class="col-6 form-group">
                                <label for="">Nombre</label>
                                <input type="text" class="form-control solo-letras" placeholder="Nombre"
                                    id="upd-nombre">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-6 form-group">
                                <label for="exampleInputPassword1">Categoría</label>
                                <select class="form-control" id="upd-categoria" name="categoria">
                                    <!-- <option>Seleccione una Categoría</option> -->
                                </select>
                            </div>
                            <div class="col-6 form-group">
                                <label for="">Precio Venta</label>
                                <input type="text" class="form-control solo-numeros" placeholder="Stock" id="upd-precio-venta">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 form-group">
                                <label for="exampleInputEmail1">Descripción</label>
                                <textarea class="form-control" id="upd-descripcion" rows="2"
                                    placeholder="Descripción"></textarea>
                            </div>
                        </div>
                    </form>
                    <div class="row text-right">
                        <div class="col-12">
                            <button id="btn-update" class="btn btn-danger"><i
                                    class="far fa-check-circle mr-2"></i>Actualizar</button>
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

<script src="<?=BASE?>views/dist/js/scripts/listarProductos.js"></script>