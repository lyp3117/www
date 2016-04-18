var httpimguri="";
app.controller('TabMeCtrl', ['$scope','$http','$state','AuthService','orderService','$ionicSlideBoxDelegate','$ionicModal','$stateParams',function($scope,$http,$state,AuthService,orderService,$ionicSlideBoxDelegate,$ionicModal,$stateParams) {
    //获取当前用户信息
    $scope.currentuser= AuthService.CurrentUser();
    //if( $scope.currentuser==undefined ||  $scope.currentuser=="")
    //{
    //    $state.go("page.login");//调到登录页面
    //}
    $scope.model = {
        activeIndex: 0
    };
    var getWaitRec = function(){
        $scope.condition = {
            Addusers: $scope.currentuser.UserId
        };

        $http.get(SETTING.ApiUrl+'/ServiceOrder/Get',{params:$scope.condition,'withCredentials':true})
            .success(function(data) {
                $scope.TotalCount = 0;
                $scope.totaling=0;
                console.log(data.List);
                for(var i=0;i<data.List.length;i++)
                {
                    if(data.List[i].Status==0)
                    {
                        $scope.TotalCount++;
                        continue;
                    }
                    if(data.List[i].Status==1)
                    {
                        $scope.totaling++;
                        continue;
                    }
                }
          //     alert($scope.totaling);

            });
    };
    getWaitRec();
    $scope.pageClick = function (index) {
        //alert(index);
        //alert($scope.delegateHandler.currentIndex());
        $scope.model.activeIndex = 2;
    };

    $scope.slideHasChanged = function ($index) {
        //alert($index);
        //alert($scope.model.activeIndex);
    };
    $scope.delegateHandler = $ionicSlideBoxDelegate;

    $scope.go = function (state) {
        window.location.href = state;
    };
    //我的订单
    $scope.tabIndex = 1;
    $scope.getOrderList = function (tabIndex) {
        $scope.tabIndex = tabIndex;
    };
    function tab() {
        //待付款
        if ($stateParams.tabIndex == 1) {
            $scope.tabIndex = 1;
            //$scope.serchCondition={
            //    Status:'1',
            //    CustomerName: $scope.currentuser.UserName
            //}
            //$scope.myOrder = orderService.getOrderList($scope.searchCondition)
        }
        //待发货
        if ($stateParams.tabIndex == 2) {
            $scope.tabIndex = 2;
            //$scope.serchCondition={
            //    CustomerName: $scope.currentuser.UserName,
            //    Status:'2'
            //}
            //$scope.myOrder = orderService.getOrderList($scope.searchCondition);
        }
        //待收货
        if ($stateParams.tabIndex == 3) {
            $scope.tabIndex = 3;
            //$scope.serchCondition={
            //    CustomerName: $scope.currentuser.UserName,
            //    Status:'3'
            //}
            //$scope.myOrder = orderService.getOrderList($scope.searchCondition);
        }
        //待评价
        if ($stateParams.tabIndex == 4) {
            $scope.tabIndex = 4;
        }
    }
    tab();
    //获取订单状态个数
    //根据订单状态查找订单
    $scope.searchCondition=
    {
        statusId:1,
        Status:""
    };
    $scope.orderNum=
    {
        waitNum:0,//代付款数目
        deliverNum:0,//代发货数目
        takeNum:0,//待收货
        evaluateNum:0//待评价
    };
    $scope.getOrderStatusNum=function()
    {
        $scope.searchCondition.Status="";
        //alert($scope.tabIndex);
        $http.get(SETTING.ApiUrl +"/CommunityOrder/Get",{
            params:$scope.searchCondition,
            'withCredentials':true}).
            success(function(data){
for(var i=0;i<data.List.length;i++)
{
if(data.List[i].Status==0)
{
    $scope.orderNum.waitNum++;
    continue;
}
    if(data.List[i].Status==1)
    {
        $scope.orderNum.deliverNum++;
        continue;
    }
    if(data.List[i].Status==2)
    {
        $scope.orderNum.takeNum++;
        continue;
    }
    if(data.List[i].Status==3)
    {
        $scope.orderNum.evaluateNum++;
        continue;
    }
}
            });
    };
    $scope.getOrderStatusNum();
    //个人资料修改
    //$scope.imgUrl = SETTING.ImgUrl;
    //$scope.oldMem = {
    //    Realname: '',
    //    UserName:'',
    //    Gender: '',
    //    IdentityNo: '',
    //    Icq: '',
    //    Phone: '',
    //    Thumbnail: null,
    //    PostNo: '',
    //    AccountNumber: '',
    //    Points: '',
    //    Level: '',
    //    AddTime: '',
    //    UpdUser: '',
    //    UpdTime: ''
    //};

    $http.get(SETTING.ApiUrl+'/Member/Get?userId='+$scope.currentuser.UserId,{'withCredentials':true})
        .success(function(response) {
            if(response.Thumbnail)
                response.Thumbnail = SETTING.ImgUrl+ response.Thumbnail + '@80w_80h_70q_2e';
            $scope.oldMem=response;
        });

    $scope.save = function () {

        if (httpimguri.length > 0) {
            $scope.oldMem.Thumbnail = httpimguri;
            ////如果服务器返回了用户的头像地址,操作IMG标签的SRC为angularjs绑定
            //var img = document.getElementById('imghead');
            //img.src = "{{oldMem.Thumbnail}}";
            ////有图片就显示
            //img.style.display = 'block';
        } else {
            httpimguri = '';
            $scope.oldMem.Thumbnail = $scope.oldMem.Thumbnail.replace(SETTING.ImgUrl,'/');
            $scope.oldMem.Thumbnail = $scope.oldMem.Thumbnail.replace('@80w_80h_70q_2e','');
        }
        $http.put(SETTING.ApiUrl + '/Member/Put', $scope.oldMem, {'withCredentials': true})
            .success(function (data) {
                if (data.Status) {
                    //var img = document.getElementById('imghead');
                    //img.src = $scope.oldMem.Thumbnail;
                    //location.reload([true]);
                    $state.go("page.me");
                }
            });
    }
	
	setTimeout(function(){
			  var oDiv=document.getElementById('sayGreating');
			  oDiv.innerHTML = sayGreeting();
		  },20)
}]);
//app.controller('selectAddress', function($scope,$routeParams) {
//
//    $scope.model = {
//        activeIndex: 0
//    };
//
//    $scope.pageClick = function (index) {
//        $scope.model.activeIndex = 2;
//    };
//
//    $scope.slideHasChanged = function ($index) {
//
//    };
//    $scope.delegateHandler = $ionicSlideBoxDelegate;
//
////打开评论
//    var comment = document.getElementById("userComment");
//    $scope.ope = function () {
//        comment.style.display = "";
//    }
//
//})

/////////////////////////////头像修改////////////////////////////
function previewImage(file)
{
    var MAXWIDTH  = 80;
    var MAXHEIGHT = 80;
    var div = document.getElementById('preview');
    files = file.files[0];
    if (file.files && files)
    {
        div.innerHTML ='<img id=imghead>';
        var img = document.getElementById('imghead');
        img.onload = function(){
            img.width  =  80;
            img.height =  80;
            //隐藏默认头像
            var defaultHeadImg = document.getElementById("preview");
            defaultHeadImg.style.background = 'white';
        }
        var reader = new FileReader();
        reader.onload = function(evt){
            //base64编码
            img.src = evt.target.result;
            //扩展名
            var ext=file.value.substring(file.value.lastIndexOf(".")+1).toLowerCase();
            // gif在ie浏览器不显示
            if(ext!='png'&&ext!='jpg'&&ext!='jpeg'&&ext!='gif'){
                alert("只支持JPG,PNG,JPEG格式的图片");
                return;
            }
            //发送请求
            var xmlhttp=new XMLHttpRequest();
            xmlhttp.onreadystatechange = callback;


            var fd = new FormData();
            xmlhttp.open("POST",SETTING.ApiUrl+'/Resource/Upload');
            fd.append("fileToUpload",files);
            xmlhttp.withCredentials = true;
            xmlhttp.send(fd);
            //var headtext = document.getElementById("Uptext");
            //headtext.innerHTML = '正在上传..';
            //headtext.style.color ='#40AD32'
            //回调函数
            function callback () {
                if (xmlhttp.readyState == 4) {
                    //将response提取出来分割出文件名
                    httpimguri =  xmlhttp.response;
                    var g1=httpimguri.split(':"');
                    var g2= httpimguri.split(',')[1].split(':"')[1];
                    //将分割好的文件名赋予给img全局变量
                    httpimguri=g2.substring(0,g2.length-1);
                    //图片上传成功字样样式
                    //headtext.innerHTML = '上传成功!';
                    //headtext.style.color ='red';
                }
            }
        }
        reader.readAsDataURL(files);
    }
}
///////////////////////////头像修改//////////////////////////////////
function sayGreeting(){
	var oDate=new Date();
	var oHours=oDate.getHours();
	if ( oHours > 6 && oHours <12 ){return '早上好！'}
	else if (oHours >= 12 && oHours <=13){return '中午好！'}
	else if (oHours >13 && oHours <19){return '下午好！'}
	else if (oHours >= 19 && oHours <= 23){return '晚上好！'}
	else if (oHours >= 0 && oHours < 6){return '夜深了注意休息哦！'};
};
