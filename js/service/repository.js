/**
 * Created by Yunjoy on 2015/9/10.
 */
app.service("repository",["$http","$q",function(http,q){
    this.get = function(resource,params){
        var deferred = q.defer();
        http.get(SETTING.ApiUrl + '/'+resource +'/get',{
            params:params,
            withCredentials:true})
            .success(function (data) {
                deferred.resolve(data);
            }).error(function (data) {
                deferred.reject(data);
            });
        return deferred.promise;
    };
    this.post = function(resource,data){
        var deferred = q.defer();
        http.post(SETTING.ApiUrl + '/'+resource +'/post',data,{
            withCredentials:true})
            .success(function (data) {
                deferred.resolve(data);
            }).error(function (data) {
                deferred.reject(data);
            });
        return deferred.promise;
    };
    this.delete = function(resource,id){
        var deferred = q.defer();
        http.delete(SETTING.ApiUrl + '/'+resource +'/delete',{
            params:{id:id},
            withCredentials:true})
            .success(function (data) {
                deferred.resolve(data);
            }).error(function (data) {
                deferred.reject(data);
            });

        return deferred.promise;
    };
    this.put = function(resource,data){
        var deferred = q.defer();
        http.put(SETTING.ApiUrl + '/'+resource +'/put',data,{
            withCredentials:true})
            .success(function (data) {
                deferred.resolve(data);
            }).error(function (data) {
                deferred.reject(data);
            });
        return deferred.promise;
    }
}]);