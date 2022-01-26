<!-- Content Header (Page header) -->
<div class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
                <h1 class="m-0"> <b>Proveedores</b> </h1>
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
                        <h3 class="card-title">Nuevo Proveedor</h3>
                    </div>
                    <!-- /.card-header -->
                    <!-- form start -->
                    <form id="formulario-proveedor" type="POST">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-12 col-md-6">
                                    <div class="form-group">
                                        <label for="exampleInputEmail1">RUC</label>
                                        <input type="text" name="ruc" class="form-control form-control-sm soloNumeros"
                                            id="ruc-proveedor" placeholder="RUC" maxlength='13' maxlength='13'>
                                    </div>
                                </div>
                                <div class="col-12 col-md-6">
                                    <div class="form-group">
                                        <label for="exampleInputPassword1">Razón Social</label>
                                        <input type="text" name="razon_social" class="form-control form-control-sm"
                                            id="razon-social-proveedor" placeholder="Razón Social">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12 col-md-6">
                                    <div class="form-group">
                                        <label for="exampleInputPassword1">Correo</label>
                                        <input type="email" name="correo" class="form-control form-control-sm"
                                            id="correo-proveedor" placeholder="Correo">
                                    </div>
                                </div>
                                <div class="col-12 col-md-6">
                                    <div class="form-group">
                                        <label for="exampleInputPassword1">Teléfono</label>
                                        <input type="text" name="telefono"
                                            class="form-control form-control-sm soloNumeros" id="telefono-proveedor"
                                            placeholder="Teléfono" maxlength='10' maxlength='10'>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Dirección</label>
                                <textarea class="form-control form-control-sm" id="direccion-proveedor" rows="2"
                                    placeholder="Dirección"></textarea>
                            </div>
                        </div>
                        <!-- /.card-body -->
                        <div class="card-footer">
                            <button type="submit" class="btn btn-primary btn-sm"><i
                                    class="far fa-save mr-2"></i>Guardar</button>
                            <button type="button" class="btn btn-danger btn-sm" id="btn-cancelar"><i
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

<script src="<?=BASE?>views/dist/js/scripts/proveedores.js?ver=1.1.1.2"></script>