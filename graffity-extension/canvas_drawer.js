function toggleDrawMode(request) {
    var drawEnabled = request.drawEnabled;
    if(drawEnabled == true) {
        alert("Ready to draw");
    } else {
        alert("Not ready to draw");
    }
}

function addGraffiti(request) {
    var graffitiArr = request.graffitiArr;
    alert("Add the new graffiti: " + graffitiArr);
}

function startErasing() {
    alert("Start erasing");
}

function initializeCanvas() {
    console.log("Time to initialize the canvas: create, expand, make transparent, push to bottom to prevent drawing")
}


window.onload = function() {
    console.log("gooby pls");

    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            if(request.mode == "addGraffiti") {
                addGraffiti(request);
            } else if(request.mode == "toggleDrawing") {
                toggleDrawMode(request);
            } else if(request.mode == "eraseDrawing") {
                startErasing();
            }
        });

    initializeCanvas();
}
