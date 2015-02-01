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
        chrome.tabs.sendMessage(tabs[0].id, {   mode: "eraseDrawing"});
    });
}

function saveGraffiti() {
    var graffitiName = document.getElementById("graffiti-name").value;
    if(graffitiName) {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {mode: "saveDrawing"}, function(response) {
                    sendToServer(graffitiName, response.graffitiToSave);
                });
        });
    } else {
        alert("Please enter a name for your graffiti before saving.");
    }
}

function sendToServer(graffitiName, graffitiToSave) {
    var req = new XMLHttpRequest();
    var url = "http://127.0.0.1:8000/graffity/upload_drawing/";
    req.open("POST", url, true);
    req.setRequestHeader('req_graffiti_url', tab_url);
    req.setRequestHeader('req_graffiti_name', graffitiName);
    req.setRequestHeader('req_drawing_image', graffitiToSave);

    req.onreadystatechange = function() {
        if(req.readyState == 4 && req.status == 200) {
            alert("Successfully saved");
        } else {
            alert("Failed to save graffiti");
        }
    }

    req.send();
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

};
