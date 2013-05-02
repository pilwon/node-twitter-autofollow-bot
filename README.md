# node-twitter-autofollow-bot

Twitter auto-follow bot written in Node.js.

## Installation

    $ npm install twitter-autofollow-bot

## Usage

```js
var twitterAutofollowBot = require('twitter-autofollow-bot');

twitterAutofollowBot.run({
  accessToken: TWITTER_ACCESS_TOKEN,
  accessTokenSecret: TWITTER_ACCESS_TOKEN_SECRET,
  consumerKey: TWITTER_CONSUMER_KEY,
  consumerSecret: TWITTER_CONSUMER_SECRET
});
```

## License

  `node-twitter-autofollow-bot` is released under the MIT License.
