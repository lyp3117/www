/**
 * Created by gaofengming on 2015/9/15.
 */
app.controller('login',['$scope','$state','AuthService','$ionicLoading','$timeout','$ionicHistory',function($scope,$state,AuthService,$ionicLoading,$timeout,$ionicHistory){
    $ionicHistory.clearHistory();

    $scope.user={
        userName:'',
        password:''
    };
    $scope.login = function(){
        //登录成功
        $ionicLoading.show({
                template:"登录中，请稍后..."
            });
        AuthService.doLogin($scope.user.userName,$scope.user.password,function(data){
            $timeout(function(){
                $ionicLoading.hide();
                $state.go('page.me');
            },1000);


        },
            //登录失败
            function(data){
            $ionicLoading.show({
                template:data.Msg,
                noBackdrop:true
            });
            $timeout(function(){
                $ionicLoading.hide();
            },2000);
        })
    }
}]);