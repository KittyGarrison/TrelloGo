(function() {
    angular
        .module('trelloGo')
        .controller('navController', navController);

    function navController() {
        vm = this;

        vm.message = "nav"

    }
})();