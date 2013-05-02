/*
 * lib/index.js
 */

/* jshint sub: true */

'use strict';

var assert = require('assert'),
    util = require('util');

var _ = require('lodash'),
    async = require('async'),
    log4js = require('log4js'),
    twit = require('twit');

var logger = log4js.getLogger();

var twitter = null;

function _fetchFollowers(nextCursor, cb) {
  twitter.get('followers/ids', {
    cursor: nextCursor
  }, function (err, result) {
    if (err) {
      switch (err.statusCode) {
      case 429:
        logger.debug('Rate limit exceeded (cursor: %s)', nextCursor);
        return setTimeout(function () {
          _fetchFollowers(nextCursor, cb);
        }, exports.RETRY_INTERVAL);
      default:
        return cb(err);
      }
    }

    logger.debug('Fetched %d Ids (cursor: %s)',
                 result.ids ? result.ids.length : '?',
                 nextCursor);

    var followerIds = [];

    function mergeIds(ids) {
      if (_.isArray(ids)) {
        followerIds = _.union(followerIds, ids);
      }
    }

    mergeIds(result.ids);

    if (result['next_cursor'] !== 0) {
      // Fetch next cursor.
      _fetchFollowers(result['next_cursor'], function (err, ids) {
        if (err) { return cb(err); }
        mergeIds(ids);
        cb(null, followerIds);
      });
    } else {
      // Return result.
      cb(null, followerIds);
    }
  });
}

function _filterNewFollowers(followerIds, cb) {
  var nextIds = (followerIds || []).splice(0, 100).join(',');

  twitter.post('users/lookup', {
    'user_id': nextIds
  }, function (err, result) {
    if (err) {
      switch (err.statusCode) {
      case 429:
        logger.debug('Rate limit exceeded (cursor: %s)');
        return setTimeout(function () {
          _filterNewFollowers(nextIds.concat(followerIds), cb);
        }, exports.RETRY_INTERVAL);
      default:
        return cb(err);
      }
    }

    var filteredIds = _.pluck(_.filter(result || [], function (user) {
      return !user['following'] && !user['follow_request_sent'];
    }), 'id');

    if (filteredIds.length) {
      logger.debug('Found %d new followers', filteredIds.length);
    }

    if (followerIds.length > 0) {
      // Fetch remainders.
      _filterNewFollowers(_.clone(followerIds), function (err, ids) {
        if (err) { return cb(err); }
        filteredIds = _.union(filteredIds, ids);
        cb(null, filteredIds);
      });
    } else {
      // Return result.
      cb(null, filteredIds);
    }
  });
}

function _follow(userId, cb) {
  logger.debug('Following %d', userId);
  twitter.post('friendships/create', {
    'user_id': userId,
    'follow': true
  }, cb);
}

function _followFollowers() {
  var lastFetchTime,
      numNewFollowers;

  async.waterfall([
    function (cb) {
      lastFetchTime = new Date();
      _fetchFollowers(-1, cb);
    },
    function (followerIds, cb) {
      numNewFollowers = followerIds.length;
      _filterNewFollowers(followerIds, cb);
    },
    function (newFollowerIds, cb) {
      var tasks = [];
      newFollowerIds.forEach(function (userId) {
        tasks.push(function (cb) {
          _follow(userId, cb);
        });
      });
      async.parallel(tasks, cb);
    }
  ], function (err) {
    if (err) {
      logger.error(util.inspect(err, { depth: null, colors: true }));
    } else {
      logger.info(util.format('Ensured following all %d followers.',
                               numNewFollowers));
    }
    setTimeout(function () {
      _followFollowers();
    }, Math.max(exports.FETCH_INTERVAL - new Date() - lastFetchTime, 0));
  });
}

function run(config) {
  assert(config, 'Missing config object.');
  assert(_.isObject(config), 'Config must be an object.');
  assert(_.isObject(config), 'Config must be an object.');
  assert(_.isString(config.accessToken), 'Missing accessToken string.');
  assert(config.accessToken, 'Empty accessToken string.');
  assert(_.isString(config.accessTokenSecret), 'Missing accessTokenSecret string.');
  assert(config.accessTokenSecret, 'Empty accessTokenSecret.');
  assert(_.isString(config.consumerKey), 'Missing consumerKey string.');
  assert(config.consumerKey, 'Empty consumerKey.');
  assert(_.isString(config.consumerSecret), 'Missing consumerSecret string.');
  assert(config.consumerSecret, 'Empty consumerSecret.');

  twitter = new twit({
    'access_token': config.accessToken,
    'access_token_secret': config.accessTokenSecret,
    'consumer_key': config.consumerKey,
    'consumer_secret': config.consumerSecret
  });

  twitter.get('statuses/user_timeline', {count: 0}, function (err) {
    if (err) {
      err = ((err.twitterReply && JSON.parse(err.twitterReply)) ||
             (err.data && JSON.parse(err.data)) ||
             err);
      logger.error(util.inspect(err, { depth: null, colors: true }));
    } else {
      logger.debug('Authenticated.');
      _followFollowers();
    }
  });
}

// Public API
exports.FETCH_INTERVAL = 60000; // 1 minute
exports.RETRY_INTERVAL = 1000;  // 1 second
exports.run = run;
