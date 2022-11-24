
function pause() {
    const evt = createEvent('pause');
    document.dispatchEvent(evt);
}

function createEvent (name) {
    var evt = document.createEvent('Event')
    evt.initEvent(name)
    return evt
}

/** @deprecated es una chuleta de uso */
function createEventINFO() {
    // Create the event.
    const event = document.createEvent('Event');

    // Define that the event name is 'build'.
    event.initEvent('build', true, true);

    // Listen for the event.
    elem.addEventListener('build', (e) => {
    // e.target matches elem
    }, false);

    // Target can be any Element or other EventTarget.
    elem.dispatchEvent(event);
}
