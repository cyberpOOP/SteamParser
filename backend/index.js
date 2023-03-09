const handler = require('./handlers.js');

let names = ['Clutch%20Case', 'Rio%202022%20Contenders%20Sticker%20Capsule', 'Sticker%20%7C%20Infinite%20Triangle%20%28Holo%29'];

handler.request().then((res)=>{
    console.log(res);
}).catch(err => console.log(err));