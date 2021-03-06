/**
 * Created by huangxiuyu on 2015/9/17.
 */
app.controller('myorder',['$http','$scope','$stateParams','AuthService','wc',function($http,$scope,$stateParams,AuthService,wc){
$scope.tabIndex=$stateParams.tabIndex;
    $scope.searchCondition=
    {
        statusId:1,
        Status:1,
        Addusers:[AuthService.CurrentUser().UserId],
        OrderBy:"OrderById",
        IsDescending:true
    };
    //根据订单状态查找订单
   $scope.getOrderStatus=function()
   {
       $scope.searchCondition.Status=$scope.tabIndex;
       //alert($scope.tabIndex);
       $http.get(SETTING.ApiUrl +"/CommunityOrder/Get",{
           params:$scope.searchCondition,
           'withCredentials':true}).
        success(function(data){
           // console.log(data);
               $scope.list=data.List;
        });
   };
    $scope.getOrderStatus();
    $scope.getOrderList=function(index){
        $scope.tabIndex=index;
        $scope.getOrderStatus();
    };
    //更新订单状态
    $scope.upCondition={
        Id:10,
        Status:2

    };
    $scope.upOrderStatus=function(id,orderid)
    {

        $scope.upCondition.Status=id;
        $scope.upCondition.Id=orderid;
        console.log($scope.upCondition);
        $http.put(SETTING.ApiUrl +"/CommunityOrder/Put/",$scope.upCondition,{'withCredentials':true}).
        success(function(data){
                alert(data.Msg);
                $scope.getOrderStatus();
            });
    };
    $scope.pay = function(orderNo,price){
        window.location.href = SETTING.OrderUrl
        + '?openId=' + wc.getOpenId()
        + '&portalId=2&totalCount=' + price
        + '&returnUrl=' + encodeURIComponent(SETTING.BaseUrl + '#/page/me/myOrder?tabIndex=1')
        + '&notifyUrl=' + encodeURIComponent(SETTING.ApiUrl + '/WePay/NotifyOrder?orderNo=' + orderNo);
    }
}]);
