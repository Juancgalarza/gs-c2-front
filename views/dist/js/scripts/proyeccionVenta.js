$(function(){
    
    _init();

    function _init(){
        cargar_data();
        calcular_dias();
    }

    function cargar_data(){
        $('#proy-play').click(function(){
            let periodo = $('#date-periodo-venta option:selected').val(); 
            
            if(periodo == '0'){
                Swal.fire(
                    'Proyecciones',
                    'Seleccione un Período',
                    'warning'
                  )
            }
            else{
                $.ajax({
                    // la URL para la petición
                    url : urlServidor + 'venta/proyeccion/' + periodo,
                    // especifica si será una petición POST o GET
                    type : 'GET',
                    // el tipo de información que se espera de respuesta
                    dataType : 'json',
                    success : function(response) { 
                        console.log(response);
                        if(response.status){
                            let tr = '';
                            let i = 1;
                            response.tabla.forEach(element => {
                                tr += `<tr>
                                    <td>${i}</td>
                                    <td>${element.fecha}</td>
                                    <td>${element.cantidad}</td>
                                    <td>${element.venta}</td>
                                </tr>`;
                                i++;
                            });
                            $('#body-proy-venta').html(tr); 
                            $('#num-dias').removeClass('d-none');
                            $('#calcular-proy').removeClass('d-none');
                            $('#tabla-reporte').removeClass('d-none');

                            $('#const-a').val(response.data.constantes.a);
                            $('#const-b').val(response.data.constantes.b);
                             /* Canvas 1 */
                             $('#box-canva1').html('');
                             let canvas1 =   ` <canvas id="dispersion-box"
                             style="min-height: 250px; height: 250px; max-height: 300px; max-width: 100%; margin-top: 22px"></canvas>`;
                              $('#box-canva1').html(canvas1);

                              let elementCanvas = document.getElementById('dispersion-box').getContext('2d');
                              
                              const data = {
                                labels: response.burbuja.labels,
                                datasets: [
                                  {
                                    label: 'Venta',
                                    data: response.burbuja.data,
                                    //borderColor: Utils.CHART_COLORS.red,
                                    backgroundColor: ["#fff706", "#fe0612","#282f34","#009000","#fff706", "#fe0612","#282f34","#009000"],
                                  }
                                ]
                              };
                              
                              const config = {
                                type: 'bubble',
                                data: data,
                                options: {
                                  responsive: true,
                                  plugins: {
                                    legend: {
                                      position: 'top',
                                    },
                                    title: {
                                      display: true,
                                      text: 'Chart.js Bubble Chart'
                                    }
                                  }
                                },
                              };
                              const burbuga = new Chart(
                                elementCanvas, config
                              )


                        }else{
                            Swal.fire(
                                'Proyecciones',
                                response.mensaje,
                                'error'
                            );
                            //$('#tabla-reporte').addClass('d-none');
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

        $('#proy-pdf').click(function(){
            let datos = $('#body-proy-venta tr');
            if(datos.length == 0){
                Swal.fire(
                    'Reportes',
                    'No hay datos disponibles en la tabla',
                    'error'
                  )
            }else{
                let element = document.getElementById('tabla-reporte');
                let opt = {
                margin:       0.5,
                filename:     'Proyección Venta.pdf',
                image:        { type: 'jpeg', quality: 3 },
                html2canvas:  { scale: 2 },
                jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
                };

                html2pdf().set(opt).from(element).save();
            }
        });
    }

    function calcular_dias(){
      $('#proy-calcular').click(function(){
        let dias = $('#proy-dias').val();
        let srt_dias = dias;
        dias = parseInt(dias);

        if(srt_dias.length == 0){
          Swal.fire(
            'Proyección',
            'Debe ingresar el número de días',
            'warning'
          )
        }else
        if(dias == 0){
          Swal.fire(
            'Proyección',
            'El número de días debe ser mayor a cero',
            'warning'
          )
        }else
        if(dias > 0){
          let a = parseInt($('#const-a').val());
          let b = parseInt($('#const-b').val());
          let x = dias;
          let datos = [];
          let labels = [];
          for (let i = 1; i <= x; i++) {
            labels.push(i);
            let fx = a + (b * i);
            datos.push(fx);
          }

          /* Canvas 1 */
          $('#box-canva2').html('');
          let canvas2 =   ` <canvas id="grafica-box"
          style="min-height: 250px; height: 250px; max-height: 300px; max-width: 100%; margin-top: 22px"></canvas>`;
           $('#box-canva2').html(canvas2);

           let elementCanvas = document.getElementById('grafica-box').getContext('2d');

           const data = {
            labels: labels,
            datasets: [
              {
                label: 'Proyección de Ventas en días',
                data: datos,
                backgroundColor: '#fff706',
                backgroundColor : "rgba(0,0,0,0.5)",
                fill: false
              }
            ]
          };
          
          const config = {
            type: 'line',
            data: data,
            options: {
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
                title: {
                  display: true,
                  text: 'Chart.js Bubble Chart'
                }
              }
            },
          };
          const burbuga = new Chart(
            elementCanvas, config
          )

        }
      });
    }
});