const axios = require('axios');

let url = ['https://steamcommunity.com/market/priceoverview/?market_hash_name=','&appid=730&currency=18']

module.exports.request = (items)=>{


    items.forEach(async(el)=>{
        const response = await axios.get(url[0]+el.Link.split('730/')[1]+url[1]);
        console.log(el.Name+" "+response.data.lowest_price);
        response.data.lowest_price.split(',').reduce((a,b)=>{
            el.CostNow = parseFloat(`${a}.${b.split('₴')[0]}`);
        });
        console.log(el);

    });

}