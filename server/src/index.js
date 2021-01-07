import { parsePost, parseLinks } from './parsePosts';
import elems from './config';


const urlPage = 'https://www.onlinetambov.ru/news/society/';

// parsePost(
//     'https://www.onlinetambov.ru/news/society/s-1-marta-voditelyam-nachnut-vydavat-elektronnye-diagnosticheskie-karty-tekhosmotra/',
//     elems.OnlineTambov,
// ).then((result)=>{console.log(result)})




parseLinks(urlPage, '.head', 20)
    .then((links) => {
        for (let i = 0; i < links.length; i++) {
            parsePost(
                links[i],
                elems.OnlineTambov,
            ).then((result) => { console.log(result) })
        }

    });