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
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(links) {
        var i, post;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        i = 0;

                    case 1:
                        if (!(i < links.length)) {
                            _context.next = 9;
                            break;
                        }

                        _context.next = 4;
                        return parsePost(links[i], _config2.default.OnlineTambov).then(function (post) {
                            return post;
                        });

                    case 4:
                        post = _context.sent;

                        console.log(post);

                    case 6:
                        i++;
                        _context.next = 1;
                        break;

                    case 9:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
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

function parsePost(url, elems) {
    return new _promise2.default(function (resolve, reject) {
        unirest.get(url).end(function (_ref) {
            var body = _ref.body,
                error = _ref.error;

            if (error) reject(error);
            var $ = cheerio.load(body);

            var domain = url.match(/\/\/(.*?)\//)[1];
            var title = $(elems.item).text().trim();
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