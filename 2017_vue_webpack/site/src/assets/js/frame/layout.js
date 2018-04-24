var width;
var height;

var scrollTop;
var scrollLeft;

function windowResize(){
    width = window.innerWidth;
    height = window.innerHeight;
}

function setViewport(){
    // viewport set : if tablet
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        var actual_width = screen.width;
        var min_width = 1280;
        var ratio = Math.min(actual_width / min_width);
        if (ratio < 1) {
            document.querySelector('meta[name="viewport"]').setAttribute('content', 'initial-scale=' + ratio + ', maximum-scale=' + ratio + ', minimum-scale=' + ratio + ', user-scalable=yes, width=' + actual_width);
        }else{
            document.querySelector('meta[name="viewport"]').setAttribute('content', 'width=device-width, initial-scale=1, user-scalable=yes');
        }
    }
}

function windowScroll(){

    var top = getScrollTop();
    var left = getScrollLeft();

    if(scrollTop != top){
        scrollTop = top;
        setQuickMenuPos(scrollTop);
    }
    if(scrollTop != left){
        scrollLeft = left;
    }
}

function getScrollTop(){
    var doc = document.documentElement;
    var top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
    return top;
}

function getScrollLeft(){
    var doc = document.documentElement;
    var left = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
    return left;
}

// Quick Menu position (desktop)
function setQuickMenuPos($scrollTop){

    var header = document.querySelector('header');
    if(header == null) return;
    else{
        var top = header.offsetHeight - $scrollTop;
        if(top < 0) top = 0;

        var quick = document.querySelector('.desktop .side-menu-wrap .quick-menu-wrap');
        if(quick == null) quick = document.querySelector('.tablet.ie  .side-menu-wrap .quick-menu-wrap');

        if(quick != null) quick.style.top = top+"px";
        else return;
    }
}

function reset(){
    windowResize();
    windowScroll();
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var domIsReady = (function(domIsReady) {
    var isBrowserIeOrNot = function() {
        return (!document.attachEvent || typeof document.attachEvent === "undefined" ? 'not-ie' : 'ie');
    }

    domIsReady = function(callback) {
        if(callback && typeof callback === 'function'){
            if(isBrowserIeOrNot() !== 'ie') {
                document.addEventListener("DOMContentLoaded", function() {
                    return callback();
                });
            } else {
                document.attachEvent("onreadystatechange", function() {
                    if(document.readyState === "complete") {
                        return callback();
                    }
                });
            }
        } else {
            console.error('The callback is not a function!');
        }
    }

    return domIsReady;
})(domIsReady || {});

(function(document, window, domIsReady, undefined) {
    domIsReady(function() {
        //console.log('My DOM is ready peeps!');

        reset();

        window.onresize = windowResize;
        window.onscroll = windowScroll;

        if(window.GlobalVars.isTablet) {
            setViewport();
            window.addEventListener('orientationchange', function () {
                console.log(window.orientation + " " + screen.width);
                setViewport();
            }, false);
        }
    });
})(document, window, domIsReady);

window.Layout = {reset:reset};