$(document).ready(function () {
	var $menuBtn = $("#menu-btn");
  		$menuBtn.on("click", function(e) {
        $menuBtn.toggleClass("open");
        $("#content").toggleClass("is-contracted");
		$("#content-screen").toggleClass("active");
    	// Do something else, like open/close menu
	});
	
	// Removes hover effects for touchscreens and adds active effects instead
	(function () {
		'use strict';
		if (!('addEventListener' in window)) {
			return;
		}
		var htmlElement = document.querySelector('html');
		function touchStart () {
			document.querySelector('html').classList.remove('hover-active');
			document.querySelector('html').classList.add('active-active');
			htmlElement.removeEventListener('touchstart', touchStart);
		}
		htmlElement.addEventListener('touchstart', touchStart);
	}());

	// Adds active effects for touchscreens

});