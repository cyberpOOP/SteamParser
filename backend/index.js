const handler = require('./handlers.js');
const {quiet} = require("nodemon/lib/utils");






handler.read().then((items)=>{
    let links = [];
    items.forEach((el, i)=>{
        links.push(el.Link.split('730/')[1]);
    });

    handler.request(links).then((res)=>{

        console.log(res);

    });

}).catch(err => console.log(err));

