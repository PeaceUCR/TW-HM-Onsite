/**
 * Created by hea on 3/21/19.
 */

const MODULE_NAME = 'agentsDataServiceModule';

angular.module(MODULE_NAME,['constantServiceModule']).factory('agentsDataService', ['constantService',(constantService) => {

    let agentsData = angular.copy(constantService.getAgentsContent());

    let historyList = [];

    let summary = new Map();

    return {
        agentsData: agentsData,
        addResources: (dataIndex, resources)=>{
            let array = resources.split(",");
            array.forEach((item)=>{
                if(item){
                    agentsData[dataIndex].resources.push(item.trim());
                }
            });
            historyList.unshift(agentsData[dataIndex].url);
        },
        deleteResource: (dataIndex, resourceIndex)=>{
            agentsData[dataIndex].resources.splice(resourceIndex, 1);
            historyList.unshift(agentsData[dataIndex].url);
        },
        getSummary:function(){

            summary.clear();

            if(agentsData){
                agentsData.forEach((item)=>{
                    if(summary.has(item.status)){
                        summary.set(item.status, summary.get(item.status)+1);
                    }else{
                        summary.set(item.status, 1);
                    }
                });
            }

            return summary;
        },
        getHistory:()=>{
            return historyList;
        },
        addAgent: function (data) {
            this.agentsData.push(data);
            this.getSummary();
        }
    }
}]);

export default MODULE_NAME;