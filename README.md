# node-twitter-autofollow-bot

Twitter auto-follow bot written in Node.js.

## Installation

    $ npm install twitter-autofollow-bot

## Usage

```js
var twitterAutofollowBot = require('twitter-autofollow-bot');

// twitterAutofollowBot.FETCH_INTERVAL = 30000;  // (default: 30 seconds)
// twitterAutofollowBot.RETRY_INTERVAL = 1000;   // (default: 1 minute)

twitterAutofollowBot.run({
  accessToken: TWITTER_ACCESS_TOKEN,
  accessTokenSecret: TWITTER_ACCESS_TOKEN_SECRET,
  consumerKey: TWITTER_CONSUMER_KEY,
  consumerSecret: TWITTER_CONSUMER_SECRET
});
```

## License

  `node-twitter-autofollow-bot` is released under the MIT License.
