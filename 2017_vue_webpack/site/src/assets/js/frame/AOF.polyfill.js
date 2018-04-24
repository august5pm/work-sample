// focusin focusout support for firefox
// ref - https://gist.github.com/nuxodin/9250e56a3ce6c0446efa
!function(){
    var w = window,
        d = w.document;

    if (w.onfocusin === undefined) {
        d.addEventListener('focus'    ,addPolyfill    ,true);
        d.addEventListener('blur'     ,addPolyfill    ,true);
        d.addEventListener('focusin'  ,removePolyfill ,true);
        d.addEventListener('focusout' ,removePolyfill ,true);
    }
    function addPolyfill(e){
        var type = e.type === 'focus' ? 'focusin' : 'focusout';
        var event = new CustomEvent(type, {bubbles:true, cancelable:false});
        event.c1Generated = true;
        e.target.dispatchEvent(event);
    }
    function removePolyfill(e){
        if (!e.c1Generated) { // focus after focusin, so chrome will the first time trigger tow times focusin
            d.removeEventListener('focus'    ,addPolyfill    ,true);
            d.removeEventListener('blur'     ,addPolyfill    ,true);
            d.removeEventListener('focusin'  ,removePolyfill ,true);
            d.removeEventListener('focusout' ,removePolyfill ,true);
        }
        setTimeout(function(){
            d.removeEventListener('focusin'  ,removePolyfill ,true);
            d.removeEventListener('focusout' ,removePolyfill ,true);
        });
    }
}();





//requestAnimationFrame
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
            || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());



//transitionEnd
(function(){
    function transitionEndEventName() {
        var i,
            el = document.createElement('fakeelement'),
            transitions = {
                'transition':'transitionend',
                'OTransition':'otransitionend',  // oTransitionEnd in very old Opera
                'MozTransition':'transitionend',
                'WebkitTransition':'webkitTransitionEnd'
            };

        for (i in transitions) {
            if (transitions.hasOwnProperty(i) && el.style[i] !== undefined) {
                return transitions[i];
            }
        }
    }
    window.transitionEnd = transitionEndEventName();
})();

//animation
(function(){
    function animationEndEventName() {
        var t,
            el = document.createElement("fakeelement");

        var animations = {
            "animation"      : "animationend",
            "OAnimation"     : "oAnimationEnd",
            "MozAnimation"   : "animationend",
            "WebkitAnimation": "webkitAnimationEnd"
        }

        for (t in animations){
            if (el.style[t] !== undefined){
                return animations[t];
            }
        }
    }
    window.animationEnd = animationEndEventName();
})();