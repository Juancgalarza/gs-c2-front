<!-- Content Header (Page header) -->
<div class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
                <h1 class="m-0"> <b>Proyecciones de Ventas</b> </h1>
            </div><!-- /.col -->
        </div><!-- /.row -->
    </div><!-- /.container-fluid -->
</div>
<!-- /.content-header -->

<!-- Main content -->
<div class="content">
    <div class="container-fluid">
        <div class="row mb-3">
            <div class="col-6 col-md-4 col-lg-3">
                <label for="">Período</label>
                <select class="form-control" id="date-periodo-venta">
                    <option value="0">Seleccione una opción</option>
                    <option value="2021">2021</option>
                    <option value="2022">2022</option>
                </select>
            </div>
            <div class="col-6 col-md-4 col-lg-3" style="margin-top: 32px;">
                <button class="btn btn-outline-dark mx-1px text-95" id="proy-play">
                    <i class="mr-1 fa fa-play text-white-m1 text-120 w-2"></i>
                    Consultar
                </button>
                <!-- <button class="btn btn-outline-danger mx-1px text-95" id="proy-pdf">
                    <i class="mr-1 fa fa-print text-white-m1 text-120 w-2"></i>
                    Imprimir
                </button> -->
            </div>
            <div id="num-dias" class="col-6 col-md-4 col-lg-2 d-none">
                <label for="">Número de días</label>
                <input type="text" class="form-control numeros-vd" id="proy-dias" maxlength="3">
            </div>
            <div id="calcular-proy" class="col-6 col-md-4 col-lg-3 d-none">
                <div class="btn-group btn-group-toggle" data-toggle="buttons" style="margin-top: 30px;">
                    <label class="btn btn-dark active">
                        <input type="radio" name="options" id="proy-calcular">
                        <i class="fas fa-play mr-2"></i>$ Proyectar
                    </label>
                </div>
            </div>
        </div>
        <div class="row d-none" id="tabla-reporte">
            <div class="col-12 col-md-6">
                <div class="card card-danger card-outline shadow">
                    <div class="card-header">
                        <h5 class="text-danger">Tabla de Datos</h5>
                    </div>
                    <!-- /.card-header -->
                    <div class="card-body table-responsive p-0">
                        <table class="table table-hover text-nowrap">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Fecha</th>
                                    <th>Cantidad</th>
                                    <th>Total $</th>
                                </tr>
                            </thead>
                            <tbody id="body-proy-venta">
                                <!-- <tr>
                                    <td>1</td>
                                    <td>2021/2/15</td>
                                    <td>2</td>
                                    <td>25.81</td>
                                </tr> -->
                            </tbody>
                        </table>
                        <input type="hidden" id="const-a">
                        <input type="hidden" id="const-b">
                    </div>
                    <!-- /.card-body -->
                </div>
            </div>
            <div class="col-12 col-md-6">
                <div class="row">
                    <div class="col-12">
                        <div class="card card-danger shadow">
                            <div class="card-header">
                                <h3 class="card-title">Diagrama de Dispersión</h3>

                                <div class="card-tools">
                                    <button type="button" class="btn btn-tool" data-card-widget="collapse">
                                        <i class="fas fa-minus"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="card-body" style="min-height: 250px; background: white;">
                                <div class="w-100" id="box-canva1">
                                    <!--  <canvas id="dispersion-box"
                                        style="min-height: 250px; height: 250px; max-height: 300px; max-width: 100%; margin-top: 22px"></canvas> -->
                                </div>
                            </div>
                            <!-- /.card-body -->
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <div class="card card-danger shadow">
                            <div class="card-header">
                                <h3 class="card-title">Proyección</h3>

                                <div class="card-tools">
                                    <button type="button" class="btn btn-tool" data-card-widget="collapse">
                                        <i class="fas fa-minus"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="card-body" style="min-height: 250px; background: white;">
                                <div class="w-100" id="box-canva2">
                                    <!--  <canvas id="dispersion-box"
                                        style="min-height: 250px; height: 250px; max-height: 300px; max-width: 100%; margin-top: 22px"></canvas> -->
                                </div>
                            </div>
                            <!-- /.card-body -->
                        </div>
                    </div>

                    <div class="col-sm-12 col-6"> 
                        <div class="description-block border-right">
                            <h5 class="description-header" id="error">--------</h5>
                            <span class="description-text">Error de la Regresion Lineal</span>
                        </div>    
                    </div>
                </div>
            </div>
        </div>
        <!-- /.row -->
    </div><!-- /.container-fluid -->
</div>
<!-- /.content -->
</div>
<!-- /.content-wrapper -->

<script src="<?=BASE?>views/plugins/chart.js/Chart.min.js"></script>
<script src="<?=BASE?>views/dist/js/scripts/proyeccionVenta.js"></script>