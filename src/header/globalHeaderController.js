/**
 * Created by hea on 3/21/19.
 */

const MODULE_NAME = 'globalHeaderController';

angular.module(MODULE_NAME,['constantServiceModule'])
    .controller('globalHeaderController', ['$state','constantService', function ($state, constantService) {
        let GHCtrl = this;
        GHCtrl.data = constantService.getHeaderData();
        GHCtrl.routes = constantService.getRouteData();

        GHCtrl.isSelelcted = (route)=>{
            return $state.current.name === route;
        };

        GHCtrl.goToState = (route)=>{
            return $state.go(route);
        }
    }]);

export default MODULE_NAME;
