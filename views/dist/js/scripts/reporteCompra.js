$(function(){
  
    _init();

    function _init(){
        cargar_data();
    }

    function cargar_data(){
        $('#compra-play').click(function(){
            
            let desde = $('#date-compra-inicio').val();
            let hasta = $('#date-compra-fin').val();
            
            if(desde.length == 0){
                Swal.fire(
                    'Reportes',
                    'Seleccione una Fecha de Inicio',
                    'warning'
                  )
            }else
            if(hasta.length == 0){
                Swal.fire(
                    'Reportes',
                    'Seleccione una Fecha de Fin',
                    'warning'
                  )
            }else{
              if(moment(desde).isAfter(hasta)){
                Swal.fire(
                  'Reportes',
                  'La fecha hasta no puede ser menor',
                  'error'
                )
              }else{
                let f = new Date();
                let fecha = f.getDate() + '/' + (f.getMonth()+1) + '/' + f.getFullYear();
                let hora = f.getHours() + ':' + f.getMinutes() + ':' + f.getSeconds();
                $('#fecha-consulta').text(fecha);
                $('#hora-consulta').text(hora);
                $('#inicio-reporte').text(desde);
                $('#fin-reporte').text(hasta);
                $.ajax({
                    // la URL para la petición
                    url : urlServidor + 'compra/mensuales/' + desde + '/' + hasta,
                    // especifica si será una petición POST o GET
                    type : 'GET',
                    // el tipo de información que se espera de respuesta
                    dataType : 'json',
                    success : function(response) { 
                        if(response.lista.length > 0){
                            let tr = '';
                            let i = 1;

                            response.lista.forEach(element => {
                                tr += `<tr>
                                    <td>${i}</td>
                                    
                                    <td>${element.data.serie}</td>
                                    <td>${element.data.subtotal}</td>
                                    <td>${element.data.iva}</td>
                                    <td>${element.data.total}</td>
                                </tr>`;
                                i++;
                            });
                            $('#body-reporte-compras').html(tr);
                            $('#tabla-reporte').removeClass('d-none');
                            $('#totales').html('Totales');
                            $('#subtotal-general').html(response.totales.subtotal);
                            $('#iva-general').html(response.totales.iva);
                            $('#total-general').html(response.totales.total);

                                 /* Canvas 1 */
                                 $('#box-canvas1').html('');
                                 let canvas1 =   `<canvas id="box-barra1"
                                      style="min-height: 340px; height: 340px; max-height: 300px; max-width: 100%; margin-top: 22px"></canvas>`;
                                  $('#box-canvas1').html(canvas1);
                                 let areaChartData = {
                                     labels  : response.barra.labels,
                                     datasets: [
                                       {
                                         label               : 'Iva',
                                         backgroundColor     : '#f56954',
                                         pointRadius          : false,
                                         pointColor          : '#3b8bba',
                                         pointStrokeColor    : 'rgba(60,141,188,1)',
                                         pointHighlightFill  : '#fff',
                                         pointHighlightStroke: 'rgba(60,141,188,1)',
                                         data                : response.barra.dataIva
                                       },
                                       {
                                         label               : 'Subtotal',
                                        backgroundColor     : '#00a65a',
                                         pointRadius         : false,
                                         pointColor          : 'rgba(210, 214, 222, 1)',
                                         pointStrokeColor    : '#c1c7d1',
                                         pointHighlightFill  : '#fff',
                                         pointHighlightStroke: 'rgba(220,220,220,1)',
                                         data                : response.barra.dataSubtotal
                                       },
                                       {
                                         label               : 'Total',
                                         backgroundColor     : '#f39c12',
                                         pointRadius         : false,
                                         pointColor          : 'rgba(210, 214, 222, 1)',
                                         pointStrokeColor    : '#c1c7d1',
                                         pointHighlightFill  : '#fff',
                                         pointHighlightStroke: 'rgba(220,220,220,1)',
                                         data                : response.barra.dataTotal
                                       }
                                     ]
                                   }
     
                                 var barChartCanvas = $('#box-barra1').get(0).getContext('2d')
                                 var barChartData = $.extend(true, {}, areaChartData)
                                 var temp0 = areaChartData.datasets[0]
                                 var temp1 = areaChartData.datasets[1]
                                 var temp2 = areaChartData.datasets[2]
                                 barChartData.datasets[0] = temp1
                                 barChartData.datasets[1] = temp0
                                 barChartData.datasets[2] = temp2
     
                                 var barChartOptions = {
                                 responsive              : true,
                                 maintainAspectRatio     : false,
                                 datasetFill             : false
                                 }
     
                                 new Chart(barChartCanvas, {
                                 type: 'bar',
                                 data: barChartData,
                                 options: barChartOptions
                                 })
                        }else{
                          Swal.fire(
                            'Reportes',
                            'No se encuentra información disponible',
                            'warning'
                          )
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
            }
        });

        $('#compra-pdf').click(function(){
          let datos = $('#body-reporte-compras tr');
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
              filename:     'Reporte de Compras Mensuales.pdf',
              image:        { type: 'jpeg', quality: 3 },
              html2canvas:  { scale: 2 },
              jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
              };

              html2pdf().set(opt).from(element).save();
          }
      });
    }
});