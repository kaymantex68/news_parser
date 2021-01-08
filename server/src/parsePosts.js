const unirest = require('unirest');
const cheerio = require('cheerio');

import elems from './config';

const delay = (i, count, ms) =>{return new Promise((resolve,reject) => setTimeout(() => {
    console.log(
        `index: ${i};
        count: ${count}; `
    )
    resolve();
}, ms));} 

function parsePost(url, elems) {
    return new Promise((resolve, reject) => {
        unirest.get(url).end(({ body, error }) => {
            if (error) reject(error);
            const $ = cheerio.load(body);

            const domain = url.match(/\/\/(.*?)\//)[1];
            const title = $(elems.title).text().trim();
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
            if (!links.length) reject({ error: "empty links" });
        })


    })

}

async function fetchLinks(links) {
    return new Promise(async (resolve, reject) => {
        let posts = [];
        let count = links.length;
        for (let i = 0; i < count; i++) {
            const post = await parsePost(
                links[i],
                elems.OnlineTambov,
            ).then(post => post);
            posts.push(post);
            await delay(i+1, count, 300);
        }
        // if (!posts.length) reject({ empty: "empty" });
        resolve(posts);
    })

}

export { parsePost, parseLinks, fetchLinks }
