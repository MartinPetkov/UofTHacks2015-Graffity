var tab_url = "";

function startDrawing() {
    alert("Start Drawing button was clicked");
}

function stahpDrawing() {
    alert("Stop Drawing button was clicked");
}

function saveGraffiti() {
    var graffitiName = document.getElementById("graffiti-name").value;
    alert("Save Graffiti with name: " + graffitiName);
}

function loadGraffiti() {
    var req = new XMLHttpRequest();
    var url = "http://127.0.0.1:8000/graffity/get_drawings/";

    req.onreadystatechange = function() {
        if(req.readyState == 4 && req.status == 200) {
            var graffitiArr = JSON.parse(req.responseText);
            alert(graffitiArr);
        }
    }

    req.open("GET", url, true);
    req.setRequestHeader('req_graffiti_url', tab_url);
    req.send();

}


window.onload = function() {
    document.getElementById("start-drawing-button").onclick = startDrawing;
    document.getElementById("stop-drawing-button").onclick = stahpDrawing;
    document.getElementById("save-graffiti-button").onclick = saveGraffiti;
    document.getElementById("load-graffiti-button").onclick = loadGraffiti;

    chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
        function(tabs){
            tab_url = tabs[0].url;
        }
    );
};
