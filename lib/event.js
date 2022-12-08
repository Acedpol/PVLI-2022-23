
function pause() {
    toggleAsk();
    const evt = createEvent('pause');
    document.dispatchEvent(evt);
}

function options() {
    toggleAsk();
    const evt = createEvent('options');
    document.dispatchEvent(evt);
}

function toggleAsk() {
    if (document.getElementById('ask').classList.contains('ask2')) {
        document.getElementById('ask').classList.remove('ask2');
        document.getElementById('ask-ico').classList = 'fa fa-question-circle';
        document.getElementById('ask-ico').style.fontSize = '4vh';
    }
    else {
        document.getElementById('ask').classList.add('ask2');
        document.getElementById('ask-ico').classList = 'fa fa-times';
        document.getElementById('ask-ico').style.fontSize = '4vh';
    }
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
