# twitter-autofollow-bot

Twitter auto-follow bot written in [Node.js](http://nodejs.org/).

## Installation

    $ npm install twitter-autofollow-bot

## Usage

```js
var twitterAutofollowBot = require('twitter-autofollow-bot');

// twitterAutofollowBot.FETCH_INTERVAL = 60000;  // (default: 1 minute)
// twitterAutofollowBot.RETRY_INTERVAL = 1000;   // (default: 1 second)

twitterAutofollowBot.run({
  accessToken: TWITTER_ACCESS_TOKEN,
  accessTokenSecret: TWITTER_ACCESS_TOKEN_SECRET,
  consumerKey: TWITTER_CONSUMER_KEY,
  consumerSecret: TWITTER_CONSUMER_SECRET
});
```

## License

  `twitter-autofollow-bot` is released under the MIT License.
