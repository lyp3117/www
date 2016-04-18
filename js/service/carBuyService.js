/**
 * Created by huangxiuyu on 2015/11/11.
 */
//购物车商品数据共享，tab_car 传递到 order

app.service("carProduct",['$rootScope',function($rootScope){
    var productList=[];
    //保存购物车

    this.set=function(proList){
        productList=null;
        window.localStorage.setItem("ShoppingOrder", "'" + JSON.stringify(proList));
        return null;
    };
    this.get=function()
    {
        var storage=window.localStorage.ShoppingOrder;
        if(storage!=undefined)
        {
            var jsonstr = JSON.parse(storage.substr(1, storage.length));
//            $scope.productlist = jsonstr.productlist;
//            carlistcount=$scope.productlist.length;
            return jsonstr;
        }
        return window.localStorage.ShoppingOrder;
    }
}]);