var length_in = 0;
        $(document).ready(function () {
            Highcharts.setOptions({
                global: {
                    useUTC: true
                }
            });
            var x0, y0;
            var previous = $.getJSON('http://localhost/data/jsonp.php?filename=cpuUsageTmp.json&callback=?');
            var current = null;
            Highcharts.chart('chart-t2-style-content-container1', {
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
                                $.getJSON('http://localhost/data/jsonp.php?filename=cpuUsageTmp.json&callback=?', function(json){
                                    current = json;
                                    if(current.length > 0){
                                        x0 = current[length_in][0];
                                        y0 = current[length_in][1];
                                        var x = (new Date(x0)).getTime(), 
                                        y = y0;
                                        if(y0 > 80) warningCPU();
                                        series.addPoint([x, y], true, true);
                                    }
                                    previous = current;
                                });
                            }, 1000);
                        }
                    }
                },
                title: {
                    text: 'CPU usage'
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
                    name: 'CPU usage',
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
        }); 
        function warningCPU(){

        } 