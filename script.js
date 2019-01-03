$(document).ready(function () {

	var menuBtn = $("#menu-btn-label");

	// Opens menu on button click
	menuBtn.on("click", function(e) {
        menuBtn.toggleClass("open");
        $("#content").toggleClass("is-contracted");
		$("#content-screen").toggleClass("active");
    	// Do something else, like open/close menu
	});

	// Closes menu when clicked anywhere outside
	var contentScreen = $("#content-screen");
	var content = $("#content");

	contentScreen.on("click", function(e) {
        contentScreen.toggleClass("active");
        content.toggleClass("is-contracted");
		menuBtn.toggleClass("open")
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
			document.querySelector('html').classList.remove('hover-active'); // Remove hover effects
			htmlElement.removeEventListener('touchstart', touchStart);
		}
		htmlElement.addEventListener('touchstart', touchStart);
	}());

	// Adds checked effects for touchscreens
	

});