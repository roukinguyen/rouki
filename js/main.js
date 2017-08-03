
// icon

window.onload = function(){ 
    var refresh = document.getElementById("refresh");
    var back    = document.getElementById("back");
    var next    = document.getElementById("next");
	
    function go_back(){
    	 window.history.back();
    	alert("Ok");
    }

    function go_next(){
    	window.history.forward();
    	alert("Ok");
    }

	function refreshPage()
        {
            window.location.reload(); 
            alert("OK");

        }

	back.onclick = function(){
		go_back();
	}
	next.onclick = function(){
		go_next();
	}
	refresh.onclick = function(){
		refreshPage();
	}
//    var x = $('.content').height();
//    $('.sidebar').height(x);
};

   

   