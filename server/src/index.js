import { parsePost, parseLinks, fetchLinks } from './parsePosts';
import fs from 'fs';
import iconv from 'iconv-lite'

const saveResult =(json)=>{
    json=iconv.decode(Buffer.from(json), 'utf-8');
    fs.writeFile('result.json',json,(err)=>{
        if (err) console.log("not saved");
    })
}


const urlPage = 'https://www.onlinetambov.ru/news/society/';



parseLinks(urlPage, '.head', 20)
    .then((links) => {
        fetchLinks(links).then((posts)=>{
            // console.log(posts),
            saveResult(JSON.stringify(posts,0,4))
        });
    });