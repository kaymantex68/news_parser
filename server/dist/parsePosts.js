'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.parseLinks = exports.parsePost = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

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
            if (!links.length) reject(console.log("fuck off, bitch"));
        });
    });
}

exports.parsePost = parsePost;
exports.parseLinks = parseLinks;