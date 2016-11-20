/// <reference path="_all.ts" />
var ContactManagerApp;
(function (ContactManagerApp) {
    angular.module('contactManagerApp', ['ngMaterial', 'ngMdIcons', 'ngMessages'])
        .service('userService', ContactManagerApp.UserService)
        .controller('mainController', ContactManagerApp.MainController)
        .config(function ($mdIconProvider, $mdThemingProvider) {
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
})(ContactManagerApp || (ContactManagerApp = {}));
//# sourceMappingURL=boot.js.map