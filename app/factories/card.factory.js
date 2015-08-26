(function() {
    angular
        .module('trelloGo')
        .factory('CardFactory', CardFactory);

    function CardFactory(BoardFactory, config, $http, $q) {
        var factory = {};

        factory.trelloBase = "https://api.trello.com/1/";
        factory.listCall = "lists/";
        factory.cardFeilds = "?fields=name&cards=open&card_fields=name";
        factory.trelloSuffix = "&key=" + config.appKey + "&token=" + config.token;
        factory.getCards = getCards;
        factory.addCard = addCard;

        function getCards(listId) {
            var url = buildGetCardsURL(listId);
            console.log(url);
            var deferred = $q.defer();

            $http.get(url).
            success(function(data, status, headers, config) {
                deferred.resolve(data);
                console.log(data);
                factory.cards = data.cards;
                factory.listName = data.name;
                console.log(factory.listName);
            })
            .error(function() {
                    console.log('ERROR RETRIEVING CARD DATA');
                    deferred.reject('ERROR DEFERRING');
            });

            return deferred.promise;
        }

        function buildGetCardsURL(listId) {
            var url = factory.trelloBase;
            url += factory.listCall;
            url += listId;
            url += factory.cardFeilds;
            url += factory.trelloSuffix;

            return url;
        }

        function addCard(cardTitle){
            var url = buildNewCardURL(BoardFactory.listId, cardTitle);
            console.log(url);
            $http.post(url).
            success(
                console.log("added " + cardTitle)
            )
        }

        function buildNewCardURL(listId, cardTitle) {
            var url = factory.trelloBase;
            url += factory.listCall;
            url += listId;
            url += "/cards?name=" + cardTitle;
            url += factory.trelloSuffix;

            return url;
        }



        return factory;
    }
})();