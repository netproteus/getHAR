var evt = document.createEvent('Event');
evt.initEvent('getHAR', true, true);
document.dispatchEvent(evt);
