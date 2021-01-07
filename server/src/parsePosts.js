const unirest = require('unirest');
const cheerio = require('cheerio');

import elems from './config';

function parsePost(url, elems) {
    return new Promise((resolve, reject) => {
        unirest.get(url).end(({ body, error }) => {
            if (error) reject(error);
            const $ = cheerio.load(body);

            const domain = url.match(/\/\/(.*?)\//)[1];
            const title = $(elems.item).text().trim();
            let image = $(elems.image).attr('src');
            image = image.indexOf('http') >= 0 ? image : `http://${domain}${image}`;
            const text = $(elems.text).text().trim();
            const views = $(elems.views).text().trim();

            const post = {
                title: title,
                image: image,
                text: text,
                views: views
            };
            resolve(post);
        })
    })
}

function parseLinks(url, className, maxLinks) {
    return new Promise((resolve, reject) => {
        unirest.get(url).end((response) => {
            const body = response.body;
            const $ = cheerio.load(body);
            const domain = url.match(/\/\/(.*?)\//)[1];
            let links = [];
            $(className).each((i, e) => {
                if (i + 1 <= maxLinks) links.push('http://' + domain + $(e).attr('href'));
            })
            // console.log(links);
            resolve(links);
            if (!links.length) reject({error: "empty links"});
        })


    })

}

async function fetchLinks(links) {
    for (let i = 0; i < links.length; i++) {
        const post = await parsePost(
            links[i],
            elems.OnlineTambov,
        ).then(post => post );
        console.log(post)
    }
}

export { parsePost, parseLinks, fetchLinks }
