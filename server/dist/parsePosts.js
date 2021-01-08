'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.fetchLinks = exports.parseLinks = exports.parsePost = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var fetchLinks = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(links) {
        var _this = this;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        return _context2.abrupt('return', new _promise2.default(function () {
                            var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(resolve, reject) {
                                var posts, count, i, post;
                                return _regenerator2.default.wrap(function _callee$(_context) {
                                    while (1) {
                                        switch (_context.prev = _context.next) {
                                            case 0:
                                                posts = [];
                                                count = links.length;
                                                i = 0;

                                            case 3:
                                                if (!(i < count)) {
                                                    _context.next = 13;
                                                    break;
                                                }

                                                _context.next = 6;
                                                return parsePost(links[i], _config2.default.OnlineTambov).then(function (post) {
                                                    return post;
                                                });

                                            case 6:
                                                post = _context.sent;

                                                posts.push(post);
                                                _context.next = 10;
                                                return delay(i + 1, count, 300);

                                            case 10:
                                                i++;
                                                _context.next = 3;
                                                break;

                                            case 13:
                                                // if (!posts.length) reject({ empty: "empty" });
                                                resolve(posts);

                                            case 14:
                                            case 'end':
                                                return _context.stop();
                                        }
                                    }
                                }, _callee, _this);
                            }));

                            return function (_x2, _x3) {
                                return _ref3.apply(this, arguments);
                            };
                        }()));

                    case 1:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));

    return function fetchLinks(_x) {
        return _ref2.apply(this, arguments);
    };
}();

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var unirest = require('unirest');
var cheerio = require('cheerio');

var delay = function delay(i, count, ms) {
    return new _promise2.default(function (resolve, reject) {
        return setTimeout(function () {
            console.log('index: ' + i + ';\n        count: ' + count + '; ');
            resolve();
        }, ms);
    });
};

function parsePost(url, elems) {
    return new _promise2.default(function (resolve, reject) {
        unirest.get(url).end(function (_ref) {
            var body = _ref.body,
                error = _ref.error;

            if (error) reject(error);
            var $ = cheerio.load(body);

            var domain = url.match(/\/\/(.*?)\//)[1];
            var title = $(elems.title).text().trim();
            var image = $(elems.image).attr('src');
            image = image.indexOf('http') >= 0 ? image : 'http://' + domain + image;
            var text = $(elems.text).text().trim();
            var views = $(elems.views).text().trim();

            var post = {
                title: title,
                image: image,
                text: text,
                views: views
            };
            resolve(post);
        });
    });
}

function parseLinks(url, className, maxLinks) {
    return new _promise2.default(function (resolve, reject) {
        unirest.get(url).end(function (response) {
            var body = response.body;
            var $ = cheerio.load(body);
            var domain = url.match(/\/\/(.*?)\//)[1];
            var links = [];
            $(className).each(function (i, e) {
                if (i + 1 <= maxLinks) links.push('http://' + domain + $(e).attr('href'));
            });
            // console.log(links);
            resolve(links);
            if (!links.length) reject({ error: "empty links" });
        });
    });
}

exports.parsePost = parsePost;
exports.parseLinks = parseLinks;
exports.fetchLinks = fetchLinks;