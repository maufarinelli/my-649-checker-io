'use strict';

if(typeof localStorage.require === 'undefined') {
    localStorage.require = 'lotto649';
}

if(typeof localStorage.lang === 'undefined') {
    localStorage.lang = 'en';
}

require.config({
    paths: {
        jQuery: 'external/jquery-1.10.2.min',
        lodash: 'external/lodash',
        general: 'general',
        angular: 'external/angular.min',
        angularRoute: 'external/angular-route.min',
        ionic: '../lib/ionic/js/ionic.bundle',
        mlcApp: 'mlc.app',

        'translation': 'translation',
        'en': 'locales/en',
        'fr': 'locales/fr'
    },
    shim: {
        // Libraries
        'jQuery': {
            exports: '$'
        },
        'lodash': {
            exports: '_'
        },
        'angular': {
            exports: 'angular'
        },
        'angularRoute': {
            deps: ['angular']
        },
        'translation': {
            exports: 'translation'
        },
        'mlcApp': {
            deps: [
                'lodash',
                'jQuery',
                'angular',
                'angularRoute',
                'ionic',
                'translation', 
                'general'
            ],
            exports: 'mlcApp'
        },

        // Local files
        'en': {
            deps: ['translation'],
            exports: 'en'
        },
        'fr': {
            deps: ['translation'],
            exports: 'fr'
        },

        priority: [
            "angular"
        ]
    }
});

window.name = "NG_DEFER_BOOTSTRAP!";

/* I18n files */
if(typeof localStorage.lang === 'undefined') {
    localStorage.lang = 'en';
    require(['en'], function(en) {});
} else if(localStorage.lang === 'fr') {
    require(['fr'], function(fr) {});
} else {
    require(['en'], function(en) {});
}

/* All common modules */
require(['angular', 'Add_Extra/addextra.module']);
require(['angular', 'Add_Guaranteed/addguaranteed.module']);
require(['angular', 'Add_Numbers/addnumbers.module']);
require(['angular', 'Billboard/billboard.module']);
require(['angular', 'Extra/extra.module']);
require(['angular', 'Guaranteed/guaranteed.module']);
require(['angular', 'Last_Draw/lastdraw.module']);
require(['angular', 'My_Numbers/mynumbers.module']);

require([
    'angular',
    'mlcApp',
    'translation',
    'routes',
    'Menu/menu.controller'
], function(angular, mlcApp, translation, routes) {
    var $html = angular.element(document.getElementsByTagName('html')[0]);

    translateApp.i18n.translate();

    angular.element().ready(function() {
        //angular.resumeBootstrap([mlcApp['name']]);
        angular.bootstrap(document, ['mlcApp']);
    });
});