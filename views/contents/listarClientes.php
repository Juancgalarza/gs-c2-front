<!-- Content Header (Page header) -->
<div class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
                <h1 class="m-0"> <b>Listar Cliente</b> </h1>
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
                <div class="card card-outline card-danger shadow">
                    <!-- /.card-header -->
                    <div class="card-body">
                        <div class="div" style="overflow: auto;">
                            <table id="tabla-cliente" class="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th style="width: 10px">#</th>
                                        <th>Cédula</th>
                                        <th>Nombres</th>
                                        <th>Apellidos</th>
                                        <th>Teléfono</th>
                                        <th>Correo</th>
                                        <th>Dirección</th>
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
<div class="modal fade" id="actualizar_cliente">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header bg-danger">
                <h4 class="modal-title">Actualizar Cliente</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="contanier-fluid">
                    <form method="POST" id="update-cliente">

                        <div class="row">
                            <div class="col-12 form-group">
                                <input type="hidden" id="upd-cliente-id">
                                <input type="hidden" id="upd-persona-id">
                                <label for="">Cédula</label>
                                <input type="text" class="form-control solo-numeros" readOnly placeholder="Cédula"
                                    id="upd-cedula" readonly maxlength="10" minlength="10">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-6 form-group">
                                <label for="">Nombres</label>
                                <input type="text" class="form-control solo-letras" placeholder="Nombres"
                                    id="upd-nombres">
                            </div>
                            <div class="col-6 form-group">
                                <label for="">Apellidos</label>
                                <input type="text" class="form-control solo-letras" placeholder="Apellidos"
                                    id="upd-apellidos">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-6 form-group">
                                <label for="">Teléfono</label>
                                <input type="text" class="form-control solo-numeros" placeholder="Teléfono"
                                    id="upd-telefono" minlength="10" maxlength="10">
                            </div>
                            <div class="col-6 form-group">
                                <label for="">Correo</label>
                                <input type="email" class="form-control" placeholder="Correo"
                                    id="upd-correo">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 form-group">
                                <label for="exampleInputEmail1">Dirección</label>
                                <textarea class="form-control" id="upd-direccion" rows="2"
                                    placeholder="Dirección"></textarea>
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

<script src="<?=BASE?>views/dist/js/scripts/listarClientes.js?ver=1.1.1"></script>