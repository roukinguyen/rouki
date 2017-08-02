#!/bin/bash

ADDRESS="127.0.0.1"
while getopts a: option
do
 case "${option}"
 in
 a) ADDRESS=${OPTARG};;
 esac
done
while true; do
	if read -r -t 1; 
	then	
		break;
	fi	
	wget $ADDRESS/data/cpuUsageTmp.json
	mv cpuUsageTmp.json cpuUsage.json
	wget $ADDRESS/data/diskUsageTmp.json
	mv diskUsageTmp.json diskUsage.json
	wget $ADDRESS/data/MemoryUsageTmp.json
	mv MemoryUsageTmp.json MemoryUsage.json
	sleep 1
done
