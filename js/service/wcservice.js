/**
 * Created by Yunjoy on 2015/6/20.
 */
app.service('wc', ['$http', '$state','$rootScope',function ($http, $state,$rootScope) {
        //alert("构建WCservice");
        var _appId;
        // var _openId;
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("get", "http://wx.yoopoon.com/api/JsApi/GetJsSetting?portalId=2", false);
        //xmlhttp.withCredentials = true;
        xmlhttp.send();
        var data = angular.fromJson(xmlhttp.response);
        if (data) {
            _appId = data.appId;
            wx.config({
                debug: false,
                appId: data.appId,
                timestamp: data.timestamp,
                nonceStr: data.nonceStr,
                signature: data.signature,
                jsApiList: ["onMenuShareTimeline",
                    "onMenuShareAppMessage",
                    "onMenuShareQQ",
                    "onMenuShareWeibo",
                    "startRecord",
                    "stopRecord",
                    "onVoiceRecordEnd",
                    "playVoice",
                    "pauseVoice",
                    "stopVoice",
                    "onVoicePlayEnd",
                    "uploadVoice",
                    "downloadVoice",
                    "chooseImage",
                    "previewImage",
                    "uploadImage",
                    "downloadImage",
                    "translateVoice",
                    "getNetworkType",
                    "openLocation",
                    "getLocation",
                    "hideOptionMenu",
                    "showOptionMenu",
                    "hideMenuItems",
                    "showMenuItems",
                    "hideAllNonBaseMenuItem",
                    "showAllNonBaseMenuItem",
                    "closeWindow",
                    "scanQRCode",
                    "chooseWXPay",
                    "openProductSpecificView",
                    "addCard",
                    "chooseCard",
                    "openCard"]
            });
            wx.ready(function(){
                //wx.hideAllNonBaseMenuItem();
                //alert("看看是否hide了");
                wx.showMenuItems({
                    menuList: ['menuItem:refresh','menuItem:nightMode'] // 要显示的菜单项，所有menu项见附录3
                });
                wx.onMenuShareTimeline({
                    title: '优客惠', // 分享标题
                    link: SETTING.BaseUrl, // 分享链接
                    imgUrl: SETTING.BaseUrl+'/wx/app/common/static/images/dahuofang.png', // 分享图标
                    success: function () {
                        alert("恭喜您分享成功！");
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });
                wx.onMenuShareAppMessage({
                    title: '优客惠', // 分享标题
                    desc: '优客惠', // 分享描述
                    link: SETTING.BaseUrl, // 分享链接
                    imgUrl:  SETTING.BaseUrl+'/wx/app/common/static/images/dahuofang.png', // 分享图标
                    type: '', // 分享类型,music、video或link，不填默认为link
                    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                    success: function () {
                        alert("恭喜您分享成功!");
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });
                wx.onMenuShareQQ({
                    title: '优客惠', // 分享标题
                    desc: '优客惠', // 分享描述
                    link: SETTING.BaseUrl, // 分享链接
                    imgUrl:  SETTING.BaseUrl+'/wx/app/common/static/images/dahuofang.png', // 分享图标
                    success: function () {
                        // 用户确认分享后执行的回调函数
                        alert("恭喜您分享成功!");
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });
                wx.onMenuShareWeibo({
                    title: '优客惠', // 分享标题
                    desc: '优客惠', // 分享描述
                    link: SETTING.BaseUrl, // 分享链接
                    imgUrl:  SETTING.BaseUrl+'/wx/app/common/static/images/dahuofang.png', // 分享图标
                    success: function () {
                        // 用户确认分享后执行的回调函数
                        alert("恭喜您分享成功!");
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });
                wx.getNetworkType({
                    success: function (res) {
                        $rootScope.networkType = res.networkType; // 返回网络类型2g，3g，4g，wifi
                    }
                });
            });
        }
        初始化service
         this.initWC = function () {
             if(!_appId) {
                 _appId = this.getQueryStringByName("appId");
            }
           this.getOpenId();
        };
        this.getOpenId = function () {
            if(_openId)
                return _openId;
            var id = this.getQueryStringByName("openid");
            if(!id){
                id = localStorage.getItem("openId");
                if(!id) {
                    window.location.href = "redirect.html";
                    return;
                }
            }
            localStorage.setItem("openId", id);
            _openId = id;
            return _openId;
        };
        this.getQueryStringByName = function (name) {
            var result = location.search == "" ? undefined : location.search.split('?')[1].split('&');
            if (!result)
                return "";
            var arry = [];
            for (var i = 0; i < result.length; i++) {
                var keyValue = result[i].split("=");
                arry[keyValue[0]] = keyValue[1];
            }
            return arry[name];
        };
        //alert("构建WCservice完成");
    }]
)
;