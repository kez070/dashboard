/*
The purpose of this demo is to demonstrate how multiple charts on the same page
can be linked through DOM and Highcharts events and API methods. It takes a
standard Highcharts config with a small variation for each data set, and a
mouse/touch event handler to bind the charts together.
*/


/**
 * In order to synchronize tooltips and crosshairs, override the
 * built-in events with handlers defined on the parent element.
 */

// $(document).ready(function() {
//     function renderChart(seriesData){
//         chart = new Highcharts.Chart('pieContainer',{
//             chart: {
//                 renderTo: "div-id-where-render-chart",
//                 type: "pie"
//             },
//             title: {
//                 text: "My chart"
//             },
//             tooltip: {
//                 pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
//             },
//             series: [{
//                 name: 'Brands',
//                 colorByPoint: true,
//                 data: [{
//                     name: 'Chrome',
//                     y: 61.41,
//                     sliced: true,
//                     selected: true
//                 }, {
//                     name: 'Internet Explorer',
//                     y: 110.84
//                 }, {
//                     name: 'Firefox',
//                     y: 10.85
//                 }, {
//                     name: 'Edge',
//                     y: 4.67
//                 }, {
//                     name: 'Safari',
//                     y: 4.18
//                 }, {
//                     name: 'Sogou Explorer',
//                     y: 1.64
//                 }, {
//                     name: 'Opera',
//                     y: 1.6
//                 }, {
//                     name: 'QQ',
//                     y: 1.2
//                 }, {
//                     name: 'Other',
//                     y: 2.61
//                 }]
//             }]
//         });
//     }
// });



var coal_values;
var distillate_values;
var gas_values;
var hydro_values;
var wind_values;
var x_values;
var price_values;
var bar;
var total_load;

var render = false;
var first=true;

function handleClick() {
    console.log('clicked')
    if(first) {
        first = false;
        document.getElementById('barContainer').style.display ='block';
        document.getElementById('pieContainer').style.display ='none';
    }
    else if(document.getElementById('pieContainer').style.display=='none' ){
        document.getElementById('barContainer').style.display ='none';
        document.getElementById('pieContainer').style.display ='block';

    }
    else {
        document.getElementById('pieContainer').style.display ='none';
        document.getElementById('barContainer').style.display ='block';

    }
}

function renderPie(chart,data){

    if(!render) {
        chart.redraw();
        
    }
    chart.update({
        series:  [{
            name: 'Brands',
            colorByPoint: true,
            data: [{
                name: 'Black Coal',
                y: coal_values[data],
                color: Highcharts.getOptions().colors[0]
            }, {
                name: 'Distillate Power',
                y: distillate_values[data],
                color: Highcharts.getOptions().colors[1]
            }, {
                name: 'Gas',
                y: gas_values[data],
                color: Highcharts.getOptions().colors[2]
            }, {
                name: 'Hydro',
                y: hydro_values[data],
                color: Highcharts.getOptions().colors[3]
            }, {
                name: 'Wind',
                y: wind_values[data],
                color: Highcharts.getOptions().colors[4]
            }]
        }]
    })
}

function renderBar(chart,data){

    if(!render) {
        chart.redraw();
        
    }


    total = coal_values[data] + distillate_values[data] + gas_values[data] + hydro_values[data] + wind_values[data]

    coal_data = (coal_values[data] / total * 100).toFixed(2) 
    distillate_data = (distillate_values[data] / total * 100).toFixed(2) 
    gas_data = (gas_values[data] / total * 100).toFixed(2) 
    hydro_data = (hydro_values[data] / total * 100).toFixed(2) 
    wind_data = (wind_values[data] / total * 100).toFixed(2) 


    chart.update({
        series:  [{
            colorByPoint: true,
            data: [{
                name: 'Black Coal',
                y: coal_values[data],
                color: Highcharts.getOptions().colors[0]
            }, {
                name: 'Distillate Power',
                y: distillate_values[data],
                color: Highcharts.getOptions().colors[1]
            }, {
                name: 'Gas',
                y: gas_values[data],
                color: Highcharts.getOptions().colors[2]
            }, {
                name: 'Hydro',
                y: hydro_values[data],
                color: Highcharts.getOptions().colors[3]
            }, {
                name: 'Wind',
                y: wind_values[data],
                color: Highcharts.getOptions().colors[4]
            }]
        }]
    })
}

function updateChart(x_val) {
    var hydro = hydro_values[x_val];
    var gas = gas_values[x_val];
    var wind = wind_values[x_val];
    var distillate = distillate_values[x_val];
    var coal = coal_values[x_val];

    var total_power = gas+hydro+wind+distillate+coal;

    var exports1 = exports_values[x_val];
    var pumps = pumps_values[x_val];

    total_load = exports1+pumps;
    
    document.getElementById('coal1').innerHTML = coal;
    document.getElementById('hydro1').innerHTML = hydro;
    document.getElementById('gas1').innerHTML = gas;
    document.getElementById('wind1').innerHTML = wind;
    document.getElementById('distillate1').innerHTML = distillate;

    document.getElementById('source_1').innerHTML = total_power.toFixed(2);

    document.getElementById('time').innerHTML = 'Time: ' + x_values[x_val];

    document.getElementById('coal2').innerHTML = (coal / total_power * 100).toFixed(2) + "%";
    document.getElementById('hydro2').innerHTML = (hydro / total_power * 100).toFixed(2) + "%";
    document.getElementById('gas2').innerHTML = (gas / total_power * 100).toFixed(2) + "%";
    document.getElementById('wind2').innerHTML = (wind / total_power * 100).toFixed(2) + "%";
    document.getElementById('distillate2').innerHTML = (distillate / total_power * 100).toFixed(2) + "%";

    document.getElementById('source_3').innerHTML = price_values[x_val];

    document.getElementById('Exports1').innerHTML = exports1;
    document.getElementById('pumps1').innerHTML = pumps;

    document.getElementById('Exports2').innerHTML = (exports1 / total_power * 100).toFixed(2) + "%";
    document.getElementById('pumps2').innerHTML = (pumps / total_power * 100).toFixed(2) + "%";

    document.getElementById('loads1').innerHTML = total_load;

    document.getElementById('net1').innerHTML = (total_load+total_power).toFixed(2);

    document.getElementById('renewables2').innerHTML = ((wind+hydro) / total_power * 100).toFixed(2) + "%";

}


['mousemove'].forEach(function (eventType) {
    document.getElementById('container3').addEventListener(
        eventType,
        function (e) {
            var chart,
                point,
                i,
                event;
            temp_x = 0;
            console.log('trigger')
            for (i = 0; i < Highcharts.charts.length; i = i + 1) {
                chart = Highcharts.charts[i];
                // Find coordinates within the chart
                event = chart.pointer.normalize(e);
                // Get the hovered point
                point = chart.series[0].searchPoint(event, true);
                if(point) {
                    console.log('hi'+point.x);
                    updateChart(point.x);
                }
                if (point && chart.series.length==1) {
                    console.log(point.x)
                    point.highlight(e);
                    temp_x = point.x
                    
                }
                if (chart.renderTo.id=='pieContainer'){
                    renderPie(chart,temp_x)
                }
                if (chart.renderTo.id=='barContainer'){
                    renderBar(chart,temp_x)
                }
            }
        }
    );
    document.getElementById('container2').addEventListener(
        eventType,
        function (e) {
            var chart,
                point,
                i,
                event;
            temp_x =0;
            for (i = 0; i < Highcharts.charts.length; i = i + 1) {
                chart = Highcharts.charts[i];
                // Find coordinates within the chart
                event = chart.pointer.normalize(e);
                // Get the hovered point
                point = chart.series[0].searchPoint(event, true);
                if (point ) {
                    point.highlight(e);
                    temp_x = point.x
                }
                if (chart.renderTo.id=='pieContainer'){
                    renderPie(chart,temp_x)
                }
                if (chart.renderTo.id=='barContainer'){
                    renderBar(chart,temp_x)
                }
            }
        }
    );
    document.getElementById('container4').addEventListener(
        eventType,
        function (e) {
            var chart,
                point,
                i,
                event;
            temp_x = 0;
            for (i = 0; i < Highcharts.charts.length; i = i + 1) {
                chart = Highcharts.charts[i];
                // Find coordinates within the chart
                event = chart.pointer.normalize(e);
                // Get the hovered point
                point = chart.series[0].searchPoint(event, true);
                if (point) {
                    point.highlight(e);
                    temp_x = point.x;
                }
                if (chart.renderTo.id=='pieContainer'){
                    renderPie(chart,temp_x)
                }
                if (chart.renderTo.id=='barContainer'){
                    renderBar(chart,temp_x)
                }
            }
        }
    );
});

// /**
//  * Override the reset function, we don't need to hide the tooltips and
//  * crosshairs.
//  */
Highcharts.Pointer.prototype.reset = function () {
    return undefined;
};

/**
 * Highlight a point by showing tooltip, setting hover state and draw crosshair
 */
Highcharts.Point.prototype.highlight = function (event) {
    event = this.series.chart.pointer.normalize(event);
    this.onMouseOver(); // Show the hover marker
    this.series.chart.tooltip.refresh(this); // Show the tooltip
    this.series.chart.xAxis[0].drawCrosshair(event, this); // Show the crosshair
};

// /**
//  * Synchronize zooming through the setExtremes event handler.
//  */
// function syncExtremes(e) {
//     var thisChart = this.chart;

//     if (e.trigger !== 'syncExtremes') { // Prevent feedback loop
//         Highcharts.each(Highcharts.charts, function (chart) {
//             if (chart !== thisChart) {
//                 if (chart.xAxis[0].setExtremes) { // It is null while updating
//                     chart.xAxis[0].setExtremes(
//                         e.min,
//                         e.max,
//                         undefined,
//                         false,
//                         { trigger: 'syncExtremes' }
//                     );
//                 }
//             }
//         });
//     }
// }

// Get the data. The contents of the data file can be viewed at
Highcharts.ajax({
    url: 'springfield_2.json',
    dataType: 'text',
    success: function (data) {

        data = JSON.parse(data);
        
        data.map(function(elm) {
            if (elm['history']['start']) {
                elm['history']['start'] = new Date(elm['history']['start']*1000);
                elm['history']['last'] = new Date(elm['history']['last']*1000);

            }
        });

        x_values = [];
        temp = data[0]['history']['start'];
        temp = new Date(temp.getTime() + 5*60000);
        while(temp<data[0]['history']['last']) {
            x_values.push(temp);
            temp = new Date(temp.getTime() + 30*60000);
        }

        coal_values = [];
        for(var i =1; i < data[0]['history']['data'].length;i+=6){
            coal_values.push(data[0]['history']['data'][i]);
        }
        distillate_values = [];
        for(var i =1; i < data[1]['history']['data'].length;i+=6){
            distillate_values.push(data[1]['history']['data'][i]);
        }
        gas_values = [];
        for(var i =1; i < data[2]['history']['data'].length;i+=6){
            gas_values.push(data[2]['history']['data'][i]);
        }
        hydro_values = [];
        for(var i =1; i < data[3]['history']['data'].length;i+=6){
            hydro_values.push(data[3]['history']['data'][i]);
        }
        wind_values = [];
        for(var i =1; i < data[5]['history']['data'].length;i+=6){
            wind_values.push(data[5]['history']['data'][i]);
        }
        exports_values = [];
        for(var i =1; i < data[6]['history']['data'].length;i+=6){
            exports_values.push(-data[6]['history']['data'][i]);
        }
        pumps_values = [];
        for(var i =1; i < data[4]['history']['data'].length;i+=6){
            pumps_values.push(-data[4]['history']['data'][i]);
        }

        price_values = data[8]['history']['data'];

        temp_values = data[10]['history']['data'];
        
        var chartDiv = document.createElement('div');
        chartDiv.className = 'chart';
        document.getElementById('container').appendChild(chartDiv);

        Highcharts.chart('container3', {
            chart: {
                type: 'area',
                backgroundColor: "#ece9e6"
            },
            title: {
                text: 'Energy Generation'
            },
            xAxis: {
                categories: x_values,
                dateFormat: {
                    millisecond: '%H:%M:%S.%L',
                    second: '%H:%M:%S',
                    minute: '%H:%M',
                    hour: '%H:%M',
                    day: '%e. %b',
                    week: '%e. %b',
                    month: '%b \'%y',
                    year: '%Y'
                },
                minTickInterval: 100
            },
            yAxis: {
                title: {
                    text: 'MW'
                }
            },
            tooltip: {
                split: false,
                valueSuffix: 'MW',
                enabled: false
            },
            plotOptions: {
                area: {
                    stacking: 'normal',
                    lineColor: '#666666',
                    lineWidth: 0.11,
                    marker: {
                        lineWidth: 0.11,
                        lineColor: '#666666'
                    }
                }
            },
            series: [{
                name: 'Wind',
                data: wind_values,
                color: Highcharts.getOptions().colors[4]
            }, {
                name: 'Distillate Power',
                data: distillate_values,
                color: Highcharts.getOptions().colors[1]
            }, {
                name: 'Gas',
                data: gas_values,
                color: Highcharts.getOptions().colors[2]

            },{
                name: 'Hydro',
                data: hydro_values,
                color: Highcharts.getOptions().colors[3]
            },
            {
                name: 'Black Coal',
                data: coal_values,
                color: Highcharts.getOptions().colors[0]
            },
            {
                name: 'Exports',
                data: exports_values,
                color: Highcharts.getOptions().colors[5]

            }, 
            {
                name: 'Pumps',
                data: pumps_values,
                color: Highcharts.getOptions().colors[6]

            }]
        });

        Highcharts.chart('container2', {

            title: {
                text: 'Price'
            },
            chart: {
                backgroundColor: '#ece9e6',
                height: 200,

            },
            xAxis: {
                categories: x_values,
                dateFormat: {
                    millisecond: '%H:%M:%S.%L',
                    second: '%H:%M:%S',
                    minute: '%H:%M',
                    hour: '%H:%M',
                    day: '%e. %b',
                    week: '%e. %b',
                    month: '%b \'%y',
                    year: '%Y'
                },
                minTickInterval: 100,
                visible : false
            },
        
            yAxis: {
                title: {
                    text: '$/MWh'
                }
            },
            series: [{
                name: 'Price',
                data: price_values
            }],
        
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            }
        
        });
        Highcharts.chart('container4', {

            title: {
                text: 'Temperature'
            },
            chart: {
                backgroundColor: '#ece9e6',
                height: 200,
            },
            xAxis: {
                categories: x_values,
                dateFormat: {
                    millisecond: '%H:%M:%S.%L',
                    second: '%H:%M:%S',
                    minute: '%H:%M',
                    hour: '%H:%M',
                    day: '%e. %b',
                    week: '%e. %b',
                    month: '%b \'%y',
                    year: '%Y'
                },
                minTickInterval: 100,
                visible : false
            },
        
        
            yAxis: {
                title: {
                    text: 'Farenheit'
                }
            },
            series: [{
                name: 'Temperature',
                data: temp_values
            }],
        
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            }
        
        });



        pie = Highcharts.chart('pieContainer', {
            chart: {
                
                backgroundColor: '#ece9e6',
                
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            
            title: {
                text: ''
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point}</b>',
                enabled: false
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            series: [{
                name: 'f',
                colorByPoint: true,
                data: [{
                    name: '',
                    y: 61.41,
                    sliced: true,
                    selected: true
                }]
            }]
        });


        bar = Highcharts.chart('barContainer', {
            chart: {
                type: 'bar',
                backgroundColor: '#ece9e6',

            },
            
            title: {
                text: ''
            },
           series: [{
                name: 'Black Coal',
                y: 1,
                color: Highcharts.getOptions().colors[0]
            }, {
                name: 'Distillate Power',
                y: 1,
                color: Highcharts.getOptions().colors[1]
            }, {
                name: 'Gas',
                y: 1,
                color: Highcharts.getOptions().colors[2]
            }, {
                name: 'Hydro',
                y: 1,
                color: Highcharts.getOptions().colors[3]
            }, {
                name: 'Wind',
                y: 1,
                color: Highcharts.getOptions().colors[4]
            }],
            yAxis: {
                min: 0,
                title: {
                    text: 'count',
                    align: 'high'
                },
                
            },
            tooltip: {
                
            }
        });
    }
});

