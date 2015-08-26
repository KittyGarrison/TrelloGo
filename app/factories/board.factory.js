(function() {
    angular
        .module('trelloGo')
        .factory('BoardFactory', BoardFactory);

    function BoardFactory($http, $q, $state, config) {
        var factory = {};

        factory.trelloBase = "https://api.trello.com/1/";
        factory.memberBoardsCall = "members/me?fields=username&boards=all&";
        factory.listsCall = "/lists?fields=name&"
        factory.trelloSuffix = "key=" + config.appKey + "&token=" + config.token;
        factory.chosenBoard = {};
        factory.lists = [];

        factory.getBoards = getBoards;
        factory.chooseBoard = chooseBoard;
        factory.createTrelloGoList = createTrelloGoList;
        factory.findTrelloGoListId = findTrelloGoListId;
        factory.getLists = getLists;

        function getBoards() {
            var url = buildMemberURL();
            var deferred = $q.defer();

            $http.get(url)
                .success(function(data, status, headers, config) {
                    deferred.resolve(data);
                    console.log(data);
                    factory.boards = data.boards;
                    factory.memberId = data.id;           
                })
                .error(function() {
                    console.log('ERROR RETRIEVING BOARD DATA');
                    deferred.reject('ERROR DEFERRING');
                });

            return deferred.promise;
        }

        function buildMemberURL() {
            var url = factory.trelloBase;
            url += factory.memberBoardsCall;
            url += factory.trelloSuffix;

            return url;
        }

        function chooseBoard(boardId, boardName) {
            factory.chosenBoard.id = boardId;
            factory.chosenBoard.name = boardName;
            // console.log("boardName = " + factory.chosenBoard.name)
            // console.log("boardId = " + factory.chosenBoard.id)
            var lists = getLists();
            lists.then(function(response){
                findTrelloGoListId();
                // document.getElementById('boardName').innerHTML = factory.chosenBoard.name;
            });
            
        }

        function getLists() {
            // console.log("_________calling GetLists()__________")
            url = buildGetListsURL();
            var deferred = $q.defer();

            $http.get(url)
                .success(function(data, status, headers, config) {
                    deferred.resolve(data);
                    factory.lists = data;
                    // console.log("Here are the lists /n -----------> " + factory.lists);                         
            })
                .error(function() {
                    console.log('ERROR RETRIEVING LIST DATA');
                    deferred.reject('ERROR DEFERRING');
                });

            return deferred.promise
        }

        function buildGetListsURL() {
            var url = factory.trelloBase;
            url += "boards/"
            url += factory.chosenBoard.id;
            url += factory.listsCall;
            url += factory.trelloSuffix;
            console.log("getting lists w/ URL" + url);

            return url;
        }


        function findTrelloGoListId(){
            // console.log("_________calling FindTrelloGoListId()__________");
            var idFound = false;
            // console.log("Here are the lists /n -----------> " + factory.lists);
            for (var i = 0; i < factory.lists.length; i++) {
                // console.log(factory.lists[i].name);
                if (factory.lists[i].name.toUpperCase().replace(/-|\s/g,"") === "TRELLOGO"){
                    factory.listId = factory.lists[i].id;
                    idFound = true;
                    console.log("list ID = " + factory.listId);
                    goToList();
                }    
            };
            if (idFound === false) {
                var newList = createTrelloGoList();
                newList.then(function(response){
                    goToList();
                });
            };
            
        }

        function createTrelloGoList() {
            var deferred = $q.defer();
            var url = buildTrelloGoListURL();

            $http.post(url)
                .success(function(data, status, headers, config) {
                    deferred.resolve(data);
                    console.log("Creating list - " + data.name);
                    factory.listId = data.id;
            
                })
                .error(function() {
                    console.log('ERROR RETRIEVING POST LIST DATA');
                });

            return deferred.promise;
        }

        function buildTrelloGoListURL() {
            var url = factory.trelloBase;
            url += "boards/" + factory.chosenBoard.id;
            url += "/lists?name=TrelloGo&";
            url += factory.trelloSuffix;

            return url;
        }

        function goToList(){
             $state.go('list');
              console.log("go to list");
        }      

        return factory;
    }
})();