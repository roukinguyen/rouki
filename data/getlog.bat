@echo off
SET /A i = 1
:loop
echo listening for cpuJson.json...

cscript getCPU_Load.vbs > cpuJsonTMP.json
more +2 cpuJsonTMP.json > cpuJson.json
del cpuJsonTMP.json

cscript getMemory_Usage.vbs > MemoryJsonTMP.json
more +2 MemoryJsonTMP.json > MemoryJson.json
del MemoryJsonTMP.json

cscript getDisk_Usage.vbs > DiskJsonTMP.json
more +2 DiskJsonTMP.json > DiskJson.json
del DiskJsonTMP.json


timeout /t 1
goto loop