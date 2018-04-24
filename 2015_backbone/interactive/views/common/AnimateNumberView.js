App.Views.AnimateNumberView = Backbone.View.extend({
    initialize : function(obj){
        this.DEFAULT_TIME = 1000;
        this.DEFAULT_FRAME = 60;
        this.CHANGE_PER_FRAME = 3;

        this.totalframe = 0;
        this.totalCut = this.totalframe / this.CHANGE_PER_FRAME;

        this.targetID = "";
        this.vec_str = "";

        this.target_num = "";
        this.id_elm = "";
        this.isAnimate = false;
        this.comma = 0;

        this.cipher_count = 0;
        this.frame_count = 1;
        this.count = 0;

        this.target_arr = [];
        this.aniCount_arr = [];
        this.point_num = 0;
    },

    /*---------------------------------------------------------------[ static method ]--------------------------------------------------------------------*/
    //**static method : animate(pra...) || parameter : $target_value(목표값) , $start_value(시작값) , $comma(숫자 단위수 : ',') , $msec(애니메이션 시간-millisecond))
    animate : function($id, $target_value , $start_value , $comma , $msec){
        var target_value = $target_value;
        this.targetID = $id;
        this.id_elm = document.getElementById(this.targetID);

        if(target_value === undefined || target_value === ""){

        }else{

            if(target_value != 0){
                this.count = $start_value ? $start_value : 0;

                this.target_num = $target_value ? $target_value : 0;

                this.vec_str = this.target_num > 0 ? "" : "-";

                this.comma = $comma == undefined ? 3 : $comma;

                this.count=0;

                this.frame_count = 1;

                var msec = $msec  == undefined ? this.DEFAULT_TIME : $msec;

                this.totalframe = this.DEFAULT_FRAME * msec / 1000;

                this.totalframe = this.totalframe < 1 ? 1 : this.totalframe;

                var chkPoint_arr = String(Math.abs($target_value)).split(".");

                if(chkPoint_arr.length>1){
                    var point_arr = String(chkPoint_arr[1]).split("");
                    var value = chkPoint_arr.join("");
                    this.point_num = point_arr.length;

                    this.target_arr = String(Math.abs(this.value)).split("").reverse();
                }else {
                    this.point_num = 0;
                    this.target_arr = String(Math.abs($target_value)).split("").reverse();
                }

                this.aniCount_arr = new Array();

                for(var i=0; i<this.target_arr.length; i++) {
                    this.aniCount_arr.push(0);
                }


                this.run_stop();
                this.isAnimate = true;
                this.render();
            }
            else if(target_value == 0)
            {
                this.id_elm.innerHTML = target_value;
            }
        }
    },


    //**static method : resetValue (pra...) || parameter : $target_value(목표값) , $comma(숫자 단위수 : ',')
    resetValue : function($id, $target_value, $comma){
        this.isAnimate = false;
        this.targetID = $id;
        this.id_elm = document.getElementById(this.targetID);
        this.run_stop();
        if(typeof $target_value == 'number') {

            this.target_num = $target_value ? $target_value : 0;
            this.comma = $comma ? $comma : 3;

            this.id_elm.innerHTML = this.commify(this.target_num);

        }else{
            this.id_elm.innerHTML = $target_value;
        }
    },


    /*-----------------------------------------------------------------------------------------------------------------------------------------------*/

    /*---------------------------------------------------------------[ run time ]--------------------------------------------------------------------*/
    //run_stop || remove runtime

    run_stop : function() {
        //alert(this.id_elm.requestId);
        if (this.id_elm.requestId){
            //alert(_this.commify(_this.target_num));
            window.cancelAFrame(this.id_elm.requestId);
        }
    },

    render : function() {
        var _this = App.animateNumberView;
        if(_this.isAnimate) {

            _this.count ++;
            _this.frame_count = _this.frame_count == _this.CHANGE_PER_FRAME ? 1 : _this.frame_count+1;

            _this.cipher_count = Math.floor(_this.quadIn(_this.count,1 ,_this.target_arr.length,_this.totalframe));

            if(_this.count == _this.totalframe) {

                _this.id_elm.innerHTML = _this.commify(_this.target_num);
                //console.log(_this.commify(_this.target_num));
                //alert(_this.commify(_this.target_num));
                _this.run_stop();

            } else if(_this.count > _this.totalframe){
                //alert(_this.commify(_this.target_num));
            }else {

                var ani_num = _this.aniCount_arr.length > 3 ? 3 : _this.aniCount_arr.length;
                if(_this.frame_count == _this.CHANGE_PER_FRAME) {
                    var numArr = new Array();
                    for(var i=0; i<_this.cipher_count; i++) {
                        var n;

                        if( i >= _this.cipher_count - ani_num) {

                            _this.aniCount_arr[i - (_this.cipher_count - ani_num)] = _this.aniCount_arr[i - (_this.cipher_count-ani_num)] == 9 ? 1 : _this.aniCount_arr[i - (_this.cipher_count-ani_num)] + 1;
                            n = _this.aniCount_arr[i - (_this.cipher_count-ani_num)];

                        }else{
                            n = Number(_this.target_arr[i]);

                        }

                        numArr.push(n);
                    }

                    numArr.splice(_this.point_num,0,".");

                    var numStr = _this.vec_str + numArr.reverse().join("");

                    var num = Number(numStr);
                    _this.id_elm.innerHTML =_this.commify(num);
                }

                _this.id_elm.requestId = window.requestAFrame(_this.render);
            }


        } else {
            _this.run_stop();
        }
    },

    /*---------------------------------------------------------------------------------------------------------------------------------------------*/

    /*---------------------------------------------------------------[ easing ]--------------------------------------------------------------------*/
    // easing : cubicIn || prameter : $t(current time), $b(begInnIng value), $c(change In value), $d(duration)
    cubicIn : function($t, $b, $c, $d){
        var tc = ($t /= $d) * $t * $t;
        return $b + $c * (tc);
    },

    // easing : quadIn || prameter : $t(current time), $b(begInnIng value), $c(change In value), $d(duration)
    quadIn : function($t, $b, $c, $d){
        var ts = ($t /= $d) * $t;
        return $b + $c * (ts);
    },

    /*----------------------------------------------------------------------------------------------------------------------------------------------*/

    /*---------------------------------------------------------------[ utility ]--------------------------------------------------------------------*/
    //comma : $number(자릿수를 붙혀질 숫자)
    commify : function($number) {
        var reg;

        if(this.comma!=undefined){
            switch(this.comma) {
                case  0 :
                    reg= /(^[+-]?\d+)(\d{})/;
                    break;

                case  1 :
                    reg= /(^[+-]?\d+)(\d{1})/;
                    break;

                case  2 :
                    reg= /(^[+-]?\d+)(\d{2})/;
                    break;

                case  3 :
                    reg= /(^[+-]?\d+)(\d{3})/;
                    break;

                case  4 :
                    reg= /(^[+-]?\d+)(\d{4})/;
                    break;

                case  5 :
                    reg= /(^[+-]?\d+)(\d{5})/;
                    break;

                default :
                    reg= /(^[+-]?\d+)(\d{})/;
                    break;
            }
        }else{
            reg= /(^[+-]?\d+)(\d{3})/;
        }

        $number += '';                          // to String

        while (reg.test($number))
            $number = $number.replace(reg, '$1' + ',' + '$2');

        return $number;
    }
});

// handle multiple browsers for requestAnimationFrame()
window.requestAFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        // if all else fails, use setTimeout
        function (callback) {
            return window.setTimeout(callback, 1000 / 60);
            // shoot for 60 fps
        };
})();

// handle multiple browsers for cancelAnimationFrame()
window.cancelAFrame = (function () {
    return window.cancelAnimationFrame ||
        window.webkitCancelAnimationFrame ||
        window.mozCancelAnimationFrame ||
        window.oCancelAnimationFrame ||
        function (id) {
            window.clearTimeout(id);
        };
})();