var backgroundPageConnection = chrome.runtime.connect({
    name: "devtools"
});

backgroundPageConnection.onMessage.addListener(function (message) {
    if (message && message.cmd === 'getHAR') {
        chrome.devtools.network.getHAR(function(har) {
            backgroundPageConnection.postMessage({
                tabId: chrome.devtools.inspectedWindow.tabId,
                har: har
            });            
        })
    }
});

// Relay the tab ID to the background page
backgroundPageConnection.postMessage({
    tabId: chrome.devtools.inspectedWindow.tabId
});
