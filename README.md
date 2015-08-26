# Trello go

TrelloGo is a in-dash app to add cards to your Trello boards while driving. It has limited function-ability therefore limited distraction.

## Running Instructions
*Keys and Tokens*

1. get your application key by logging into Trello, and then visiting https://trello.com/1/appKey/generate

2. get your 30 day read/write access token by copping this link into your browser and inserting your key https://trello.com/1/authorize?key=substitutewithyourapplicationkey&name=TrelloGo&expiration=30day&response_type=token&scope=read,write

3. create a config.js file in the app/config directory

4. Paste in this code and substitute your app key and token

```

(function() {
    angular
        .module('trelloGo')
        .constant('config', {
          appKey: 'yourappkey',
          token: 'yourtoken'
        });
    }
})();
```

*Serving*

1. $ http-server

This repo was deleted and reinitialized to discard any and all commits containing private information.
