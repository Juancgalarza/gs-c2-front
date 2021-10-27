$(function(){
   
    _init();

    function _init(){
        recuperarPass();
    }

    function recuperarPass(){
        $('#form-recuperar').submit(function(e){
            e.preventDefault();

            let correo = $('#recu-email').val();

            if(correo.length == 0){
                Swal.fire({
                    title: 'Error!',
                    text: 'Ingrese un correo',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                  })
            }else{

                let json = {
                    correo: correo
                }
                ajax_recuperar(json);
            }
        });
    }

    function ajax_recuperar(json){
        $.ajax({
            // la URL para la petición
            url : urlServidor + 'usuario/enviarcorreo',
            // especifica si será una petición POST o GET
            type : 'POST',
            data: 'data=' + JSON.stringify(json),
            // el tipo de información que se espera de respuesta
            dataType : 'json',
            success : function(response) {
                if(response.status){
                    Swal.fire({
                        title: 'Recuperación de Contraseña!',
                        text: response.mensaje,
                        icon: 'success',
                        confirmButtonText: 'Ok',
                        confirmButtonColor: '#004a43'
                    });
                    $('#form-recuperar')[0].reset();
                }else{
                    Swal.fire({
                        title: 'Recuperación de Contraseña!',
                        text: response.mensaje,
                        icon: 'error',
                        confirmButtonText: 'Ok',
                        confirmButtonColor: '#004a43'
                    });
                }
            },
            error : function(jqXHR, status, error) {
                console.log('Disculpe, existió un problema');
            },
            complete : function(jqXHR, status) {
                // console.log('Petición realizada');
            }
        }); 
    }
});