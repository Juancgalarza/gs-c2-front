$(function(){

    _init();

    function _init(){
        cargar_data();
    }

    function cargar_data(){   
        
        $('#compra-play').click(function(){
            let desde = $('#date-compra-inicio').val();
            let hasta = $('#date-compra-fin').val();
            let top = $('#date-compra-top option:selected').val(); 
            
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
            }else
            if(top == '0'){
                Swal.fire(
                    'Reportes',
                    'Seleccione un Top',
                    'warning'
                  )
            }
            else{
                if(moment(desde).isAfter(hasta)){
                    Swal.fire(
                      'Reportes',
                      'La fecha hasta no puede menor a la fecha de inicio',
                      'error'
                    )
                }else{
                    $('#inicio-reporte').text(desde);
                    $('#fin-reporte').text(hasta);
                    $.ajax({
                        // la URL para la petición
                        url : urlServidor + 'venta/frecuentes/' + desde + '/' + hasta + '/' + top,
                        // especifica si será una petición POST o GET
                        type : 'GET',
                        // el tipo de información que se espera de respuesta
                        dataType : 'json',
                        success : function(response) { 
                            console.log(response);
                            if(response.lista.length > 0){
                                let tr = '';
                                let i = 1;
                                response.lista.forEach(element => {
                                    tr += `<tr>
                                        <td>${i}</td>
                                        <td>${element.producto.nombre}</td>
                                        <td>${element.cantidad}</td>
                                        <td>${element.producto.precio_venta}</td>
                                        <td>${element.total}</td>
                                    </tr>`; 
                                    i++;
                                });
                                $('#body-mas-comprado').html(tr);
                                $('#totalg').text((response.total_general).toFixed(2));
                                $('#tabla-reporte').removeClass('d-none');
    
                                let donutData        = {
                                    labels: response.data.masVendidos.labels,
                                    datasets: [
                                      {
                                        data: response.data.masVendidos.data,
                                        backgroundColor : ['#f39c12', '#00c0ef', '#3c8dbc', '#d2d6de', '#ffff00','#f56954', '#00a65a'],
                                      }
                                    ]
                                  }
                    
                                  //Create pie or douhnut chart
                                  // You can switch between pie and douhnut using the method below.
                                  $('#box-canva1').html('');
                                  let canvas = `<canvas id="mas-vendidos"
                                  style="min-height: 250px; height: 250px; max-height: 300px; max-width: 100%; margin-top: 22px"></canvas>`;
                                  $('#box-canva1').html(canvas);
    
                                  var pieChartCanvas = document.getElementById('mas-vendidos').getContext('2d');
                                  var pieData        = donutData;
                                  var pieOptions     = {
                                      maintainAspectRatio : false,
                                      responsive : true,
                                  }
                                
                                new Chart(pieChartCanvas, {
                                    type: 'pie',
                                    data: pieData,
                                    options: pieOptions
                                })
    
                                
                                let graficoPorcentaje        = {
                                    labels: response.data.porcentajes.labels,
                                    datasets: [
                                      {
                                        data: response.data.porcentajes.data,
                                        backgroundColor : ['#f39c12', '#00c0ef', '#3c8dbc', '#d2d6de', '#ffff00','#f56954', '#00a65a'],
                                      }
                                    ]
                                  }
                    
                                  
                                $('#box-canva2').html('');
                                let canvas2 = `<canvas id="mas-vendidos-porcentaje"
                                style="min-height: 250px; height: 250px; max-height: 300px; max-width: 100%; margin-top: 22px"></canvas>`;
                                $('#box-canva2').html(canvas2);
    
                                var piePorcentaje = $('#mas-vendidos-porcentaje').get(0).getContext('2d')
                                var pieDataPorcentaje        = graficoPorcentaje;
                                var pieOptionsPorcentaje     = {
                                maintainAspectRatio : false,
                                responsive : true,
                                }
                                //Create pie or douhnut chart
                                // You can switch between pie and douhnut using the method below.
                                new Chart(piePorcentaje, {
                                    type: 'doughnut',
                                    data: pieDataPorcentaje,
                                    options: pieOptionsPorcentaje
                                })
                            }else{
                                Swal.fire(
                                    'Reportes',
                                    'No se encuentra información disponible',
                                    'warning'
                                    )
                                $('#tabla-reporte').addClass('d-none');

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
            let datos = $('#body-mas-comprado tr');
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
                filename:     'Reporte Productos Más Comprados.pdf',
                image:        { type: 'jpeg', quality: 2 },
                html2canvas:  { scale: 2 },
                jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
                };

                html2pdf().set(opt).from(element).save();
            }
        });
    }
});