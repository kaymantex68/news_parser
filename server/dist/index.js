'use strict';

var _parsePosts = require('./parsePosts');

var urlPage = 'https://www.onlinetambov.ru/news/society/';

(0, _parsePosts.parseLinks)(urlPage, '.head', 30).then(function (links) {
    (0, _parsePosts.fetchLinks)(links);
});