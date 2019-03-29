/**
 * Created by hea on 3/21/19.
 */

import { constant } from '../constant'

const MODULE_NAME = 'constantServiceModule';

angular.module(MODULE_NAME,[]).factory('constantService',[() => {
    return {
        getRouteData: () => {return constant.route},
        getHeaderData: ()=>{return constant.header},
        getAgentsFilter: ()=>{return constant.agents.filter},
        getAgentsContent: ()=>{return constant.agents.items}
    }
}]);

export default MODULE_NAME;