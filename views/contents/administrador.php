<style>
canvas {
    padding: 0;
    margin: auto;
    display: block;
    width: 800px;
}
</style>

<!-- Content Header (Page header) -->
<div class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
                <h1 class="m-0"> <b>Administrador</b> </h1>
            </div><!-- /.col -->
        </div><!-- /.row -->
    </div><!-- /.container-fluid -->
</div>
<!-- /.content-header -->

<!-- Main content -->
<div class="content">
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-3 col-6">
                <div class="info-box shadow">
                    <span class="info-box-icon bg-info elevation-1"><i class="fas fa-user-tie"></i></span>

                    <div class="info-box-content">
                        <span class="info-box-text">Clientes</span>
                        <span id="conta-cliente" class="info-box-number">
                            0
                        </span>
                    </div>
                    <!-- /.info-box-content -->
                </div>
            </div>
            <div class="col-lg-3 col-6">
                <div class="info-box shadow">
                    <span class="info-box-icon bg-danger elevation-1"><i class="fas fa-box"></i></span>

                    <div class="info-box-content">
                        <span class="info-box-text">Productos</span>
                        <span id="conta-prod" class="info-box-number">
                            0
                        </span>
                    </div>
                    <!-- /.info-box-content -->
                </div>
            </div>
            <div class="col-lg-3 col-6">
                <div class="info-box shadow">
                    <span class="info-box-icon bg-warning elevation-1"><i class="fas fa-dollar-sign"></i></span>

                    <div class="info-box-content">
                        <span id="mes-compra" class="info-box-text">Compras (mensual)</span>
                        <span id="total-compra" class="info-box-number">
                            $ 0
                        </span>
                    </div>
                    <!-- /.info-box-content -->
                </div>
            </div>
            <div class="col-lg-3 col-6">
                <div class="info-box shadow">
                    <span class="info-box-icon bg-success elevation-1"><i class="fas fa-search-dollar"></i></span>

                    <div class="info-box-content">
                        <span id="mes-venta" class="info-box-text">Ventas (mensual)</span>
                        <span id="total-venta" class="info-box-number">
                            $ 0
                        </span>
                    </div>
                    <!-- /.info-box-content -->
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-4 col-6">
                <div class="info-box shadow">
                    <span class="info-box-icon bg-gray elevation-1"><i class="fas fa-truck"></i></span>

                    <div class="info-box-content">
                        <span class="info-box-text">Proveedores</span>
                        <span id="conta-proveedor" class="info-box-number">
                            0
                        </span>
                    </div>
                    <!-- /.info-box-content -->
                </div>
            </div>
            <div class="col-lg-4 col-6">
                <div class="info-box shadow">
                    <span class="info-box-icon bg-info elevation-1"><i class="fas fa-bookmark"></i></span>

                    <div class="info-box-content">
                        <span class="info-box-text">Categorías</span>
                        <span id="conta-catg" class="info-box-number">
                            0
                        </span>
                    </div>
                    <!-- /.info-box-content -->
                </div>
            </div>
            <div class="col-lg-4 col-6">
                <div class="info-box shadow">
                    <span class="info-box-icon bg-gradient-danger elevation-1"><i class="fas fa-user-shield"></i></span>

                    <div class="info-box-content">
                        <span class="info-box-text">Usuarios</span>
                        <span id="conta-usu" class="info-box-number">
                            0
                        </span>
                    </div>
                    <!-- /.info-box-content -->
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <div class="card shadow card-warning">
                    <div class="card-header">
                        <h3 class="card-title"> <b class="text-white">Compras Anuales - <span id="anio-compra"></span></b> </h3>
                    </div>
                    <div class="card-body" style="background: white;">
                        <div class="chart">
                            <canvas id="compra-box"
                                style="min-height: 250px; height: 350px; max-height: 350px; max-width: 90%;"></canvas>
                        </div>
                    </div>
                    <!-- /.card-body -->
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <div class="card shadow card-success">
                    <div class="card-header">
                        <h3 class="card-title"> <b>Ventas Anuales - <span id="anio-venta"></span></b> </h3>
                    </div>
                    <div class="card-body" style="background: white;">
                        <div class="chart">
                            <canvas id="venta-box"
                                style="min-height: 250px; height: 350px; max-height: 350px; max-width: 90%;"></canvas>
                        </div>
                    </div>
                    <!-- /.card-body -->
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
<script src="<?=BASE?>views/dist/js/scripts/admin.js"></script>