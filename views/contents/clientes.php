<!-- Content Header (Page header) -->
<div class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
                <h1 class="m-0">Clientes</h1>
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
                        <h3 class="card-title">Nuevo Cliente</h3>
                    </div>
                    <!-- /.card-header -->
                    <!-- form start -->
                    <form id="formulario-cliente" type="POST">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-12 col-md-6">
                                    <div class="form-group">
                                        <label for="exampleInputEmail1">Cédula</label>
                                        <input type="text" name="cedula" class="form-control soloNumeros" id="cedula-cliente"
                                            placeholder="Cédula" maxlength='10' maxlength='10'>
                                    </div>
                                </div>
                                <div class="col-12 col-md-6">
                                    <div class="form-group">
                                        <label for="exampleInputPassword1">Fecha Registro</label>
                                        <input type="text" name="fecha_ingreso" class="form-control"
                                            id="fecha-cliente" placeholder="Fecha Registro" value="<?=date('d/m/Y')?>">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12 col-md-6">
                                    <div class="form-group">
                                        <label for="exampleInputPassword1">Nombres</label>
                                        <input type="text" name="nombres" class="form-control letras-vd" id="nombres-cliente"
                                            placeholder="Nombres">
                                    </div>
                                </div>
                                <div class="col-12 col-md-6">
                                    <div class="form-group">
                                        <label for="exampleInputPassword1">Apellidos</label>
                                        <input type="text" name="apellidos" class="form-control letras-vd" id="apellidos-cliente"
                                            placeholder="Apellidos">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12 col-md-6">
                                    <div class="form-group">
                                        <label for="exampleInputPassword1">Correo</label>
                                        <input type="email" name="correo" class="form-control" id="correo-cliente"
                                            placeholder="Correo">
                                    </div>
                                </div>
                                <div class="col-12 col-md-6">
                                    <div class="form-group">
                                        <label for="exampleInputPassword1">Teléfono</label>
                                        <input type="text" name="telefono" class="form-control soloNumeros" id="telefono-cliente"
                                            placeholder="Teléfono"  maxlength='10' maxlength='10'> 
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Dirección</label>
                                <textarea class="form-control" id="direccion-cliente" rows="2"
                                    placeholder="Dirección"></textarea>
                            </div>
                        </div>
                        <!-- /.card-body -->
                        <div class="card-footer">
                            <button type="submit" class="btn btn-danger">Guardar</button>
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

<script src="<?=BASE?>views/dist/js/scripts/clientes.js?Ver=1.1.1.2"></script>