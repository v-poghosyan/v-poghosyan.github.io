$(document).ready(function () {
	var $menuBtn = $("#menu-btn");
  		$menuBtn.on("click", function(e) {
        $menuBtn.toggleClass("open");
        $("#content").toggleClass("is-contracted");
		$("#content-screen").toggleClass("active");
    	// Do something else, like open/close menu
  	});
});