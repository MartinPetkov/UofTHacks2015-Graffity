var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var readyToDraw;
var paint;

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

function addClick(x, y, dragging) {
    clickX.push(x);
    clickY.push(y);
    clickDrag.push(dragging);
}

function redraw() {
    var ctx = document.getElementById('graffity_canvas').getContext('2d');

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.strokeStyle = "#df4b26";
    ctx.lineJoin = "round";
    ctx.lineWidth = 5;

    for(var i=0; i < clickX.length; i++) {
        ctx.beginPath();
        if(clickDrag[i] && i) {
            ctx.moveTo(clickX[i-1], clickY[i-1]);
        } else {
            ctx.moveTo(clickX[i] - 1, clickY[i] - 1);
        }

        ctx.lineTo(clickX[i], clickY[i]);
        ctx.closePath();
        ctx.stroke();
    }
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


    drawingCanvas.addEventListener("mousedown", function(e) {
        var mouseX = e.pageX - this.offsetLeft;
        var mouseY = e.pageY - this.offsetTop;

        paint = true;
        addClick(mouseX, mouseY);
        redraw();

    }, false);


    drawingCanvas.addEventListener("mousemove", function(e) {
        if(paint) {
            addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
            redraw();
        }

    }, false);


    drawingCanvas.addEventListener("mouseup", function(e) {
        paint = false;
    }, false);


    drawingCanvas.addEventListener("mouseleave", function(e) {
        paint = false;
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
