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


window.onload = function() {
    console.log("gooby pls");

    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            if(request.addGraffiti == true) {
                addGraffiti(request);
            } else {
                toggleDrawMode(request);
            }
        });
}
