<!-- Content Header (Page header) -->
<div class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
                <h1 class="m-0"> <b>Producto Más Vendidos</b> </h1>
            </div><!-- /.col -->
            <div class="col-sm-6">
                <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item"><a href="#">Reportes</a></li>
                    <li class="breadcrumb-item active">Producto más Vendidos</li>
                </ol>
            </div><!-- /.col -->
        </div><!-- /.row -->
    </div><!-- /.container-fluid -->
</div>
<!-- /.content-header -->


<!-- Main content -->
<div class="content">
    <div class="container-fluid">
        <div class="row mb-3">
            <div class="col-6 col-md-4 col-lg-3 form-group">
                <label for="">Desde</label>
                <input type="date" class="form-control" id="date-compra-inicio">
            </div>
            <div class="col-6 col-md-4 col-lg-3 form-group">
                <label for="">Hasta</label>
                <input type="date" class="form-control" id="date-compra-fin">
            </div>
            <div class="col-6 col-md-4 col-lg-3">
                <label for="">Limite</label>
                <select class="form-control" id="date-compra-top">
                    <option value="0">Seleccione una opción</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                </select>
            </div>
            <div class="col-6 col-md-4 col-lg-3" style="margin-top: 32px;">
                <button class="btn btn-outline-primary mx-1px text-95" id="compra-play">
                    <i class="mr-1 fa fa-play text-white-m1 text-120 w-2"></i>
                    Consultar
                </button>
                <button class="btn btn-outline-danger mx-1px text-95" id="compra-pdf">
                    <i class="mr-1 fa fa-print text-white-m1 text-120 w-2"></i>
                    Imprimir
                </button>
            </div>
        </div>
        <div id="tabla-reporte" class="row d-none">
            <div class="card card-outline card-danger shadow">
                <div class="card-body">
                    <div class="col-12 mt-3">
                        <div class="row">
                            <div class="col-6 col-md-6 col-lg-9 " style="padding-left: 60px">
                                <h3><b>BAURSA</b></h3>
                                <h6>EQUIPOS MÁS VENDIDOS</h6>
                                <h6 class="text-danger">DESDE: <span class="text-dark" id="inicio-reporte">2021/01/10</span> -
                                    HASTA: <span id="fin-reporte" class="text-dark">2021/05/15</span>
                                </h6>
                            </div>
                            <div class="col-6 col-md-4 col-lg-3">
                                <img src="<?=BASE?>views/dist/img/logoBaursa.jpg" alt="Logo de baursa" width="260px"
                                    style="margin-left: -130px;">
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-12 text-center">
                                <div class="mt-3">
                                    <div class="card">
                                        <div class="card-header">
                                            <h5 class="text-info">Lista de Productos Más Vendidos</h5>
                                        </div>
                                        <!-- /.card-header -->
                                        <div class="card-body table-responsive p-0">
                                            <table class="table table-hover text-nowrap">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Producto</th>
                                                        <th>Cantidad</th>
                                                        <th>Precio de Venta</th>
                                                        <th>Total $</th>
                                                    </tr>
                                                </thead>
                                                <tbody id="body-mas-comprado">
                                                   
                                                </tbody>
                                            </table>
                                        </div>
                                        <!-- /.card-body -->
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 text-right mb-2">
                                <h4>Total General: $<span id="totalg"></span> </h4>
                            </div>
                            <div class="col-12 col-md-6">
                                <h3 class="card-title"> <b>Cantidad de Productos Más Vendidos</b> </h3>
                                <div class="w-100" id="box-canva1">
        
                                </div>
                            </div>
                            <div class="col-12 col-md-6">
                                <h3 class="card-title"> <b>Porcentaje de Productos Más Vendidos</b> </h3>
                                <div class="w-100" id="box-canva2">
        
                                </div>
                            </div>
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
<script src="<?=BASE?>views/plugins/moment/moment.min.js"></script>
<script src="<?=BASE?>views/plugins/html2pdf/html2pdf.bundle.js"></script>
<script src="<?=BASE?>views/dist/js/scripts/repuestoMasVendido.js"></script>