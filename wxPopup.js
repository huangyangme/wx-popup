/**
 * 针对微信内操作会被微信屏蔽（如支付，下载，App Store跳转等），提示用户在系统浏览器中打开
 * by huangyang@my.com
 * https://github.com/huangyangme/wxPopup
 * 
 * Use: wxPopup.listen(selector);
 */

;(function() {

    var is_weixin = function() {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            return true;
        } else {
            return false;
        }
    };

    var popup = document.createElement('div');
    popup.setAttribute('style', 'display:none;');
    popup.innerHTML = '<p style="margin: .5em;font-size: 1em;">请使用浏览器打开<img width="30" src="arrow.svg" alt="arrow"></p>';
    document.body.appendChild(popup);

    function showPopup(e) {
        e.addEventListener('click', function(event) {
            if (is_weixin()) {
                event.preventDefault();
                popup.setAttribute('style', 'position:absolute;top:0;left:0;width:100%;height:100%;z-index:10000;box-sizing:border-box;-webkit-transform: translate3d(0, 0, 0);transform: translate3d(0, 0, 0); text-align:right;color:#272636;background-color:rgba(255,255,255,.7)');
            } else {
                return false;
            }
        });
    }

    popup.addEventListener('click', function() {
        popup.setAttribute('style', 'display:none;');
    });


    var api = {
        listen: function listen(elem) {
            if (typeof elem === 'string') {
                var elems = document.querySelectorAll(elem),
                    i = elems.length;
                while (i--) {
                    listen(elems[i]);
                }
                return;
            }
            showPopup(elem);

            return this;
        }
    };

    this.wxPopup = api;

})();
