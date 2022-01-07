<!-- Content Header (Page header) -->
<div class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
                <h1 class="m-0"> <b>Listar Compras</b> </h1>
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
                    <div class="card-header">
                        <h3 class="card-title">Compras Realizadas</h3>
                    </div>
                    <!-- /.card-header -->
                    <div class="card-body">
                        <div class="div" style="overflow: auto;">
                            <table id="tabla-compras" class="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th style="width: 10px">#</th>
                                        <th># Serie</th>
                                        <th>Proveedor</th>
                                        <th>Total Compra</th>
                                        <th>Fecha Compra</th>
                                        <th>Estado Compra</th>
                                        <th>Ver Detalle</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    </tfoot>
                            </table>
                        </div>
                    </div>
                    <!-- /.card-body -->
                </div>
            </div>
        </div>
        <!-- /.row -->
    </div>
    <!-- /.row -->
</div>
<!-- /.container-fluid -->
</div>
<!-- /.content -->
</div>
<!-- /.content-wrapper -->

<!-- Modales -->

<div class="modal fade" id="modal-factura">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header bg-dark">
                <h4 class="modal-title">Comprobante de Compra</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-12">
                        <div class="card card-dark" id="factura-compra">

                            <div class="card-body" style="background-color: white;">
                                <div class="factura">
                                    <div class="factura-header">
                                        <div>
                                            <h2 class="lead p-4 factura-title">Comprobante N° <b id="compra_id"></b></h2>
                                        </div>

                                        <div class="factura-header-prov" style="overflow: auto;">
                                            <span style="color: black;">N° de Serie: <b id="compra_numero_serie"></b></span>
                                            <span style="color: black;">Proveedor: <b id="compra_proveedor"></b></span>
                                            <span style="color: black;">Fecha de compra: <b id="compra_fecha"></b></span>
                                        </div>
                                    </div>

                                    <div class="factura-body mt-4" style="overflow: auto;">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <td>#</td>
                                                    <td>Producto</td>
                                                    <td>Cantidad</td>
                                                    <td>Precio</td>
                                                    <td>Total</td>
                                                </tr>
                                            </thead>

                                            <tbody id="body_detalle_compra">
                                                <!-- <tr>
                                            <td>1</td>
                                            <td>Llanta cuadrada</td>
                                            <td>4</td>
                                            <td>10.56</td>
                                            <td>44.56</td>
                                        </tr> -->
                                            </tbody>
                                        </table>
                                    </div>

                                    <div class="row mt-4">
                                        <div class="col-6 col-md-3  box-items">
                                            <div class="item-valores">
                                                <b style="color: black;">$ Subototal</b>
                                                <span style="color: black;" id="compra_subtotal" class="text-center">0.00</span>
                                            </div>
                                        </div>

                                        <div class="col-6 col-md-3  box-items">
                                            <div class="item-valores">
                                                <b style="color: black;">$ Iva</b>
                                                <span style="color: black;" id="compra_iva" class="text-center">0.00</span>
                                            </div>
                                        </div>

                                        <div class="col-6 col-md-3 box-items">
                                            <div class="item-valores">
                                                <b style="color: black;">$ Descuento</b>
                                                <span style="color: black;" id="compra_descuento" class="text-center">0.00</span>
                                            </div>
                                        </div>

                                        <div class="col-6 col-md-3  box-items">
                                            <div class="item-valores">
                                                <b style="color: black;">$ Total</b>
                                                <span style="color: black;" id="compra_total" class="text-center">0.00</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <main class="mt-3 text-right">
                            <button class="btn btn-danger" id="btn-imprimir">
                                <i class="fas fa-print mr-2"></i>
                                Descargar PDF
                            </button>
                        </main>
                    </div>
                </div>
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

<script src="<?=BASE?>views/dist/js/scripts/listarCompras.js?ver=1.1.1"></script>
<script src="<?=BASE?>views/plugins/html2pdf/html2pdf.bundle.js"></script>