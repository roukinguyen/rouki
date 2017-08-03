<?php
	$script_name = $_POST["s_name"];
	$cmd = $_POST["cmd"]
	$old_path = getcwd();
	chdir('/home/ngo/Desktop/CPU_log/script_run_by_admin/');
	if is_null($cmd)
		$output = shell_exec('$cmd');
	else
		$output = shell_exec('./script.sh');
	chdir($old_path);
	echo "<pre>$output</pre>";
?>