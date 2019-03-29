/**
 * Created by hea on 3/23/19.
 */

import agentsPageController from '../../src/agentsPage/agentsPageController';

describe('agentsPageController Spec', () => {

    let agentsPageControllerMock, constantServiceMock, agentsDataServiceMock, scope, state, $rootScope, $ctrl;

    beforeEach(angular.mock.module(agentsPageController));

    beforeEach(inject(($injector) => {

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
            },
            getAgentsFilter : ()=>{
                return ['All', 'Physical', 'Virtual'];
            }
        };

        agentsDataServiceMock={
            getSummary:jasmine.createSpy().and.returnValue({'idle':2, 'building': 2}),
            getHistory: jasmine.createSpy()
        };

        scope = $injector.get('$rootScope').$new();

        state = {
            go: jasmine.createSpy(),
            current: {
                name: 'agents'
            }
        };

        $ctrl = $injector.get('$controller');

        agentsPageControllerMock = $ctrl('agentsPageController', {
            '$scope': scope,
            '$state':state,
            'constantService':constantServiceMock,
            'agentsDataService': agentsDataServiceMock
        });

    }));

    it('should controller initialize correctly', function () {
        //console.log(agentsPageControllerMock);
        expect(agentsPageControllerMock.selectedFilter).toBe('Physical');
        expect(agentsPageControllerMock.filters).toEqual(['All', 'Physical', 'Virtual']);

        expect(agentsDataServiceMock.getSummary).toHaveBeenCalled();
        expect(agentsDataServiceMock.getHistory).toHaveBeenCalled();

    });

});
