'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var parsePost = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(url, elems) {
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return unirest.get(url).end(function (response) {

                            var body = response.body;
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

                            console.log(post);
                        });

                    case 2:
                        _context.next = 4;
                        return setTimeout(function () {
                            return console.log('TOOOOOO');
                        }, 2000);

                    case 4:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function parsePost(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var unirest = require('unirest');
var cheerio = require('cheerio');

module.exports = parsePost;