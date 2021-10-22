
<body>

<style>
    .title-error{
        font-size: 10rem !important;
    }

    .subtitle-error{
        font-size: 2rem !important;
    }

    .content-error{
        font-size: 1.1rem !important;
    }
</style>

<div class="container d-flex justify-content-center align-items-center" style="height: 100vh;">
    <div class="row">
        <div class="col-12 text-center">
              <h1 class="text-danger title-error">404</h1>

              <div class="subtitle-error text-danger">
                <i class="fas fa-exclamation-triangle text-warning"></i>
                    La página que buscas no existe
              </div>

              <div class="content-error">
                <p class="text-white">
                    No podemos encontrar la página que solicitas, porfavor regresa
                    a la página   principal
                </p>
              </div>

              <div>
                <a href="<?=BASE?>" class="btn btn-secondary">
                    <i class="fas fa-arrow-left mr-2"></i>
                        Regresar
                </a>
              </div>
        </div>
    </div>
</div>