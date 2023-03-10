const https = require('https');
const reader = require("xlsx");



module.exports.request = function (links){
    return new Promise((resolve)=>{

        let item = [];

        links.forEach((el, i)=>{
            https.get(`https://steamcommunity.com/market/priceoverview/?market_hash_name=${el}&appid=730&currency=18`,
                async (resp)=>{
                    let data = '';

                    resp.on('data', (chunk)=>{
                        data += chunk;
                    })

                    await resp.on('end', async()=>{
                        item.push(data);
                    });

                    if(item.length === links.length)
                        resolve(item);
                });
        });
        //end callback
    });
};


module.exports.read = function (){
    return new Promise((resolve, reject)=>{

        let items = [];
        try{
            const file = reader.readFile('./test.xlsx');

            const sheets = file.SheetNames

            for(let i = 0; i < sheets.length; i++)
            {
                const temp = reader.utils.sheet_to_json(
                    file.Sheets[file.SheetNames[i]])
                temp.forEach((res) => {
                    items.push(res);
                })
            }

            resolve(items);
        }
        catch (err){
            reject(err);
        }

    });
};
