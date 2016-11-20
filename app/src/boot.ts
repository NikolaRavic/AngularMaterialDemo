/// <reference path="_all.ts" />

module ContactManagerApp {
    angular.module('contactManagerApp', ['ngMaterial', 'ngMdIcons', 'ngMessages'])
        .service('userService', UserService)
        .controller('mainController', MainController)
        .config(($mdIconProvider: angular.material.IIconProvider,
                 $mdThemingProvider: angular.material.IThemingProvider) => {
            $mdIconProvider
                .defaultIconSet('./assets/svg/avatars.svg', 128)
                .icon('menu', './assets/svg/menu.svg', 24)
                .icon('google_plus', './assets/svg/google_plus.svg', 128)
                .icon('hangouts', './assets/svg/hangouts.svg', 128)
                .icon('twitter', './assets/svg/twitter.svg', 128)
                .icon('phone', './assets/svg/phone.svg', 128);
            $mdThemingProvider.theme('default')
                .primaryPalette('blue', {
                    'default': '400',
                    'hue-1': '100',
                    'hue-2': '600',
                    'hue-3': 'A100',
                })
                .accentPalette('red', {
                    'default': '400'
                });
        });
}