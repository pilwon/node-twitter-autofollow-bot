# twitter-autofollow-bot

[![NPM](https://nodei.co/npm/twitter-autofollow-bot.png?downloads=false&stars=false)](https://npmjs.org/package/twitter-autofollow-bot) [![NPM](https://nodei.co/npm-dl/twitter-autofollow-bot.png?months=6)](https://npmjs.org/package/twitter-autofollow-bot)

Twitter auto-follow bot written in [Node.js](http://nodejs.org/).

## Installation

    $ npm install twitter-autofollow-bot

## Usage

```js
var twitterAutofollowBot = require('twitter-autofollow-bot');

// twitterAutofollowBot.FETCH_INTERVAL = 60000;           // (default: 1 minute)
// twitterAutofollowBot.RETRY_INTERVAL = 1000;            // (default: 1 second)
// twitterAutofollowBot.UNFOLLOW_NON_FOLLOWERS = false;   // (default: false)

twitterAutofollowBot.run({
  accessToken: TWITTER_ACCESS_TOKEN,
  accessTokenSecret: TWITTER_ACCESS_TOKEN_SECRET,
  consumerKey: TWITTER_CONSUMER_KEY,
  consumerSecret: TWITTER_CONSUMER_SECRET
});
```

## License

<pre>
The MIT License (MIT)

Copyright (c) 2013-2013 Pilwon Huh

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
</pre>
