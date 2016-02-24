var connections = {};
chrome.runtime.onConnect.addListener(function(connection) {

    var listener;
    if (connection.name === 'devtools') {
        listener = function(message, sender, sendResponse) {
            var con = connections[message.tabId] = (connections[message.tabId] || {});
            con.devtools = connection;
            listener.close = function() {
                delete con.devtools;
            }

            if (con.content && message.har) {
                con.content.postMessage(message);
            }
        }
    }
    else if (connection.name === 'content') {
        listener = function(message, port, sendResponse) {
            var con = connections[port.sender.tab.id] = (connections[port.sender.tab.id] || {});
            con.content = connection;
            listener.close = function() {
                delete con.content;
            }

            if (con.devtools && message.cmd === 'getHAR') {
                con.devtools.postMessage(message);
            }
        }
    }
    // add the listener
    connection.onMessage.addListener(listener);

    connection.onDisconnect.addListener(function() {
        if (listener.close) {
            listener.close();
        }
        connection.onMessage.removeListener(listener);
    });

});
