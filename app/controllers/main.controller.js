(function() {
    angular
        .module('trelloGo')
        .controller('mainController', mainController);

    function mainController(CardFactory, BoardFactory, $state) {
        vm = this;

        vm.message = "message from mainController";
	    vm.removeSplash = removeSplashScreen;
        vm.goToList = goToList;
        vm.boardName = BoardFactory.chosenBoard.name;
        

	    function removeSplashScreen(){
	    	angular.element(document.getElementsByTagName("body")).addClass("contentLoaded");
	    };

        function goToList(){
            $state.go('list');
            console.log("go to list");
        };

    }
})();