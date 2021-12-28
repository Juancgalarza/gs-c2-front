<!-- Content Header (Page header) -->
<div class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
                <h1 class="m-0">Usuarios</h1>
            </div>
            <div class="col-sm-6 text-right">
                <a class="btn btn-primary btn-sm" id="agregar-rol-modal">
                    <i class="fas fa-plus mr-2"></i>
                    Agregar Rol</a>
            </div>
            <!-- /.col -->
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
                        <h3 class="card-title">Formulario de Usuario</h3>
                    </div>
                    <!-- /.card-header -->
                    <!-- form start -->
                    <div class="card-body">
                        <div class="row">
                            <div class="col-12">
                                <h3> <b>Datos de Personales</b> </h3>
                                <form method="POST" id="form-datos-usuario">
                                    <div class="row">
                                        <div class="col-6 form-group">
                                            <label for="">Cédula</label>
                                            <input type="text" class="form-control form-control-sm solo-numeros" placeholder="Cédula"
                                                id="form-cedula" name="cedula" maxlength="10" minlength="10" required>
                                        </div>

                                        <div class="col-6 form-group">
                                            <label for="">Teléfono</label>
                                            <input type="text" class="form-control form-control-sm solo-numeros" placeholder="Teléfono"
                                                id="form-telefono" name="telefono" maxlength="10" minlength="10">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-6 form-group">
                                            <label for="">Nombres</label>
                                            <input type="text" class="form-control form-control-sm solo-letras" placeholder="Nombres"
                                                id="form-nombres" maxlength="150" minlength="3" name="nombres" required>
                                        </div>

                                        <div class="col-6 form-group">
                                            <label for="">Apellidos</label>
                                            <input type="text" class="form-control form-control-sm solo-letras" placeholder="Apellidos"
                                                id="form-apellidos" maxlength="150" minlength="3" name="apellidos">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-6 form-group">
                                            <label for="">Correo</label>
                                            <input type="email" class="form-control form-control-sm" placeholder="Correo"
                                                id="form-correo" name="correo">
                                        </div>
                                        <div class="col-6 form-group">
                                            <label for="exampleInputEmail1">Dirección</label>
                                            <textarea class="form-control form-control-sm" id="form-direccion" rows="1"
                                                placeholder="Dirección"></textarea>
                                        </div>
                                    </div>
                                    <hr class="bg-white mt-3 mb-3">
                                    <h3> <b>Datos de Usuario</b> </h3>
                                    <div class="row">
                                        <div class="col-12 col-md-6">
                                            <div class="form-group">
                                                <label for="">Usuario</label>
                                                <input type="text" name="usuario" class="form-control form-control-sm" id="form-usuario"
                                                    placeholder="Usuario">
                                            </div>
                                        </div>
                                        <div class="col-12 col-md-6 ">
                                            <div class="form-group">
                                                <label for="">Rol</label>
                                                <select id="form-select-rol" class="form-control form-control-sm">
                                                    <!-- <option value="0">Seleccione un Rol</option> -->
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-12 col-md-6">
                                            <div class="form-group">
                                                <label for="">Contraseña</label>
                                                <input type="password" name="clave" class="form-control form-control-sm" id="form-clave"
                                                    placeholder="Contraseña">
                                            </div>
                                        </div>
                                        <div class="col-12 col-md-6">
                                            <div class="form-group">
                                                <label for="">Confirmar Contraseña</label>
                                                <input type="password" name="confclave" id="form-conf-clave"
                                                    class="form-control form-control-sm" placeholder="Confirmar Contraseña">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-12">
                                            <div class="form-group">
                                                <label for="form-img-usuario">Imagen</label>
                                                <div class="input-group">
                                                    <div class="custom-file form-control-sm">
                                                        <input type="file" name="img" id="form-img-usuario"
                                                            class="custom-file-input" accept="image/*">
                                                        <label class="custom-file-label" for="exampleInputFile">Subir
                                                            Archivo</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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
                </div>
                <!-- /.card-body -->
            </div>
        </div>
    </div>
    <!-- /.row -->
</div><!-- /.container-fluid -->
</div>
<!-- /.content -->
</div>
<!-- /.content-wrapper -->

<!-- Modales -->
<div class="modal fade" id="agregar-rol">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bg-danger">
                <h4 class="modal-title">Nuevo Rol</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-12 col-md-4">
                        <div class="contanier-fluid">
                            <form id="nuevo-rol-form" method="post">
                                <div class="row">
                                    <div class="col-12 form-group">
                                        <label for="">Rol</label>
                                        <input id="nuevo-rol" type="text" placeholder="Rol"
                                            class="form-control form-control-sm letras-vd ">
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12">
                                        <button type="submit" class="btn btn-primary"><i
                                                class="fas fa-pencil-alt mr-2"></i>Guardar</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="col-12 col-md-8">
                        <div class="table-responsive" style="height: 220px !important; overflow: auto;">
                            <table class="table table-hover text-nowrap table-bordered">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Rol</th>
                                        <th>Editar</th>
                                        <th>Eliminar</th>
                                    </tr>
                                </thead>
                                <tbody id="table-roles">

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

<div class="modal fade" id="actualizar-rol">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header bg-danger">
                <h4 class="modal-title">Actualizar Rol</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-12">
                        <div class="contanier-fluid">
                            <form id="update-rol-form" method="post">
                                <div class="row">
                                    <input type="hidden" id="upd-rol-id">
                                    <div class="col-12 form-group">
                                        <label for="">Rol</label>
                                        <input id="upd-rol" type="text" placeholder="Rol"
                                            class="form-control letras-vd">
                                    </div>
                                </div>
                            </form>
                            <div class="row">
                                <div class="col-12">
                                    <button id="btn-update" class="btn btn-primary"><i
                                            class="fas fa-pencil-alt mr-2"></i>Actualizar</button>
                                </div>
                            </div>
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

<!-- jquery-validation -->
<script src="<?=BASE?>views/plugins/jquery-validation/jquery.validate.min.js"></script>
<script src="<?=BASE?>views/plugins/jquery-validation/additional-methods.min.js"></script>

<script src="<?=BASE?>views/dist/js/scripts/usuarios.js"></script>