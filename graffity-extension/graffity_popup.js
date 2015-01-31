var tab_url = "";

function startDrawing() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {mode: "toggleDrawing", drawEnabled: true});
    });
}

function stahpDrawing() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {mode: "toggleDrawing", drawEnabled: false});
    });
}

function startErasing() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {mode: "eraseDrawing"});
    });
}

function saveGraffiti() {
    var graffitiName = document.getElementById("graffiti-name").value;
    if(graffitiName) {
        alert("Save a graffiti with name: " + graffitiName);
    } else {
        alert("Please enter a name for your graffiti before saving.");
    }
}

function loadGraffiti() {
    var req = new XMLHttpRequest();
    var url = "http://127.0.0.1:8000/graffity/get_drawings/";

    req.onreadystatechange = function() {
        if(req.readyState == 4 && req.status == 200) {
            var graffitiArr = JSON.parse(req.responseText);
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                    chrome.tabs.sendMessage(tabs[0].id, {mode: "addGraffiti", graffitiArr: graffitiArr});
                });
        }
    }

    req.open("GET", url, true);
    req.setRequestHeader('req_graffiti_url', tab_url);
    req.send();
}


window.onload = function() {
    document.getElementById("start-drawing-button").onclick = startDrawing;
    document.getElementById("stop-drawing-button").onclick = stahpDrawing;
    document.getElementById("erase-button").onclick = startErasing;
    document.getElementById("save-graffiti-button").onclick = saveGraffiti;
    document.getElementById("load-graffiti-button").onclick = loadGraffiti;

    chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
        function(tabs){
            tab_url = tabs[0].url;
        });

    chrome.runtime.onMessage.addListener(
        function(request, sender, sendRespone) {
            alert("Ready to send picture to server");
        });
};
