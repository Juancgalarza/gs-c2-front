<!-- Content Header (Page header) -->
<div class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
                <h1 class="m-0">Reporte de Compras Mensuales</h1>
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
                        <h3 class="card-title">Compras Mensuales</h3>
                    </div>
                    <!-- /.card-header -->
                    <!-- form start -->
                    <div class="card-body">
                        <div class="row mb-3 d-flex justify-content-center">
                            <div class="col-6 col-md-4 col-lg-3 form-group">
                                <label for="">Desde</label>
                                <input type="date" class="form-control" id="date-compra-inicio">
                            </div>
                            <div class="col-6 col-md-4 col-lg-3 form-group">
                                <label for="">Hasta</label>
                                <input type="date" class="form-control" id="date-compra-fin">
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
                        <div id="tabla-reporte" class="row bg-white">
                            <div class="col-12 mt-3">
                                <div class="row">
                                    <div class="col-6 col-md-8 col-lg-9 " style="padding-left: 125px">
                                        <h3><b>BAURSA</b></h3>
                                        <h6>COMPRAS MENSUALES</h6>
                                        <h6 class="text-danger">DESDE: <span class="text-dark"
                                                id="inicio-reporte">2021/01/10</span> - HASTA: <span id="fin-reporte"
                                                class="text-dark">2021/05/15</span>
                                        </h6>
                                    </div>
                                    <div class="col-6 col-md-4 col-lg-3">
                                        <img src="<?=BASE?>views/dist/img/logoBaursa.jpg" alt="Logo de Baursa"
                                            width="260px" style="margin-left: -75px;">
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <div class="col-12 text-center">
                                        <div class="mt-3">
                                            <div class="card">
                                                <!-- /.card-header -->
                                                <div class="card-body table-responsive p-0">
                                                    <table class="table table-hover text-nowrap">
                                                        <thead>
                                                            <tr>
                                                                <th>#</th>
                                                              <!--  <th>Fecha</th> -->
                                                                 <th>Detalle</th>
                                                                <th>Subtotal</th>
                                                                <th>IVA</th>
                                                                <th>Total</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody id="body-reporte-compras">

                                                        </tbody>
                                                        <tfoot>
                                                            
                                                            <td></td>
                                                            <th id="totales"></th>
                                                            <th id="subtotal-general"></th>
                                                            <th id="iva-general"></th>
                                                            <th id="total-general"></th>
                                                        </tfoot>
                                                    </table>
                                                </div>
                                                <!-- /.card-body -->
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12 col-md-8">
                                        <h3 class="card-title"> <b>Compra Mensual</b> </h3>
                                        <div class="w-10 d-flex justify-content-center" id="box-canvas1">

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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

<script src="<?=BASE?>views/plugins/chart.js/Chart.min.js"></script>
<script src="<?=BASE?>views/plugins/moment/moment.min.js"></script>
<script src="<?=BASE?>views/plugins/html2pdf/html2pdf.bundle.js"></script>
<script src="<?=BASE?>views/dist/js/scripts/reporteCompra.js"></script>