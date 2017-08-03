Set oX = CreateObject("Microsoft.XmlHTTP")
oX.Open "GET", "http://192.168.249.220/data/cpuUsageTmp.json", False
oX.Send ""
WScript.Echo oX.responseText