const handler = require('./handlers.js');


handler.read().then((items)=>{
    let links = [];
    items.forEach((el, i)=>{
        links.push(el.Link.split('730/')[1]);
    });


    handler.request(links).then((res)=>{

        res.forEach(async(result)=>{
            await items.forEach((el)=>{
                el.CostNow = parseFloat(JSON.parse(result).lowest_price.split('₴')[0]);
            })


        })

    }).finally(()=>{
        console.log(items);
    });


}).catch(err => console.log(err));

