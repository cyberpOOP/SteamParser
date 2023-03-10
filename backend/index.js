const handler = require('./handlers.js');

let links;

handler.read().then((items)=>{
    links = [];
    items.forEach((el)=>{
        links.push(el.link.split('730/')[1]);
    });


    handler.request(links).then((res)=>{

        let cost = '';

        res.forEach((result, i)=>{
            cost = '';
            JSON.parse(result).lowest_price.split(',').reduce((a, b)=>{
                cost = `${a}.${b.split('₴')[0]}`;
                //console.log(a+" "+b.split('₴')[0]);
                items[i].cost2 = parseFloat(cost);
            })




        })

    }).finally(()=>{
        console.log(items);
    });


}).catch(err => console.log(err));

