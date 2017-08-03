function chart(dir,id,name,number,war){
    var length_in = 0;
                var svr_status = "GOOD";
                var countnumber = 0;
                    Highcharts.setOptions({
                        global: {
                            useUTC: true
                        }
                    });
                    var x0, y0;
                    var previous = $.getJSON();
                    var current = null;
                    Highcharts.chart(id, {
                        credits: {
                            text: 'Đức điềm đạm',
                            href: 'https://www.facebook.com/lanhhuyet510',
                            position: {
                                align: 'right',
                                x: -10
                            },
                            style: {
                                color: '#909090',
                                fontSize: '13px'
                            }
                        },
                        chart: {
                            zoomType: 'x',
                            type: 'spline',
                            animation: Highcharts.svg, // don't animate in old IE
                            marginRight: 10,
                            events: {
                                load: function () {
                                    // set up the updating of the chart each second
                                    var series = this.series[0];
                                    setInterval(function () {
                                        $.getJSON(dir, function(json){ //do apache chạy ở cổng 8080 nên phải thêm cổng ở url OK, de ghep code thu
                                            current = json;
                                            if(current.length > 0){
                                                x0 = current[length_in][0];
                                                y0 = current[length_in][1];
                                                var x = (new Date(x0)).getTime(), 
                                                y = y0;
                                                if(number==0){
                                                    if(y0 <= 50){
                                                    svr_status = "GOOD";
                                                }
                                                if(y0 > 50){
                                                    svr_status = "WARNING";
                                                }
                                                if(y0 > 80){
                                                    svr_status = "CRITICAL!";
                                                    countnumber = countnumber + 1;
                                                    
                                                }
                                                document.getElementById(war).innerHTML = "Server status: " + svr_status + "<br><br>"
                                                if(countnumber==20){
                                                    alert("CRITICAL");
                                                    countnumber = 0;
                                                }
                                                }
                                                series.addPoint([x, y], true, true);
                                            }
                                            previous = current;
                                        });
                                    }, 1000);
                                }
                            }
                        },
                        title: {
                            text: name
                        },
                        subtitle: {
                            text: 'date-time'
                        },
                        xAxis: {
                            dateTimeLabelFormats: {
                                day: '%H:%M:%S'
                            },
                            type: 'datetime',
                            //tickAmount: 12
                            tickPixelInterval: 350
                            
                            //tickPixelInterval: 5
                        },
                        yAxis: {
                            tickPositions: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
                            title: {
                                text: 'Percent'
                            },
                            plotLines: [{
                                value: 0,
                                width: 1,
                                color: '#808080'
                            }],
                            tickAmount: 10
                        },
                        tooltip: {
                            formatter: function () {
                                return '<b>' + this.series.name + '</b><br/>' +
                                    Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                                    Highcharts.numberFormat(this.y, 2);
                            }
                        },
                        legend: {
                            enabled: false
                        },
                        exporting: {
                            enabled: true
                        },
                        series: [{
                            type: 'area',
                            name: name,
                            data: (function () {
                                // generate an array of random data
                                var data = [],
                                    i;    
                                for (i = -120; i <= 0; i += 1) {
                                    data.push({
                                        x: x0 + i * 1000,
                                        y: y0
                                    });
                                }
                                return data;
                            }())
                        }],
                        noData: {
                            position:{
                                align: "center",
                                verticalAlign: "middle"
                            },
                            style: {
                                fontWeight: 'bold',
                                fontSize: '15px',
                                color: '#303030'
                            }
                        }
                    });
}
                
                $(document).ready(function () {
                    var number = 0;
                    var numberx =1;
                    var dir = 'http://localhost:8080/WebApp/data/jsonp.php?filename=cpuJson.json&callback=?';
                    var id = 'container-cpu';
                    var name = 'CPU Usage'
                    var war = "svr_status";
                    var dir1 = 'http://localhost:8080/WebApp/data/jsonp.php?filename=MemoryJson.json&callback=?';
                    var id1 = 'container-ram';
                    var name1= 'Ram Usage'
                    var war1 = "svr_status1";
                    var dir2 = 'http://localhost:8080/WebApp/data/jsonp.php?filename=DiskJson.json&callback=?';
                    var id2 = 'container-disk';
                    var name2= 'Disk Usage';
                    var war2 = "svr_status2";
                    chart(dir,id,name,number,war);
                    chart(dir1,id1,name1,number,war1);
                    chart(dir2,id2,name2,number,war2);

                }); 
                function warningCPU(){
                    chart.series
                }    






