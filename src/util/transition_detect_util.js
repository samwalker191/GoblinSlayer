// code credit goes to David Walsh @ https://davidwalsh.name/css-animation-callback

const whichTransitionEvent = () => {
    let t;
    let el = document.createElement('fakeelement');
    let transitions = {
        'transition': 'transitionend',
        'OTransition': 'oTransitionEnd',
        'MozTransition': 'transitionend',
        'WebkitTransition': 'webkitTransitionEnd'
    }

    for (i in transitions) {
        if (el.style[i] !== undefined) {
            return transitions[i];
        }
    }
}

module.exports = whichTransitionEvent;