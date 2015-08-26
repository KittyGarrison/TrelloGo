angular.module('trelloGo', ['ngRoute', 'ui.bootstrap', 'ui.router']);
angular.module('trelloGo').config(Configuration);
angular.module('trelloGo').run(function($state){
    $state.go("login");
});

function Configuration($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('login', {
            url: "/",
            templateUrl: "partials/login.html"
        })
        .state('list', {
            url: "/list",
            templateUrl: "partials/list.html"
        })
        .state('card', {
            url: "/card",
            templateUrl: "partials/card.html"
        })
        .state('boards', {
            url: "/boards",
            templateUrl: "partials/boards.html"
        })               
}
