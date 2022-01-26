/* $(function(){ */
    const WIDTH = 600;
    const HEIGHT = 500; 
    _init();

    function _init() {
        validarFormularioUsuario();
        cargarRoles();
        guardarNuevoUsuario();
        changeCedula();
        cancelarFormulario();
        agregarRolModal();
        cargarTablaRoles();
        actualizarRol();
        changeImagen();
    }

    function cargarRoles() {
        $.ajax({
            // la URL para la petición
            url: urlServidor + 'rol/listar',
            // especifica si será una petición POST o GET
            type: 'GET',
            // el tipo de información que se espera de respuesta
            dataType: 'json',
            success: function (response) {
               // console.log(response);
                if (response.status) {
                    let option = '<option value=0>Seleccione el Rol</option>';

                    response.rol.forEach(element => {
                        option += `<option value=${element.id}>${element.cargo}</option>`;
                    });
                    $('#form-select-rol').html(option);
                } else {
                    Swal.fire({
                        title: 'Error!',
                        text: 'No hay roles disponibles',
                        icon: 'error',
                        confirmButtonText: 'Ok',
                        confirmButtonColor: '#004a43'
                    })
                }
            },
            error: function (jqXHR, status, error) {
                console.log('Disculpe, existió un problema');
            },
            complete: function (jqXHR, status) {
                // console.log('Petición realizada');
            }

        });
    }

    function validarFormularioUsuario() {
        $('#form-datos-usuario').validate({
            rules: {
                cedula: {
                    required: true,
                    maxlength: 10,
                    minlength: 10
                },
                nombres: {
                    required: true,
                    minlength: 5
                },
                apellidos: {
                    required: true,
                    minlength: 4
                },
                correo: {
                    required: true,
                    email: true
                },
                telefono: {
                    required: true,
                    minlength: 10
                },
                usuario: {
                    required: true,
                    minlength: 4
                },
                clave: {
                    required: true,
                    minlength: 4
                },
                confclave: {
                    required: true,
                    minlength: 4
                },
                img: {
                    required: true,
                }
            },
            messages: {
                cedula: {
                    required: "Ingrese una cédula",
                    maxlength: "La cédula debe tener 10 dígitos",
                    minlength: "Debe tener 10 digítos"
                },
                nombres: {
                    required: "Ingrese nombre para el cliente",
                    minlength: "Debe tener mínimo 5 carácteres"
                },
                apellidos: {
                    required: "Ingrese apellido para el cliente",
                    minlength: "Debe tener mínimo 4 carácteres"
                },
                correo: "Ingresa un correo válido",
                telefono: {
                    required: "Ingrese un teléfono",
                    minlength: "Debe tener mínimo 10 dígitos"
                },
                usuario: {
                    required: "Ingrese un usuario",
                    minlength: "Debe tener mínimo 4 carácteres"
                },
                clave: {
                    required: "Ingrese una contraseña",
                    minlength: "Debe tener mínimo 4 carácteres"
                },
                confclave: {
                    required: "Confirme la contraseña",
                    minlength: "Debe tener mínimo 4 carácteres"
                },
                img: {
                    required: "Ingrese una imagen para el usuario",
                },
            },
            errorElement: 'span',
            errorPlacement: function (error, element) {
                error.addClass('invalid-feedback');
                element.closest('.form-group').append(error);
            },
            highlight: function (element, errorClass, validClass) {
                $(element).addClass('is-invalid');
            },
            unhighlight: function (element, errorClass, validClass) {
                $(element).removeClass('is-invalid');
            }
        });
    }

    function guardarNuevoUsuario() {
        $('#form-datos-usuario').submit(function (e) {
            e.preventDefault();
            let usuario = $('#form-usuario').val();
            let clave = $('#form-clave').val();
            let confclave = $('#form-conf-clave').val();
            let img = $('#form-img-usuario')[0].files[0];
            let rol_id = $('#form-select-rol option:selected').val();
            let cedula = $('#form-cedula').val();
            let nombres = $('#form-nombres').val();
            let apellidos = $('#form-apellidos').val();
            let telefono = $('#form-telefono').val();
            let correo = $('#form-correo').val();
            let direccion = $('#form-direccion').val();
            let def = (img == undefined) ? 'default.jpg' : img.name;

            let json = {
                usuario: {
                    usuario, rol_id, clave, confclave, img: def
                },
                persona: {
                    cedula, nombres, apellidos, telefono, correo, direccion
                }
            };

            //validacion para datos de personas
            if (!validarPersona(json)) {
                console.log("llene los campos de datos de persona");
            } else
                if (!validarUsuario(json.usuario)) {
                    console.log("llene los campos de datos de usuario");
                } else {
                    //Realizar peticion ajax
                    guardandoUsuario(json);
                }

        });
    }

    function validarPersona(json) {
        let persona = json.persona;
        //expresion regular -> validar correo electronico
        var caract = new RegExp(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/);

        if (persona.cedula.length == 0) {
            return false;
        } else
            if (persona.nombres.length == 0) {
                return false;
            } else
                if (persona.apellidos.length == 0) {
                    return false;
                } else
                    if (persona.correo.length == 0) {
                        return false;
                    } else
                        if (persona.cedula.length < 10 || persona.nombres.length < 3 || persona.apellidos.length < 3) {
                            return false;
                        } else
                            if (caract.test(persona.correo) == false) {
                                return false;
                            } else
                                if (!validarCedula(persona.cedula)) {
                                    Swal.fire({
                                        title: 'Error!',
                                        text: 'La cédula es incorrecta',
                                        icon: 'error',
                                        confirmButtonText: 'Ok',
                                        confirmButtonColor: '#004a43'
                                    })
                                    return false;
                                } else {
                                    return true;
                                }
    }

    function validar_cedula(cedula) {
        if (cedula.length == 10) {

            //Obtenemos el digito de la region que sonlos dos primeros digitos
            var digito_region = cedula.substring(0, 2);

            //Pregunto si la region existe ecuador se divide en 24 regiones
            if (digito_region >= 1 && digito_region <= 24) {

                // Extraigo el ultimo digito
                var ultimo_digito = cedula.substring(9, 10);

                //Agrupo todos los pares y los sumo
                var pares = parseInt(cedula.substring(1, 2)) + parseInt(cedula.substring(3, 4)) + parseInt(cedula.substring(5, 6)) + parseInt(cedula.substring(7, 8));

                //Agrupo los impares, los multiplico por un factor de 2, si la resultante es > que 9 le restamos el 9 a la resultante
                var numero1 = cedula.substring(0, 1);
                var numero1 = (numero1 * 2);
                if (numero1 > 9) { var numero1 = (numero1 - 9); }

                var numero3 = cedula.substring(2, 3);
                var numero3 = (numero3 * 2);
                if (numero3 > 9) { var numero3 = (numero3 - 9); }

                var numero5 = cedula.substring(4, 5);
                var numero5 = (numero5 * 2);
                if (numero5 > 9) { var numero5 = (numero5 - 9); }

                var numero7 = cedula.substring(6, 7);
                var numero7 = (numero7 * 2);
                if (numero7 > 9) { var numero7 = (numero7 - 9); }

                var numero9 = cedula.substring(8, 9);
                var numero9 = (numero9 * 2);
                if (numero9 > 9) { var numero9 = (numero9 - 9); }

                var impares = numero1 + numero3 + numero5 + numero7 + numero9;

                //Suma total
                var suma_total = (pares + impares);

                //extraemos el primero digito
                var primer_digito_suma = String(suma_total).substring(0, 1);

                //Obtenemos la decena inmediata
                var decena = (parseInt(primer_digito_suma) + 1) * 10;

                //Obtenemos la resta de la decena inmediata - la suma_total esto nos da el digito validador
                var digito_validador = decena - suma_total;

                //Si el digito validador es = a 10 toma el valor de 0
                if (digito_validador == 10)
                    var digito_validador = 0;

                //Validamos que el digito validador sea igual al de la cedula
                if (digito_validador == ultimo_digito) {
                    return true;
                } else {
                    return false;
                }

            } else {
                // imprimimos en consola si la region no pertenece
                return false;
            }
        } else {
            //imprimimos en consola si la cedula tiene mas o menos de 10 digitos
            return false;
        }
    }

    function validarUsuario(usuario) {
        if (usuario.length == 0) {
            return false;
        } else
            if (usuario.clave.length == 0) {
                return false;
            } else
                if (usuario.confclave.length == 0) {
                    return false;
                } else
                    if (usuario.clave !== usuario.confclave) {
                        Swal.fire({
                            title: 'Error!',
                            text: 'Las claves no coinciden',
                            icon: 'error',
                            confirmButtonText: 'Ok',
                            confirmButtonColor: '#004a43'
                        });
                        return false;
                    }
                    else {
                        return true;
                    }
    }

    function changeCedula() {
        $('#form-cedula').blur(function () {
            let cedula = $('#form-cedula').val();

            if (!validar_cedula(cedula)) {
                Swal.fire({
                    title: 'Error!',
                    text: 'La cédula es invalida',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });
            }
        });
    }

    function validarCedula(cedula) {
        if (cedula.length == 10) {

            //Obtenemos el digito de la region que sonlos dos primeros digitos
            var digito_region = cedula.substring(0, 2);

            //Pregunto si la region existe ecuador se divide en 24 regiones
            if (digito_region >= 1 && digito_region <= 24) {

                // Extraigo el ultimo digito
                var ultimo_digito = cedula.substring(9, 10);

                //Agrupo todos los pares y los sumo
                var pares = parseInt(cedula.substring(1, 2)) + parseInt(cedula.substring(3, 4)) + parseInt(cedula.substring(5, 6)) + parseInt(cedula.substring(7, 8));

                //Agrupo los impares, los multiplico por un factor de 2, si la resultante es > que 9 le restamos el 9 a la resultante
                var numero1 = cedula.substring(0, 1);
                var numero1 = (numero1 * 2);
                if (numero1 > 9) { var numero1 = (numero1 - 9); }

                var numero3 = cedula.substring(2, 3);
                var numero3 = (numero3 * 2);
                if (numero3 > 9) { var numero3 = (numero3 - 9); }

                var numero5 = cedula.substring(4, 5);
                var numero5 = (numero5 * 2);
                if (numero5 > 9) { var numero5 = (numero5 - 9); }

                var numero7 = cedula.substring(6, 7);
                var numero7 = (numero7 * 2);
                if (numero7 > 9) { var numero7 = (numero7 - 9); }

                var numero9 = cedula.substring(8, 9);
                var numero9 = (numero9 * 2);
                if (numero9 > 9) { var numero9 = (numero9 - 9); }

                var impares = numero1 + numero3 + numero5 + numero7 + numero9;

                //Suma total
                var suma_total = (pares + impares);

                //extraemos el primero digito
                var primer_digito_suma = String(suma_total).substring(0, 1);

                //Obtenemos la decena inmediata
                var decena = (parseInt(primer_digito_suma) + 1) * 10;

                //Obtenemos la resta de la decena inmediata - la suma_total esto nos da el digito validador
                var digito_validador = decena - suma_total;

                //Si el digito validador es = a 10 toma el valor de 0
                if (digito_validador == 10)
                    var digito_validador = 0;

                //Validamos que el digito validador sea igual al de la cedula
                if (digito_validador == ultimo_digito) {
                    return true;
                } else {
                    return false;
                }

            } else {
                // imprimimos en consola si la region no pertenece
                return false;
            }
        } else {
            //imprimimos en consola si la cedula tiene mas o menos de 10 digitos
            return false;
        }
    }

    function guardandoUsuario(json) {
            $.ajax({
                // la URL para la petición
                url: urlServidor + 'usuario/guardar',
                // especifica si será una petición POST o GET
                type: 'POST',
                data: 'data=' + JSON.stringify(json),
                // el tipo de información que se espera de respuesta
                dataType: 'json',
                success: function (response) {
                    if (response.status) {
                        Swal.fire({
                            title: 'Usuario',
                            text: response.mensaje,
                            icon: 'success',
                            confirmButtonText: 'Ok',
                            confirmButtonColor: '#3085d6'
                        });
                        $('#form-datos-usuario')[0].reset();
                    } else {
                        Swal.fire({
                            title: 'Usuario',
                            text: response.mensaje,
                            icon: 'error',
                            confirmButtonText: 'Ok',
                            confirmButtonColor: '#3085d6'
                        });
                    }
                },
                error: function (jqXHR, status, error) {
                    console.log('Existió un problema, reviselo..!');
                },
                complete: function (jqXHR, status) {
                    // console.log('Petición realizada');
                }
            });
        
            if (json.usuario.img == 'default.jpg') {
        
            } else {
                //Enviar imagen al servidor(Backend)
                let img = $('#form-img-usuario')[0].files[0];
                let formdata = new FormData();
                formdata.append('fichero', img);
        
                $.ajax({
                    // la URL para la petición
                    url: urlServidor + 'usuario/fichero',
                    // especifica si será una petición POST o GET
                    type: 'POST',
                    data: formdata,
                    contentType: false,
                    processData: false,
                    // el tipo de información que se espera de respuesta
                    dataType: 'json',
                    success: function (responseImg) {
                        //console.log(responseImg);
                        if (responseImg.status) {
                            Swal.fire({
                                title: 'Usuario',
                                text: responseImg.mensaje,
                                icon: 'success',
                                confirmButtonText: 'Ok',
                                confirmButtonColor: '#004a43'
                            });
                        }
                    },
                    error: function (jqXHR, status, error) {
                        console.log('Existió un problema, reviselo..!');
                    },
                    complete: function (jqXHR, status) {
                        // console.log('Petición realizada');
                    }
                });
            }
    }

    function cancelarFormulario() {
        $('#btn-cancelar').click(function () {
            window.location.href = urlCliente + 'inicio/administrador';
        });
    }

    function agregarRolModal() {
        $('#agregar-rol-modal').click(function () {
            $('#agregar-rol').modal('show');
            $('#nuevo-rol-form').submit((e) => {
                e.preventDefault();

                let cargo = $('#nuevo-rol').val();

                if (cargo.length == 0) {
                    Swal.fire({
                        title: 'Usuario',
                        text: "Ingrese un rol",
                        icon: 'success',
                        confirmButtonText: 'Ok',
                        confirmButtonColor: '#004a43'
                    });
                } else {
                    let data = {
                        rol: {
                            cargo: cargo,
                        },
                    };

                    guardandoRol(data);

                }
            });
        });
    }

    function guardandoRol(json) {
        $.ajax({
            // la URL para la petición
            url: urlServidor + 'rol/save',
            data: "data=" + JSON.stringify(json),
            // especifica si será una petición POST o GET
            type: 'POST',
            // el tipo de información que se espera de respuesta
            dataType: 'json',
            success: function (response) {
                if (response.status) {
                    Swal.fire({
                        title: 'Rol',
                        text: response.mensaje,
                        icon: 'success',
                        confirmButtonText: 'Ok',
                        confirmButtonColor: '#3085d6'
                    });
                    $('#nuevo-rol-form')[0].reset();
                    cargarTablaRoles();
                } else {
                    Swal.fire({
                        title: 'Rol',
                        text: response.mensaje,
                        icon: 'error',
                        confirmButtonText: 'Ok',
                        confirmButtonColor: '#3085d6'
                    });
                }
            },
            error: function (jqXHR, status, error) {
                console.log('Disculpe, existió un problema');
            },
            complete: function (jqXHR, status) {
                // console.log('Petición realizada');
            }
        });
    }

    function cargarTablaRoles() {
        $.ajax({
            url: urlServidor + 'rol/listar',
            type: 'GET',
            dataType: 'json',
            success: function (response) {
                if (response.status) {
                    let tr = ""; let i = 1;

                    response.rol.forEach(element => {
                        tr += `<tr>
                            <td>${i}</td>
                            <td>${element.cargo}</td>
                            <td>
                            <div class="text-center"><button class="btn btn-primary btn-sm" onclick="editar_rol(${element.id})">
                                <i class="fa fa-edit"></i>
                                </button>
                            </div>
                            </td>

                            <td>
                            <div class="text-center"><button class="btn btn-danger btn-sm" onclick="eliminar_rol(${element.id})">
                                <i class="fa fa-trash"></i>
                                </button>
                            </div>
                            </td>
                        </tr>`;
                        i++;
                    });

                    $('#table-roles').html(tr);
                }
            },
            error: function (xhr, status) {
                console.log('Disculpe, existió un problema');
            },
            complete: function (xhr, status) {
                // console.log('Petición realizada');
            }
        });
    }

    function actualizarRol() {
        $('#btn-update').click(function () {
            let id = $('#upd-rol-id').val();
            let cargo = $('#upd-rol').val();

            if (cargo.length == 0) {
                Swal.fire(
                    'Rol',
                    'Complete el campo cargo',
                    'warning'
                )
            } else {
                let json = {
                    rol: {
                        id: id,
                        cargo: cargo
                    }
                };

                $.ajax({
                    // la URL para la petición
                    url: urlServidor + 'rol/editar',
                    type: 'POST',
                    data: { data: JSON.stringify(json) },
                    dataType: 'json',
                    success: function (response) {
                        console.log(response);
                        if (response.status) {
                            Swal.fire({
                                title: 'Rol !',
                                text: response.mensaje,
                                icon: 'success',
                                confirmButtonText: 'Ok',
                                confirmButtonColor: '#004a43'
                            })
                            $('#actualizar-rol').modal('hide');
                            cargarTablaRoles();
                        } else {
                            Swal.fire({
                                title: 'Rol !',
                                text: response.mensaje,
                                icon: 'error',
                                confirmButtonText: 'Ok',
                                confirmButtonColor: '#004a43'
                            })
                        }
                    },
                    error: function (jqXHR, status, error) {
                        console.log('Disculpe, existió un problema');
                    },
                    complete: function (jqXHR, status) {
                        // console.log('Petición realizada');
                    }
                });
            }
        })
    }

    function changeImagen() {
        var _URL = window.URL || window.webkitURL;
        $('#form-img-usuario').change((event) => {
            var file, img;
            if ((file = event.target.files[0])) {
                img = new Image();
                img.onload = function () {
                    if(this.width <= WIDTH && this.height <= HEIGHT){
                        Swal.fire({
                            title: 'Listo!',
                            text: 'La imagen cumple con las dimensiones',
                            icon: 'success',
                            confirmButtonText: 'Ok'
                        });
                        $('#btn-guardar').attr('disabled',false);

                        return true;
                    }else{
                        Swal.fire({
                            title: 'Error!',
                            text: 'La imgen no cumple con las dimensiones' + WIDTH + ' x ' + HEIGHT,
                            icon: 'error',
                            confirmButtonText: 'Ok'
                        });
                        $('#btn-guardar').attr('disabled',true);

                        return false;
                    }
                };
                
                
            }
            img.src = _URL.createObjectURL(file);
        });
    }

/* }); */

function editar_rol(id) {
    $('#actualizar-rol').modal('show');
    cargar_rol(id);
}

function cargar_rol(id) {
    $.ajax({
        // la URL para la petición
        url: urlServidor + 'rol/listar/' + id,
        // especifica si será una petición POST o GET
        type: 'GET',
        // el tipo de información que se espera de respuesta
        dataType: 'json',
        success: function (response) {
            console.log(response);
            if (response.status) {
                $('#upd-rol-id').val(response.rol.id);
                $('#upd-rol').val(response.rol.cargo);
            }
        },
        error: function (jqXHR, status, error) {
            console.log('Disculpe, existió un problema');
        },
        complete: function (jqXHR, status) {
            // console.log('Petición realizada');
        }
    });
}

function eliminar_rol(id) {
    Swal.fire({
        title: '¿Estás seguro de eliminar el rol?',
        text: "No se podra recuperar el registro",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            let json = { rol: { id } };

            $.ajax({
                // la URL para la petición
                url: urlServidor + 'rol/eliminar/' + id,
                // especifica si será una petición POST o GET
                type: 'POST',
                // el tipo de información que se espera de respuesta
                data: { data: JSON.stringify(json) },
                dataType: 'json',
                success: function (response) {
                    if (response.status) {
                        Swal.fire({
                            title: 'Rol',
                            icon: 'success',
                            text: response.mensaje,
                            confirmButtonColor: '#004a43',
                        });
                        cargarTablaRoles();
                    }
                },
                error: function (jqXHR, status, error) {
                    console.log('Disculpe, existió un problema');
                },
                complete: function (jqXHR, status) {
                    // console.log('Petición realizada');
                }
            });
        }
    })
}