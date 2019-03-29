/**
 * Created by hea on 3/21/19.
 */

const MODULE_NAME = 'agentsPageController';

const agentContentUrl = require('./agentContent.html');

let defaultSelection = 'Physical';

angular.module(MODULE_NAME,['agentsDataServiceModule'])
    .controller('agentsPageController', ['$scope','$state', 'constantService','agentsDataService', function ($scope, $state, constantService, agentsDataService) {
        let ACtrl = this;

        ACtrl.isOpenDialog = false;

        ACtrl.openDialog =()=>{
            ACtrl.isOpenDialog = true;
        };

        ACtrl.closeDialog =()=>{
            ACtrl.isOpenDialog = false;
        };

        ACtrl.filters = constantService.getAgentsFilter();

        ACtrl.selectedFilter = defaultSelection;
        ACtrl.select = (name)=>{
            ACtrl.selectedFilter = name;
            $scope.$broadcast('filterChange', name);
        };

        ACtrl.agentsDataService = agentsDataService;

        ACtrl.summary = ACtrl.agentsDataService.getSummary();
        ACtrl.summaryKeys = Array.from(ACtrl.summary.keys()).sort((a, b)=> {return a<b?-1:1});

        ACtrl.historyList = ACtrl.agentsDataService.getHistory();


        ACtrl.addAgent = ()=>{
            ACtrl.agentsDataService.addAgent({
                url: $scope.agentName,
                status: 'idle',
                ip: $scope.agentIp,
                path:'/var/lib/cruise-agent',
                resources: [],
                category: 'Physical'
            });

            ACtrl.closeDialog();
        };

        //when agents status change, update the summary
        $scope.$on('agentsStatusChange',($event)=>{
            ACtrl.summary = ACtrl.agentsDataService.getSummary();
            ACtrl.summaryKeys = Object.keys(ACtrl.summary).sort((a, b)=> {return a<b?-1:1});
        });



    }]).directive('agentContent', ['agentsDataService', (agentsDataService)=>{
        return {
            templateUrl: agentContentUrl,
            restrict: 'E',
            scope: {
                contentValue: '<',
                contentIndex: '<'
            },
            link: (scope, element, attrs)=>{
            },
            controller: ['$scope',( $scope)=>{
                $scope.filterName = defaultSelection;

                $scope.isOpenDialog = false;
                $scope.open = ()=>{
                    $scope.isOpenDialog = true;
                };
                $scope.close = ()=>{
                    $scope.isOpenDialog = false;
                };

                $scope.addResources = ()=> {
                    agentsDataService.addResources($scope.contentIndex, $scope.resource);
                    $scope.resource = '';
                    $scope.close();
                };
                $scope.deleteResource =(index)=> {
                    agentsDataService.deleteResource($scope.contentIndex, index);
                };

                $scope.handlePressEnter = (event)=> {
                    if(event.keyCode === 13){
                        event.preventDefault();
                        $scope.addResources();
                    }
                };

                $scope.$on('filterChange',($event, filterName)=>{
                    $scope.filterName = filterName;
                });
            }]
        }

}]);

export default MODULE_NAME;