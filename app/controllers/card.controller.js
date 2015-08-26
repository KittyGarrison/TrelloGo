(function() {
    angular
        .module('trelloGo')
        .controller('cardController', cardController);

    function cardController(CardFactory, $state, $timeout) {
        vm = this;

        vm.message = "List name";
        vm.cardTitle = "";
        vm.goToList = goToList;
        vm.addCard = addCard;

        function goToList(){
            $state.go("list");
	    };

	    function addCard(){
	    	CardFactory.addCard(vm.cardTitle);
	    	$timeout(function() {
            $state.go("list");
            console.log("go to add list");    
            }, 500);
	    };

    }
})();