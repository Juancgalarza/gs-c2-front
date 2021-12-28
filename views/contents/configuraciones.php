<!-- Content Header (Page header) -->
<div class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
                <h1 class="m-0">Configuraciones</h1>
            </div><!-- /.col -->
        </div><!-- /.row -->
    </div><!-- /.container-fluid -->
</div>
<!-- /.content-header -->

<!-- Main content -->
<div class="content">
    <div class="container-fluid">
        <div class="row d-flex justify-content-center">
            <div class="col-12 col-md-9">
                <div class="card card-danger" style="border: 1px solid #000;">
                    <div class="card-header">
                        <h3 class="card-title">Configuraciones Generales del Sistema</h3>
                    </div>
                    <form id="formulario-configuraciones" type="POST">
                        <input type="hidden" id="config-id">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-12 col-md-6">
                                    <div class="form-group">
                                        <label for="exampleInputEmail1">Porcentaje de Ganancia %</label>
                                        <input type="text" class="form-control form-control-sm soloNumeros"
                                            id="config-porcentaje" placeholder="Porcentaje de Ganancia" maxlength='2'
                                            maxlength='2'>
                                    </div>
                                </div>
                                <div class="col-12 col-md-6">
                                    <div class="form-group">
                                        <label for="exampleInputPassword1">IVA %</label>
                                        <input type="text" class="form-control soloNumeros form-control-sm"
                                            id="config-iva" placeholder="IVA">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- /.card-body -->
                        <div class="card-footer">
                            <button type="submit" class="btn btn-primary"><i
                                    class="far fa-save mr-2"></i>Guardar</button>
                            <button type="button" class="btn btn-danger" id="btn-cancelar"><i
                                    class="fas fa-times mr-2"></i>Cancelar</button>
                        </div>
                    </form>
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

<!-- jquery-validation -->
<script src="<?=BASE?>views/plugins/jquery-validation/jquery.validate.min.js"></script>
<script src="<?=BASE?>views/plugins/jquery-validation/additional-methods.min.js"></script>

<script src="<?=BASE?>views/dist/js/scripts/configuraciones.js"></script>