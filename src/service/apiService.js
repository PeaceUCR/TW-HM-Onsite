/**
 * Created by hea on 3/22/19.
 */

const MODULE_NAME = 'apiServiceModule';

angular.module(MODULE_NAME,[]).factory('apiService',['$q','$http',function ($q, $http) {
    return {
        getData: function () {
            const url = '/api/data';
            var deferred = $q.defer();
            $http.get(url).then(function (response) {
                deferred.resolve(response.data);

            },function (response) {
                deferred.reject('request reject:'+response);
            });

            return deferred.promise;
        }
    }
}]);

export default MODULE_NAME;