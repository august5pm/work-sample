/* USED

 Tracking.send_pageView("main");
 Tracking.send_pageView(Tracking.get_pageName() + "_design");

 Tracking.send_event("btn_play" (, "click") );
 Tracking.send_event("btn_play", "pause");

 */

console.log("------------------------- Tracking.js -------------------------");


/* Gooale Analytics */
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-00000000-0', 'auto');

/* Tracking : (Object)*/
window.Tracking = (function (){

    /////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////
    // Function

    //////////////////////////////////////////////////////////////////////////////// to Google
    var _send_pageView_toGoogle = function(page_name){
        console.log("===== tracking_pageView (to Google) = Name : < " + page_name + " >");
        // REF : https://developers.google.com/analytics/devguides/collection/analyticsjs/pages
        ga('send', 'pageview', page_name);
    };

    var _send_event_toGoogle = function(eventCategory, eventAction, eventLabel, eventValue){
        console.log("===== tracking event (to Google) = CODE(category : <" + eventCategory + "> \n/ (Action : " + eventAction +")" + "\n/ (Label : " + eventLabel +")" + "\n/ (Value : " + eventValue +")");
        // REF : https://developers.google.com/analytics/devguides/collection/analyticsjs/events
        // ga('send', 'event', [eventCategory], [eventAction], [eventLabel], [eventValue], [fieldsObject])
        ga('send', {
            hitType: 'event',
            eventCategory: eventCategory,
            eventAction: eventAction,
            eventLabel : eventLabel,
            eventValue : eventValue
        });
    };

    ////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////// send tracking

    var _page_name = "";
    var _element = document.querySelector('meta[property="aof:tracking"]');

    if(_element == undefined || _element == null || _element == ""){ // 트래킹 값이 입력되지 않은 경우, (empty + 페이지이름)
        var path = window.location.pathname;
        var page = path.split("/").pop();
        var page_name = page.split(".html")[0];
        _page_name = "empty_" + page_name;
    }else{
        var _content = _element && _element.getAttribute("content");
        _page_name = _content;
    }

    _page_name = _page_name.toLowerCase();

    // PAGE VIEW
    var _send_pageView = function(page_name)
    {
        // GA
        _send_pageView_toGoogle(page_name)
    };

    // EVENT TRACKING
    var _send_event = function(eventCategory, eventAction, eventLabel, eventValue)
    {
        // GA
        eventAction = eventAction == undefined ? "click" : eventAction;
        var bt_code = window.GlobalVars.bt_code;
        if(bt_code != null) eventLabel = bt_code;
        _send_event_toGoogle(eventCategory, eventAction, eventLabel, eventValue);

        // eventCategory    required        text        Typically the object that was interacted with (e.g. 'Video')
        // eventAction      required        text        The type of interaction (e.g. 'play')
        // eventLabel       optional        text        Useful for categorizing events (e.g. 'Fall Campaign')
        // eventValue       optional        integer     A numeric value associated with the event (e.g. 42)
    };

    // COUNT TRACKING
    var _send_count = function(cont_code){
        var eventAction = "count";
        //_send_event_toGoogle("count_bt_code__" + cont_code, eventAction);
    };

    return {
        send_pageView : _send_pageView,
        send_event : _send_event,
        send_count : _send_count
    }
})();