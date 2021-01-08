'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _parsePosts = require('./parsePosts');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _iconvLite = require('iconv-lite');

var _iconvLite2 = _interopRequireDefault(_iconvLite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var saveResult = function saveResult(json) {
    json = _iconvLite2.default.decode(Buffer.from(json), 'utf-8');
    _fs2.default.writeFile('result.json', json, function (err) {
        if (err) console.log("not saved");
    });
};

var urlPage = 'https://www.onlinetambov.ru/news/society/';

(0, _parsePosts.parseLinks)(urlPage, '.head', 20).then(function (links) {
    (0, _parsePosts.fetchLinks)(links).then(function (posts) {
        // console.log(posts),
        saveResult((0, _stringify2.default)(posts, 0, 4));
    });
});