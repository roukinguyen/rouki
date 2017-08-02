<!DOCTYPE html>
<html>
<head>
	<title>Rouki Nguyen</title>
	<meta charset="utf-8">
	<link rel="stylesheet" type="text/css" href="main.css">
</head>
<body style="background: green">
<?php
$dir = "log";
$sdir = scandir($dir);
$k = count($sdir)-1;
for($i=$k;$i>=$k-2;$i--){
$file = fopen("log/".$sdir[$i], "r") or exit("Unable to open file!");
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
?>

//<script>setTimeout(function(){
//   window.location.reload(1);
//}, 5000); </script>	
</body>
</html>
