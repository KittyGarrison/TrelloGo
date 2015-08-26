(function() {
    angular
        .module('trelloGo')
        .controller('listController', listController);

    function listController(CardFactory, BoardFactory, $state) {
        vm = this;


        vm.message = "List name";
        vm.goToAddCard = goToAddCard;
        vm.getCards = CardFactory.getCards(BoardFactory.listId);
        vm.getCards.then(function(response){
            vm.cards = CardFactory.cards.reverse();
            vm.listName = CardFactory.listName;
            vm.boardName = BoardFactory.chosenBoard.name;
            console.log("This is the board name------------" + vm.boardName)
        });

        vm.currentPage = 0;
	    vm.pageSize = 4;
        vm.numberOfPages = numberOfPages;

        function goToAddCard(){
	    	$state.go("card");
	    	// console.log("go to add card");
	    };

        function numberOfPages() {
            if(vm.cards == 0 || vm.cards == undefined){
                return;
            }else{
                return Math.ceil(vm.cards.length/vm.pageSize);
            }                
        }
    }
})();