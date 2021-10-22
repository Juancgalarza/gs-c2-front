<!-- Content Header (Page header) -->
<div class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
                <h1 class="m-0">Productos</h1>
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
                        <h3 class="card-title">Nuevo Producto</h3>
                    </div>
                    <!-- /.card-header -->
                    <!-- form start -->
                    <form id="formulario-producto" type="POST" enctype="multipart/formdata">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-12 col-md-6">




                                    <div class="form-group">
                                        <label for="exampleInputEmail1">Código</label>
                                        <input type="text" name="codigo" class="form-control" id="codigo-producto"
                                            placeholder="Código">
                                    </div>
                                </div>
                                <div class="col-12 col-md-6">
                                    <div class="form-group">
                                        <label for="exampleInputPassword1">Nombre</label>
                                        <input type="text" name="nombre" class="form-control" id="nombre-producto"
                                            placeholder="Nombre">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12 col-md-6">
                                    <div class="form-group">
                                        <label for="exampleInputPassword1">Precio Venta</label>
                                        <input type="text" name="precio_venta" class="form-control"
                                            id="precio-venta-producto" placeholder="Precio Venta">
                                    </div>
                                </div>
                                <div class="col-12 col-md-6">
                                    <div class="form-group">
                                        <label for="exampleInputPassword1">Categoría</label>
                                        <select class="form-control" id="select-categoria" name="categoria">
                                            <!-- <option>Seleccione una Categoría</option> -->
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12 col-md-6">
                                    <div class="form-group">
                                        <label for="imagen-producto">Imagen</label>
                                        <div class="input-group">
                                            <div class="custom-file">
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
                                        <label for="exampleInputEmail1">Fecha</label>
                                        <input type="date" class="form-control" id="fecha-producto" name="fecha"
                                            placeholder="Descripción">
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Descripcion</label>
                                <textarea class="form-control" id="descripcion-producto" rows="2"
                                    placeholder="Descripción"></textarea>
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

<script src="<?=BASE?>views/dist/js/scripts/producto.js"></script>