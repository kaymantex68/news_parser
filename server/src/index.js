import { parsePost, parseLinks, fetchLinks } from './parsePosts';



const urlPage = 'https://www.onlinetambov.ru/news/society/';



parseLinks(urlPage, '.head', 30)
    .then((links) => {
        fetchLinks(links);
    });