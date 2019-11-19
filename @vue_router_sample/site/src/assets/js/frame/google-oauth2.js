window.oauth2 = (function () {
    var auth2 = {}
    var isLogin = false;
    function _init(element, input){
        gapi.load('auth2', _onGAPI_loaded(element, input));
    }

    function _onGAPI_loaded(element, input){
        auth2 = gapi.auth2.init({
            client_id: '',
            cookiepolicy: 'single_host_origin',
            // Request scopes in addition to 'profile' and 'email'
            scope: 'profile email https://www.googleapis.com/auth/youtube.readonly'
        });

        _attachSignin(element, input)
    }

    function _attachSignin(element, input) {
        isLogin = false;
        auth2.attachClickHandler(element, {},
            function(googleUser) {
                var access_token = googleUser.getAuthResponse().access_token;
                var data = {'access_token':access_token};
                _getYoutubeData(data, input);
            }, function(error) {
                //alert(JSON.stringify(error, undefined, 2));
        });

    }

    function _getYoutubeData(data, input){
        $.ajax({
            url:"",
            type:'GET',
            data: data,
            async: false,
            success:function(data){
                //console.log('CHANNEL_INFO : ', data.channel_info);
                input.value = data.channel_info.url;
                input.title = data.channel_info.youtube_channel_title;
                isLogin = true;
            },
            error:function(jqXHR, textStatus, errorThrown){
                alert(textStatus + " : " + errorThrown);
                self.close();
            }
        });
    }

    function _logout(){
        if(isLogin){
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut()
        }
    }

    window.onload = function(){
        //_init();
    }

    return{
        'init': _init,
        'attachSignin' : _attachSignin,
        'logout' : _logout
    }
})();
