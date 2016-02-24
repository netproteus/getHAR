var backgroundPageConnection = chrome.runtime.connect({
    name: "content"
});

backgroundPageConnection.onMessage.addListener(function (message) {
    if (message && message.har ) {

        var div = document.createElement('div');
        div.style = 'display:none';
        div.id = "har_dump"
        div.innerHTML = JSON.stringify(message.har, undefined, 2);
        document.body.appendChild(div);
    }
});

document.addEventListener('getHAR', function(e){
   backgroundPageConnection.postMessage({'cmd': 'getHAR'});
}, false);
