'use strict';

var _parsePosts = require('./parsePosts');

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var urlPage = 'https://www.onlinetambov.ru/news/society/';

// parsePost(
//     'https://www.onlinetambov.ru/news/society/s-1-marta-voditelyam-nachnut-vydavat-elektronnye-diagnosticheskie-karty-tekhosmotra/',
//     elems.OnlineTambov,
// ).then((result)=>{console.log(result)})


(0, _parsePosts.parseLinks)(urlPage, '.head', 20).then(function (links) {
    for (var i = 0; i < links.length; i++) {
        (0, _parsePosts.parsePost)(links[i], _config2.default.OnlineTambov).then(function (result) {
            console.log(result);
        });
    }
});