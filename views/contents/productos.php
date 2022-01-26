<!-- Content Header (Page header) -->
<div class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
                <h1 class="m-0"> <b>Productos</b> </h1>
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
                        <h3 class="card-title">Nuevo Producto</h3>

                        <div class="card-tools">
                            <div class="col-12">
                                <span> <b>Número de Serie:</b> <b id="codigo-producto"></b> </span>
                            </div>
                        </div>
                    </div>
                    <!-- /.card-header -->
                    <!-- form start -->
                    <form id="formulario-producto" type="POST" enctype="multipart/formdata">
                        <div class="card-body">
                            <div class="row">
                                
                                <div class="col-12 col-md-6">
                                    <div class="form-group">
                                        <label for="exampleInputPassword1">Nombre</label>
                                        <input type="text" name="nombre" class="form-control form-control-sm"
                                            id="nombre-producto" placeholder="Nombre">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <!--  <div class="col-12 col-md-6">
                                    <div class="form-group">
                                        <label for="exampleInputPassword1">Precio Venta</label>
                                        <input type="text" name="precio_venta" class="form-control"
                                            id="precio-venta-producto" placeholder="Precio Venta">
                                    </div>
                                </div> -->
                                <div class="col-12 col-md-6">
                                    <div class="form-group">
                                        <label for="exampleInputPassword1">Categoría</label>
                                        <select class="form-control form-control-sm" id="select-categoria"
                                            name="categoria">
                                            <!-- <option>Seleccione una Categoría</option> -->
                                        </select>
                                    </div>
                                </div>
                                <div class="col-12 col-md-6">
                                    <div class="form-group">
                                        <label for="exampleInputEmail1">Fecha</label>
                                        <input type="text" class="form-control form-control-sm" id="fecha-producto"
                                            name="fecha" placeholder="Descripción" value="<?=date('d/m/Y')?>">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12 col-md-6">
                                    <div class="form-group">
                                        <label for="imagen-producto">Imagen</label>
                                        <div class="input-group">
                                            <div class="custom-file form-control-sm">
                                                <input type="file" name="img" id="imagen-producto" 
                                                    class="custom-file-input" accept="image/*">
                                                <label class="custom-file-label" for="exampleInputFile">Subir
                                                    Archivo</label>
                                            </div>
                                            <div class="input-group-append">
                                                <span class="input-group-text">Subir</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 col-md-6">
                                    <div class="form-group">
                                        <label for="exampleInputEmail1">Descripcion</label>
                                        <textarea class="form-control form-control-sm" id="descripcion-producto"
                                            rows="2" placeholder="Descripción"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- /.card-body -->
                        <div class="card-footer">
                            <button type="submit" id="guardar-producto" disabled class="btn btn-primary btn-sm"><i
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

<script src="<?=BASE?>views/dist/js/scripts/producto.js"></script>