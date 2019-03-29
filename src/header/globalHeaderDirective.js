/**
 * Created by hea on 3/21/19.
 */
const MODULE_NAME = 'globalHeaderDirective';

const templateUrl = require('./globalHeader.html');

angular.module(MODULE_NAME, [])
    .directive('globalHeader', function(){
        return {
            restrict:'E',
            templateUrl: templateUrl,
            controller: 'globalHeaderController',
            controllerAs: 'GHCtrl'
        };
    });


export default MODULE_NAME;