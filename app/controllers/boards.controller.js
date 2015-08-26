(function() {
    angular
        .module('trelloGo')
        .controller('boardsController', boardsController);

    function boardsController(BoardFactory, $state) {
        vm = this;

        vm.currentPage = 0;
        vm.pageSize = 6;
        vm.numberOfPages = numberOfPages;

        vm.getBoards = BoardFactory.getBoards();
        vm.getBoards.then(function(response){
            vm.boards = BoardFactory.boards;
            // console.log(vm.boards);
        });
        
        vm.chooseBoard = BoardFactory.chooseBoard;
        
        // vm.message = "message from boardsController";

        function numberOfPages() {
            if(vm.boards == 0 || vm.boards == undefined){
                    return;
                }else{
                    return Math.ceil(vm.boards.length/vm.pageSize);
                }               
        }


    }
})();