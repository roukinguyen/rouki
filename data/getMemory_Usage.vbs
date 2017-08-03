Set oX = CreateObject("Microsoft.XmlHTTP")
oX.Open "GET", "http://192.168.249.220/data/MemoryUsageTmp.json", False
oX.Send ""
WScript.Echo oX.responseText