// Author: Mickaël Canouil
// Version: <1.0.0>
// Description: Change image and iframe src/class depending on body class (quarto-light or quarto-dark)
// License: MIT
// Note: This version is modified by Vahram Poghosyan with a timeOut call

function updateSources() {
    var bodyClass = window.document.body.classList;
    var isDark = bodyClass.contains('quarto-dark');
    
    // Handle images
    var images = window.document.getElementsByTagName('img');
    for (var i = 0; i < images.length; i++) {
        var element = images[i];
        var src = element.src;
        var newSrc = src;
        if (bodyClass.contains('quarto-light') && src.includes('.dark')) {
            newSrc = src.replace('.dark', '.light');
        } else if (bodyClass.contains('quarto-dark') && src.includes('.light')) {
            newSrc = src.replace('.light', '.dark');
        }
        if (newSrc !== src) {
            element.src = newSrc;
        }
    }

    // Handle iframes
    var iframes = window.document.getElementsByTagName('iframe');
    for (var i = 0; i < iframes.length; i++) {
        var iframe = iframes[i];
        // Update classes
        if (isDark) {
            iframe.classList.remove('quarto-light');
            iframe.classList.add('quarto-dark');
        } else {
            iframe.classList.remove('quarto-dark');
            iframe.classList.add('quarto-light');
        }
        // Update src if needed
        var src = iframe.src;
        var newSrc = src;
        if (bodyClass.contains('quarto-light') && src.includes('.dark')) {
            newSrc = src.replace('.dark', '.light');
        } else if (bodyClass.contains('quarto-dark') && src.includes('.light')) {
            newSrc = src.replace('.light', '.dark');
        }
        if (newSrc !== src) {
            iframe.src = newSrc;
        }
    }
}

var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
            setTimeout(function () {
                updateSources();
            }, 1); // Adjust the delay (in milliseconds) as needed
        }
    });
});

// Observe the body element for class changes
observer.observe(window.document.body, {
    attributes: true
});

// Run initial update
updateSources();