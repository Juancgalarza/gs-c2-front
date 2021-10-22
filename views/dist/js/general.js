$(function(){

    _init();

    function _init(){
        iniciaNombres();
        cargarMenus();
        soloNumeros();
        salir();
        validaciones_generales();
        mascaras_input();
    }

    function getSesion(){
      let sesion = JSON.parse(localStorage.getItem('sesion'));
      return sesion;
    }

    function iniciaNombres(){
 
      let sesion = getSesion();
        if(sesion){
            let nombres = sesion.persona.nombres + ' ' + sesion.persona.apellidos;

            $('#sesion-usuario').html(nombres);
            $('#sesion-rol').html(sesion.rol.cargo);

            let img = `<img src="${urlServidor}resources/usuarios/${sesion.img}"  class="elevation-2" alt="User Image">`;
            $('#login-user-img').html(img);
        }
    }

    function cargarMenus(){

      if(getSesion()){
        let rol = getSesion().rol.id;
  
        $.ajax({
          url : urlServidor + 'permiso/rol/' + rol,
          type : 'GET',
          dataType : 'json',
          success : function(response) {
            // console.log(response);
            
            let menu = '';
            let i = 0;
  
            // console.log(response);
            // <i class="far fa-circle nav-icon"></i>
            response.forEach(element => {
              
              //recorre menus hijos
              let hijos = "";
              element.menus_hijos.forEach(hijo => {
                hijos += 
                `<li class="nav-item">
                  <a href="${urlCliente}${hijo.url}" class="nav-link">
                    <i class="far fa-circle"></i>
                    <p>${hijo.nombre}</p>
                  </a>
                </li>`;
              });
  
              if(i == 0){
                menu += `
                <li class="nav-item">
                  <a href="#" class="nav-link active">
                    <i class="${element.icono}"></i>
                    <p>
                     ${element.nombre}
                      <i class="right fas fa-angle-left"></i>
                    </p>
                  </a>
                  <ul class="nav nav-treeview">
                    ${hijos}
                  </ul>
                </li>
                `;
              }else{
                menu += `
                <li class="nav-item">
                  <a href="#" class="nav-link">
                    <i class="${element.icono}"></i>
                    <p>
                     ${element.nombre}
                     <i class="right fas fa-angle-left"></i>
                    </p>
                  </a>
                  <ul class="nav nav-treeview">
                    ${hijos}
                  </ul>
                </li>
                `;
              }
              i++;
            });
  
            $('#menus-padres').html(menu);
          },
          error : function(jqXHR, status, error) {
              console.log('Disculpe, existió un problema');
          },
          complete : function(jqXHR, status) {
              // console.log('Petición realizada');
          }
        });
      }
    }

    function salir(){
        $('#salir-app').click(function(){
            Swal.fire({
                title: 'Cerrar sesion?',
                text: "Desea salir de la aplicación!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'No',
                confirmButtonText: 'Salir'
              }).then((result) => {
                if (result.isConfirmed) {
                  Swal.fire(
                    'Exit!',
                    'Su sesión ha finalizado',
                    'success'
                  )

                  localStorage.clear();
                  $(location).attr('href', urlCliente + 'login');
                }
              })
        });

    }

    function soloNumeros(){
      $('.soloNumeros').keydown(function(e) {
        var key = e.charCode || e.keyCode || 0;
        // allow backspace, tab, delete, arrows, numbers and keypad numbers ONLY
        return (
          key == 8 ||
          key == 9 ||
          key == 46 ||
          (key >= 37 && key <= 40) ||
          (key >= 48 && key <= 57) ||
          (key >= 96 && key <= 105));
      });
    }

    function validaciones_generales(){

      $('.letras-vd').validCampoFranz(' abcdefghijklmnñopqrstuvwxyzáéiou');
      //Para escribir solo numeros    
      $('.numeros-vd').validCampoFranz('0123456789'); 

    }

    function mascaras_input(){
      $('[data-mask]').inputmask();
    }
})
