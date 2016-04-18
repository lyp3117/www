/**
 * Created by Administrator on 2015/9/7.
 */



app.controller('TabShoppingCtrl', ['$http', '$scope', '$stateParams', '$state', '$timeout', '$ionicLoading', 'cartservice',
    function ($http, $scope, $stateParams, $state, $timeout, $ionicLoading, cartservice) {
		
		//var oDiv=document.getElementById('more_right');
    //console.log(cartservice.GetAllcart());

    

//页面跳转

    $scope.go = function (state) {
        window.location.href = state;
    };

    //    搜索功能
    $scope.showSelect = false;
    $scope.isShow = false;
    $scope.showInput = function () {
        $scope.showSelect = true;
        $scope.isShow = true;
    };
//  下拉框效果
	$scope.selectBox=false;
	$scope.showSelectBox=function(){
		$scope.selectBox=true;
	}
//	关闭下拉框
	$scope.closeSelectBox=function(){
		$scope.selectBox=false;
	}

    //region地址获取
    $scope.Condition = {
        Page: 1,
        father: true,
        Parent_Id: ''
    };
    $scope.pare = [];

    var getAddress = function () {
        $http.get(SETTING.ApiUrl + '/CommunityArea/Get', {
            params: $scope.Condition,
            'withCredentials': true
        }).success(function (data3) {
            if (data3.List != "") {
                $scope.addrss = data3.List;
                $scope.selected = data3.List[0].Id;//如果想要第一个值
                //for( i=0;i<data3.List.length;i++){
                //    if(data3.List[i].Parent=null)
                //    {
                //        $scope.pare.push (data3.List[i].Parent);
                //    }}
                //alert($scope.pare);
            }
        });
    }
    getAddress();
    $scope.SCondition = {

        Parent_Id: ''
    };

    $scope.area="云南省"
    $scope.click = function (area,id) {
        $scope.area=area;
        //$scope.selectBox=false;
        $scope.SCondition.Parent_Id =id
        $http.get(SETTING.ApiUrl + '/CommunityArea/Get', {
            params: $scope.SCondition,
            'withCredentials': true
        }).success(function (data) {
            $scope.zilei = data.List;
        })

    }
    $scope.huan=function(area){
        $scope.area=area;
        $scope.selectBox=false;
    }
    //endregion

    //region商品大图获取

    $scope.Condition = {
        IsDescending: true,
        OrderBy: 'OrderByOwner',
        IsRecommend: '1'
        //ProductId:''
    };

    var getProductList = function () {
        $http.get(SETTING.ApiUrl + '/CommunityProduct/Get', {
            params: $scope.Condition,
            'withCredentials': true
        }).success(function (data1) {
            $scope.list = data1.List[0];

        });

    };
    getProductList();
    $scope.getList = getProductList;

//    增加到购物车动画
//    var imgfb=document.createElement("img");
////    var imgfb=img.cloneNode(true);
//    document.getElementById("father").appendChild(imgfb);
//    imgfb.className="f-show add";
//    imgfb.setAttribute("ng-src","http://img.iyookee.cn/"+'$scope.list.MainImg');
    $scope.AddCart1 = function (list) {
        $scope.cartinfo.id = $scope.list.Id;
        $scope.cartinfo.name = $scope.list.Name;
        $scope.cartinfo.image = $scope.list.MainImg;
        $scope.cartinfo.price = $scope.list.Price;
        $scope.cartinfo.oldprice = $scope.list.OldPrice;
        $scope.cartinfo.count = 1;
        cartservice.add($scope.cartinfo);
        var $bigImg=$("#bigImg").children();
        var bigImg=$bigImg[0];
        var cloneImg=bigImg.cloneNode(true);
        document.body.appendChild(cloneImg);
   		var top=$bigImg.offset().top;
   		var left=$bigImg.offset().left;
   		cloneImg.style.position="fixed";
   		cloneImg.style.top=top+"px";
   		cloneImg.style.left=left+"px";
   		cloneImg.className="gwcFrist";
   		setTimeout(function(){
   			$(cloneImg).remove();
   		},1000);
    };


//endregion

    //region 商品获取
    $scope.items = [];
    $scope.searchCondition = {
        IsDescending: true,
        OrderBy: 'OrderByAddtime',
        Page: 1,
        PageCount: 4
        //ProductId:''
    };

    var getList = function () {
        $http.get(SETTING.ApiUrl + '/CommunityProduct/Get', {
            params: $scope.searchCondition,
            'withCredentials': true
        }).success(function (data) {
            if (data.List != "") {
                $scope.items = data.List;
            }
        });
    };
    getList();
//endregion

    //region 商品加载
    $scope.loadmore = true;
    $scope.load_more = function () {
        $timeout(function () {
            $scope.searchCondition.Page += 1;
            $http.get(SETTING.ApiUrl + '/CommunityProduct/Get', {
                params: $scope.searchCondition,
                'withCredentials': true
            }).success(function (data) {

                if (data.List != "") {
                    for (var i = 0; i < data.List.length; i++) {
                        $scope.items.push(data.List[i]);
                    }
                    if ($scope.items.length == data.TotalCount) {
                        $scope.loadmore = false;
                    }
                }
                $scope.$broadcast("scroll.infiniteScrollComplete");
            });
        }, 1000)
    };


    //endregion

    //region 图片轮播
    $scope.channelName = 'banner';
    $http.get(SETTING.ApiUrl+'/Channel/GetTitleImg', {
        params: {ChannelName: $scope.channelName},
        'withCredentials': true
    }).success(function (data) {
        $scope.content = data;
    });
    //endregion

    //region 购物车

    $scope.cartinfo = {
        id: null,
        name: null,
        count: null,
        price: null,
        oldprice: null,
        parameterValue:[]
    };
    // 添加商品
//  $(window).scroll(function(){
//  	var st=$(this).scrollTop();
//  })

    $scope.AddCart = function (data,$event) {
        $scope.cartinfo.id = data.row.Id;
        $scope.cartinfo.name = data.row.Name;
        $scope.cartinfo.image = data.row.MainImg;
        $scope.cartinfo.price = data.row.Price;
        $scope.cartinfo.oldprice = data.row.OldPrice;
        $scope.cartinfo.count = 1;
        cartservice.add($scope.cartinfo);
        
        var currentObj=$event.target;
		var imgF=currentObj.parentNode.parentNode.parentNode;
		var img=imgF.getElementsByTagName("img");
		var currentImg=img[0];
		var cloneImg=currentImg.cloneNode(false);
		var $cloneImg=$(cloneImg);
		document.body.appendChild(cloneImg);
		var top = $(currentImg).offset().top;
		var left = $(currentImg).offset().left;
	    $cloneImg.css({"position":"fixed","top":top+"px","left":left+"px"});
		cloneImg.className="gwcAnimation";
		setTimeout(function(){
			$cloneImg.remove();
		},1000);
    }

    //endregion

    //region   立即购买
    $scope.buysome=function(id){
        $state.go("page.order", {productId:id,count:1});
    };
    //endregion

    //region  下拉刷新
    $scope.doRefresh = function() {
        window.location.reload();
    }
    //endregion

	  $scope.searchname = '';
	  document.getElementById('search').onblur = function () {
		  $state.go("page.search_product", {productName: $scope.searchname});
	  };
	  $scope.ServiceCon={
		  Page:1,
		  PageCount:10
	  }
		  $http.get(SETTING.ApiUrl+"/Service/GetList",$scope.ServiceCon,{
			  'withCredentials':true
		  }).success(function(data)
		  {
			  $scope.ServiceList=data.List;
			  var oUl=document.getElementById('menu_list');
			  var aLi=oUl.getElementsByTagName('li');
			  setTimeout(function(){
				  if(aLi.length > 5 )
				  {
					  for(var i=5;i<aLi.length;i++)
					  {
						  aLi[i].style.display='none'
						  
					  };
				  }
				  },1)
		$scope.changeMore=function()
		{
			var oDiv=document.getElementById('more_right');
			var oReturn=document.getElementById('return');
			var aLiLength=(aLi.length / 5) > 2? parseInt(aLi.length / 5)-1 : 0;
			var timer=null;
			oUl.style.height=(110 + aLiLength * 55)+'px'
			for(var i=0;i<aLi.length;i++)
			{
				aLi[i].style.transition='0.1s all ease-in'
				aLi[i].style.webkitTransform='translate(15px,-18px) scale(0.8)';
				aLi[i].style.marginLeft='-5px';
				aLi[i].style.marginBottom='-22px';
				aLi[i].style.fontSize='2.1em';
				aLi[i].style.display='block';
			}
				oDiv.style.display='none';
				clearInterval(timer);
				timer=setTimeout(function(){
					oReturn.style.display='block';
				},200)
				
		} 
		$scope.clickReturn=function()
		{
			var oDiv=document.getElementById('more_right');
			var oReturn=document.getElementById('return');
			for(var i=0;i<aLi.length;i++)
			{
				aLi[i].style.transition='0.1s all ease-in'
				aLi[i].style.webkitTransform='';
				aLi[i].style.marginLeft='5px';
			//	aLi[i].style.margin='10px -4px 15px 5px';
				aLi[i].style.fontSize='17px';
				aLi[i].style.display='block'
			}
			oReturn.style.display='none';
			oDiv.style.display='block';
			oUl.style.height='83px';
			setTimeout(function(){
			if(aLi.length > 4 )
			{
				for(var i=4;i<aLi.length;i++)
				{
					aLi[i].style.display='none'
				};
			}
			},1)
		};
    });
	
	//
}]);





