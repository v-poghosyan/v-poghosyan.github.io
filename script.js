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

});