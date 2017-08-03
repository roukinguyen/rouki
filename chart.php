<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chart SMTW Project</title>
    <link rel="stylesheet" type="text/css" href="css/reset.css">
    <link rel="stylesheet" type="text/css" href="bootstrap/bootstrap.css">
    <link rel="stylesheet" type="text/css" href="css/main.css">
    <link rel="stylesheet" type="text/css" href="css/chart.css">
    <script type="text/javascript" src="js/jquery-3.2.1.min.js"></script>
    <script type="text/javascript" src="bootstrap.js"></script>
    <script type="text/javascript" src="js/highcharts.js"></script>
    <script type="text/javascript" src="modules/no-data-to-display.js"></script>
    <script type="text/javascript" src="modules/exporting.js"></script>
    <script type="text/javascript" src="modules/broken-axis.js"></script>
    <script src="ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <script src="ajax/libs/jquery/1.2.4/jquery.min.js"></script>
</head>
<body>
    <div class="container-fluid">
        <div class="row smtw-header">
            <div class="col-sm-1 col-md-1 col-lg-1 smtw-header-logo colfull">
                <img src="images/1.png" alt="Logo">
            </div>
            <div class="col-sm-11 col-md-11 col-lg-11 smtw-header-right colfull">
                <div class="col-md-12 col-md-12 col-lg-12 smtw-header-right-icon colfull">
                    <div class="icon">
                        <a href="#" class="header-icon" id="back"><img src="images/back.png"></a>
                        <p class="icon-p">Go_Back</p>
                    </div>
                    <div class="icon">
                        <a href="#" class="header-icon" id="next"><img src="images/next.png"></a>
                        <p class="icon-p">Go_Forward</p>
                    </div>
                    <div class="icon"> 
                        <a href="#" class="header-icon" id="refresh"><img src="images/refresh.png"></a>
                        <p class="icon-p">Go_Refresh</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="row smtw-content">
            <div class="col-sm-1 col-md-1 col-lg-1 sidebar colfull ">
                <div class="sidebar-menu">
                    <ul>
                        <li>
                            <div class="sidebar-menu-icon">
                                 <div class="sidebar-menu-icon-title">
                                    <h5><a href="home.html">Home</a></h5>
                                 </div>
                                <div class="sidebar-menu-icon-image">
                                    <a href="home.html"><img src="images/home.png" alt=""></a> 
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="sidebar-menu-icon">
                                 <div class="sidebar-menu-icon-title">
                                    <h5><a href="#">Chart</a></h5>
                                 </div>
                                <div class="sidebar-menu-icon-image">
                                    <a href="#"><img src="images/chart.png" alt=""></a> 
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="sidebar-menu-icon">
                                 <div class="sidebar-menu-icon-title">
                                    <h5><a href="home.html">Logs</a></h5>
                                 </div>
                                <div class="sidebar-menu-icon-image">
                                    <a href="home.html"><img src="images/logs.png" alt=""></a> 
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="sidebar-menu-icon">
                                 <div class="sidebar-menu-icon-title">
                                    <h5><a href="home.html">Help</a></h5>
                                 </div>
                                <div class="sidebar-menu-icon-image">
                                    <a href="home.html"><img src="images/help.png" alt=""></a> 
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="col-sm-11 col-md-11 col-lg-11 content colfull">
                <div class="row content-cpu rowfull">
                    <div class="col-sm-9 col-dm-9 col-lg-9 content-cpu-chart " id="container-cpu">
                        
                    </div>
                    <div class="col-sm-3 col-dm-3 col-lg-3 content-cpu-chart " id="interaction">
                        <tspan style="auto">
                            Interaction with server:<br><br>
                        </tspan>
                        <form method="POST" action="http://192.168.234.128/modules/run_script.php">
                            script name: <br>
                            <input type="text" name="s_name"><br>
                            Comand: <br>
                            <input type="text" name="cmd"><br>
                            <input type="submit" value="Submit"><br><br>
                            </form>
                        <tspan id="svr_status">
                        </tspan>
                    </div>
                </div>
                <div class="row content-ram rowfull">
                    <div class="col-sm-9 col-dm-9 col-lg-9 content-ram-chart" id="container-ram">
                      
                    </div>
                    <div  class="col-sm-3 col-dm-3 col-lg-3 content-ram-chart">
                        <input type="button" class="getlog" value="Start getlog" onclick="runApp("timeout /t 10")" />
                        <tspan id="svr_status1" class="svr-st">
                        </tspan>
                    </div>
                </div>
                <div class="row content-disk rowfull">
                    <div class="col-sm-9 col-dm-9 col-lg-9 content-disk-chart" id="container-disk">
                      
                    </div>
                    <div  class="col-sm-3 col-dm-3 col-lg-3 content-ram-chart">
                        <input type="button" class="getlog" value="Start getlog" onclick="runApp("timeout /t 10")" />
                        <tspan id="svr_status2" class="svr-st" >
                        </tspan>
                    </div>
                </div>
            </div>
        </div>
        <div class="row smtw-footer">
            <p>&copySMTW</p>
        </div>
    </div>
    <script type="text/javascript" src="js/main.js"></script>
    <script type="text/javascript" src="js/chart.js"></script>
</body>
</html>