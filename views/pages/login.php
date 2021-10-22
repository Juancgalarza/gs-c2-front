
<body class="hold-transition login-page login-per">
<div class="login-box">
  <!-- /.login-logo -->
  <div class="card card-outline card-danger">
    <div class="card-header text-center">
      <a href="../../index2.html" class="h1"><b>BAURSA</b></a>
    </div>
    <div class="card-body">
      <p class="login-box-msg">Iniciar sesión en el sistema</p>

      <form id="form-login" method="post">
        <div class="input-group mb-3">
          <input type="text" class="form-control" placeholder="Correo o usuario" id="login-usuario">
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-envelope"></span>
            </div>
          </div>
        </div>
        <div class="input-group mb-3">
          <input type="password" class="form-control" placeholder="contraseña" id="login-clave">
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-lock"></span>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-8">
            <div class="icheck-primary">
              <input type="checkbox" id="remember">
              <label for="remember">
                Recordar credenciales
              </label>
            </div>
          </div>
          <!-- /.col -->
          <div class="col-4">
            <button type="submit" class="btn btn-danger btn-block" id="login-ingresar">Ingresar</button>
          </div>
          <!-- /.col -->
        </div>
      </form>

      <p class="mt-4 mb-1">
        <a href="forgot-password.html" class="text-danger">Olvidé mi clave</a>
      </p>
      <!-- <p class="mb-0">
        <a href="register.html" class="text-center">Register a new membership</a>
      </p> -->
    </div>
    <!-- /.card-body -->
  </div>
  <!-- /.card -->
</div>
<!-- /.login-box -->

<script src="<?=BASE?>views/dist/js/scripts/login.js"></script>