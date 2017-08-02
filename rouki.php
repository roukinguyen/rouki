<!DOCTYPE html>
<html>
	<head>
		<title>Rouki Nguyen</title>
		<meta charset="utf-8">
		<link rel="stylesheet" type="text/css" href="css/main.css">
	</head>
	<body>
		<div class="container">
			<div class="log">
				<div class="log-title">
					<h1>Server Logs</h1>
				</div>
				<div class="log-content">
					<?php
					function scanfolder($dir){
						$sdir = scandir($dir);
						return $sdir;
					}
					function countfile($sdir){
						$countvalue = count($sdir);
						return $countvalue;
					}
					function getlog($sdir,$countvalue){
						$k = $countvalue-1;
						for($i=$k;$i>=$k-2;$i--){
							$file =fopen("log/".$sdir[$i],"r") or exit("not Open File");
							while(!feof($file))
							{
								$line = fgets($file). "<br>";
								$xfire = strpos($line,"Firewall");
								$yfire = strpos($line,"SRC");
								$fireP = substr($line,$xfire,$yfire);
								$xsrc = strpos($line,"SRC");
								$srcP =  substr($line,$xsrc,40);
								$dateP = substr($line,0,16);
								echo $dateP.$fireP.$srcP."<br/>";
								echo "<br/>";
							}
							fclose($file);
						}
					}
					$a = "log";
					$count;
					$f = scanfolder($a);
					$count = countfile($f);
					echo getlog($f,$count);
					?>
				</div>
			</div>
			<div class="info-ubuntu">
				<div class="info-ubuntu-title">
					<h1>Ubuntu Infomation</h1>
				</div>
				<div class="info-ubuntu-content">
					
				</div>
			</div>
		</div>
		<script>
			setTimeout(function(){
				window.location.reload();
			},5000);
		</script>
	</body>
</html>
