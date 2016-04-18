/**
 * Created by Yunjoy on 2015/9/21.
 */
app.controller('submitOrderController',['$http', '$scope', 'repository', '$stateParams', 'AuthService', '$state', 'cart', 'orderService', 'carProduct', '$ionicLoading', 'wc','$ionicHistory',
    function ($http, $scope, repository, $stateParams, AuthService, $state, cart, orderService, carProduct, $ionicLoading, wc,history) {
        $scope.currentuser = AuthService.CurrentUser(); //调用service服务来获取当前登陆信息
        if ($scope.currentuser == undefined || $scope.currentuser == "") {
            $state.go("page.login");//调到登录页面
        }
        $scope.CountPrice = 0.0;//订单总价
        $scope.remark = "";
        if ($stateParams.productId != null && $stateParams.count != null) {
            $http.get(SETTING.ApiUrl + "/CommunityProduct/Get?id=" + $stateParams.productId, {
                'withCredentails': true
            }).success(function (data) {
                $scope.model = [{
                    id: data.ProductModel.Id,
                    price: data.ProductModel.Price,
                    name: data.ProductModel.Name,
                    image: data.ProductModel.MainImg,
                    count: $stateParams.count
                }];
                $scope.CountPrice = data.ProductModel.Price * $stateParams.count;
                carProduct.set($scope.model);
            })
        } else {
            //console.log(carProduct.get());
            $scope.model = carProduct.get();
            //$scope.model=carProduct.get();
            for (var i = 0; i < $scope.model.length; i++) {
                $scope.CountPrice += ($scope.model[i].price * $scope.model[i].count);
            }
        }

        if ($stateParams.memberaddreid) {
            $http.get(SETTING.ApiUrl + "/MemberAddress/Get?id=" + $stateParams.memberaddreid, {
                'withCredentials': true
            }).success(function (data) {
                //console.log(data);
                $scope.address = data;
            });
        }

        else {

            $scope.mcon = {
                UserId: $scope.currentuser.UserId
            };
            $http.get(SETTING.ApiUrl + "/MemberAddress/Get", {
                params: $scope.mcon,
                'withCredentials': true
            }).success(function (data) {
                if (data.List != null) {
                    $scope.address = data.List[0];
                }
            });
        }

        //todo:完成生成订单并付款的逻辑
        $scope.submit = function () {
            //console.log(carProduct.get());
            $ionicLoading.show({
                template: '订单提交中，请稍等……',
                hideOnStateChange: true
            });
            //var product = carProduct.get();
            var order = {
                Remark: $scope.remark,
                CustomerName: '',
                MemberAddressId: $scope.address.Id,
                Details: []
            };
            for (var i = 0; i < $scope.model.length; i++) {
                order.Details.push({
                    Product: {
                        Id:  $scope.model[i].id
                    },
                    Count:  $scope.model[i].count
                })
            }
            if($stateParams.type&&$stateParams.type == 'service'){
                $http.post(SETTING.ApiUrl + '/ServiceOrder/post?payType=1', order, {
                    withCredentials: true
                }).success(function (data) {
                    if (data.Status) {
                        window.location.href = SETTING.OrderUrl
                        + '?openId=' + wc.getOpenId()
                        + '&portalId=2&totalCount=' + data.Object.Actualprice
                        + '&returnUrl=' + encodeURIComponent(SETTING.BaseUrl + '#/page/me/myOrder?tabIndex=1')
                        + '&notifyUrl=' + encodeURIComponent(SETTING.ApiUrl + data.Msg);
                    }
                }).error(function () {
                    //TODO:完成此错误处理方法
                });
            }
            else
            {
                $http.post(SETTING.ApiUrl + '/CommunityOrder/post?payType=1', order, {
                    withCredentials: true
                }).success(function (data) {
                    if (data.Status) {
                        cart.deleteall();
                        carProduct.set([]);
                        window.location.href = SETTING.OrderUrl
                        + '?openId=' + wc.getOpenId()
                        + '&portalId=2&totalCount=' + data.Object.Actualprice
                        + '&returnUrl=' + encodeURIComponent(SETTING.BaseUrl + '#/page/me/myOrder?tabIndex=1')
                        + '&notifyUrl=' + encodeURIComponent(SETTING.ApiUrl + data.Msg);
                    }
                }).error(function () {
                    //TODO:完成此错误处理方法
                });
            }
        };
        $scope.return = function(){
            history.goBack();
            history.clearHistory();
        }
    }
]);