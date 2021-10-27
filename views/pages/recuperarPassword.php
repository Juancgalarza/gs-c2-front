<body class="hold-transition login-page">
    <div class="login-box">
        <div class="card card-outline card-danger">
            <div class="card-header text-center">
                <a href="../../index2.html" class="h1"><b>BAURSA</b></a>
            </div>
            <div class="card-body">
                <p class="login-box-msg">¿Olvidaste tu contraseña? Aquí puedes recuperar fácilmente una nueva
                    contraseña.</p>
                <form id="form-recuperar" method="post">
                    <div class="input-group mb-3">
                        <input type="hidden" id="upd-usuario-id">
                        <input type="email" id="recu-email" class="form-control" placeholder="Correo">
                        <div class="input-group-append">
                            <div class="input-group-text">
                                <span class="fas fa-envelope"></span>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <button type="submit" class="btn btn-danger btn-block">Solicitar nueva contraseña</button>
                        </div>
                        <!-- /.col -->
                    </div>
                </form>
                <p class="mt-3 mb-1">
                    <a href="login" class="text-dark"> <b>Login</b> </a>
                </p>
            </div>
            <!-- /.login-card-body -->
        </div>
    </div>
    <!-- /.login-box -->

    <script src="<?=BASE?>views/dist/js/scripts/recuperarPassword.js"></script>