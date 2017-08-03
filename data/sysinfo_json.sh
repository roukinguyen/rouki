#!/bin/bash

#ADDRESS="127.0.0.1"
#PORT=9999
#while getopts a:p: option
#do
# case "${option}"
# in
# a) ADDRESS=${OPTARG};;
# p) PORT=${OPTARG};;
# esac
#done
#echo -en "Sending log to $ADDRESS:$PORT... \r\nPress any key to exit!\r\n"
PREV_TOTAL=0
PREV_IDLE=0
truncate -s 0 cpuUsageJson.json
while true; do
  CPU=(`cat /proc/stat | grep '^cpu '`) # Get the total CPU statistics.
  unset CPU[0]                          # Discard the "cpu" prefix.
  IDLE=${CPU[4]}                        # Get the idle CPU time.
  TIME=$(date +%Y,%m,%d,%H,%M,%S)	# Get time and date
  # Calculate the total CPU time.
  TOTAL=0

  for VALUE in "${CPU[@]:0:4}"; do
    let "TOTAL=$TOTAL+$VALUE"
  done

  # Calculate the CPU usage since we last checked.
  let "DIFF_IDLE=$IDLE-$PREV_IDLE"
  let "DIFF_TOTAL=$TOTAL-$PREV_TOTAL"
  let "DIFF_USAGE=(1000*($DIFF_TOTAL-$DIFF_IDLE)/$DIFF_TOTAL+5)/10"
  ###########
  echo -en "[[Date.UTC($TIME),$DIFF_USAGE]]" > /var/www/html/data/cpuUsageTmp.json
  MEM_LOAD=$(free -m | awk 'NR==2{printf "%.2f", $3*100/$2 }')  
  echo -en "[[Date.UTC($TIME),$MEM_LOAD]]" > /var/www/html/data/MemoryUsageTmp.json
  DISKUSAGE=$(df -h | awk '$NF=="/"{printf "%.2f", $5}')
  echo -en "[[Date.UTC($TIME),$DISKUSAGE]]" > /var/www/html/data/diskUsageTmp.json
  #
  # Remember the total and idle CPU times for the next check.
  PREV_TOTAL="$TOTAL"
  PREV_IDLE="$IDLE"
  #trigger stop: press Enter to stop or wait 10 seconds
  if read -r -t 1; 
  then
        break;
  fi
  # Wait before checking again.
  #sleep 5
done
#rm cpuUsageJson.json
