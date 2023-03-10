const xlsx = require('xlsx');
const handler = require('./handlers.js');

let items;

const file = xlsx.readFile('./table.xlsx');
file.SheetNames.forEach((el)=>{
    items = xlsx.utils.sheet_to_json(file.Sheets[el]);
})


handler.request(items);






