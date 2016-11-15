/// <reference path="_all.ts" />

module ContactManagerApp {
    angular.module('contactManagerApp',['ngMaterial','ngMdIcons'])
        .service('userService',UserService)
        .controller('mainController',MainController);
}