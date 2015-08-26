(function() {
    angular
        .module('trelloGo')
        .controller('loginController', loginController);

    function loginController() {
        vm = this;

        vm.message = "login"

    }
})();