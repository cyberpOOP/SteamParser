const https = require('https');

let info = [];
let data = '';

let names = ['Clutch%20Case', 'Rio%202022%20Contenders%20Sticker%20Capsule', 'Sticker%20%7C%20Infinite%20Triangle%20%28Holo%29'];

module.exports.request = function (){
    return new Promise((resolve, reject)=>{

        names.forEach((el, i)=>{
            https.get(`https://steamcommunity.com/market/priceoverview/?market_hash_name=${el}&appid=730&currency=18`,
                async (resp)=>{
                    data = '';

                    resp.on('data', (chunk)=>{
                        data += chunk;
                    })

                    await resp.on('end', async()=>{
                        info.push(data);
                    });

                    if(info.length === names.length)
                        resolve(info);
                });
        });
        //end callback
    });
};
