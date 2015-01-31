var readyToDraw;

function toggleDrawMode(request) {
    var drawEnabled = request.drawEnabled;
    if(drawEnabled) {
        readyToDraw = true;
        document.getElementById('graffity_canvas').style.zIndex = 1000;
    } else {
        readyToDraw = false;
        document.getElementById('graffity_canvas').style.zIndex = 0;
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
    console.log("Time to initialize the canvas: create, expand, make transparent")

    readyToDraw = false;

    var canvas_node = document.createElement('canvas');
    canvas_node.id = 'graffity_canvas';
    canvas_node.style.position = 'fixed';
    canvas_node.style.width = "100%";
    canvas_node.style.height = "100%";
    canvas_node.style.margin = 0;
    canvas_node.style.zIndex = 0;

    var html_node = document.getElementsByTagName("html")[0];
    html_node.insertBefore(canvas_node, html_node.firstChild);

    var drawingCanvas = document.getElementById('graffity_canvas');
    var ctx = drawingCanvas.getContext('2d');
    ctx.canvas.width = screen.availWidth;
    ctx.canvas.height = screen.availHeight;
    //ctx.fillStyle = "blue";
    //ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);


    drawingCanvas.addEventListener("mousemove", function(e) {
        console.log("mousemove");
    }, false);

    drawingCanvas.addEventListener("mousedown", function(e) {
        console.log("mousedown");
    }, false);

    drawingCanvas.addEventListener("mouseup", function(e) {
        console.log("mouseup");
    }, false);
}


window.onload = function() {
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
