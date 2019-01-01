$(document).ready(function () {
	var $menuBtn = $("#menu-btn");
  		$menuBtn.on("click", function(e) {
        $menuBtn.toggleClass("open");
        $("#content").toggleClass("is-contracted");
		$("#content-screen").toggleClass("active");
    	// Do something else, like open/close menu
	});
	  
	(function () {
		'use strict';
		if (!('addEventListener' in window)) {
			return;
		}
		var htmlElement = $('html');
		function touchStart () {
			$('html').classList.remove('hover-active');
			htmlElement.removeEventListener('touchstart', touchStart);
		}
		htmlElement.addEventListener('touchstart', touchStart);
	}());
});