/**
 * Created by hea on 3/22/19.
 */

import agentsDataService from '../../src/service/agentsDataService';

describe('agentsDataService Spec', () => {

        let constantServiceMock ,agentsDataServiceMock;

        beforeEach(() => {
            let module = angular.mock.module;
            module(agentsDataService);

            constantServiceMock= {
                getAgentsContent: ()=>{
                    return [
                            {
                                url: 'bjstdmngbgr02.thoughtworks.com',
                                status: 'idle',
                                ip: '192.168.1.2',
                                path:'/var/lib/cruise-agent',
                                resources: ['ubuntu', 'firefox3', 'core-duo'],
                                category: 'Physical'
                            }];
                }
            };

            module(function ($provide) {
                $provide.value('constantService', constantServiceMock);
            });

            inject(function (agentsDataService){
                agentsDataServiceMock = agentsDataService;
            })
        });

        it('should return value from mock dependency', ()=>{
            expect(agentsDataServiceMock.agentsData).toEqual(constantServiceMock.getAgentsContent());
        });

        it('should add/delete resources and history working', ()=> {
            let dataIndex = 0;
            let resourcesAdd = 'chrome, ie11';
            let array = resourcesAdd.split(',');
            agentsDataServiceMock.addResources(dataIndex, resourcesAdd);
            expect(agentsDataServiceMock.agentsData[dataIndex].resources).toContain(array[0].trim());
            expect(agentsDataServiceMock.agentsData[dataIndex].resources).toContain(array[1].trim());

            let resourceIndex = 0;
            agentsDataServiceMock.deleteResource(dataIndex, resourceIndex);
            expect(agentsDataServiceMock.agentsData[dataIndex].resources).not.toContain('ubuntu');

        });

        it('should getSummary works', ()=>{
            expect(agentsDataServiceMock.getSummary()).toEqual({'idle': 1});
        });
});
