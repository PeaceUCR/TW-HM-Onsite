/**
 * Created by hea on 3/21/19.
 */

import angular from 'angular';
import uirouter from 'angular-ui-router';

import '../styles/demo-base.less';

import apiServiceModule from './service/apiService';
import constantServiceModule from './service/constantService';
import agentsDataServiceModule from './service/agentsDataService';

import globalHeaderModule from './header/_module';
import agentsPageModule from './agentsPage/_module';

const MODULE_NAME = 'demo';

let dashboardPageTemplateUrl = require('./dashboardPage/dashboardPage.html');
let myCruisePageTemplateUrl = require('./myCruisePage/myCruisePage.html');
let agentsPageTemplateUrl = require('./agentsPage/agentsPage.html');
let helpPageTemplateUrl = require('./helpPage/helpPage.html');

angular.module(MODULE_NAME, [uirouter, apiServiceModule, constantServiceModule, agentsDataServiceModule, globalHeaderModule, agentsPageModule])
    .config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider)=>{
        $urlRouterProvider.otherwise("/agents");

        $stateProvider.state('dashboard', {
            url: "/dashboard",
            templateUrl: dashboardPageTemplateUrl
        }).state('myCruise', {
            url: "/mycruise",
            templateUrl: myCruisePageTemplateUrl
        }).state('agents', {
            url: "/agents",
            templateUrl: agentsPageTemplateUrl,
            controller : "agentsPageController",
            controllerAs: "ACtrl"
        }).state('help', {
            url: "/help",
            templateUrl: helpPageTemplateUrl
        })

    }]);



export default MODULE_NAME;