const xlsx = require('xlsx');
const handler = require('./handlers.js');
let x1 = require('excel4node');

let items;

let width = [80, 40, 10, 10, 10, 10, 15];
let names = ['Link', 'Name', 'CostBuy', 'CostNow', 'Amount', 'Profit All', 'Profit Result'];

let wb = new x1.Workbook();
let ws = wb.addWorksheet('CS');

let general = wb.createStyle({
    font: {
        color: '#000000',
        size: 14,
        name: 'Times New Roman'
    },
});
let link = wb.createStyle({
    font:{
        color: '#000000',
        size: 8,
        name: 'Times New Roman'
    }
});
let align = wb.createStyle({
    alignment:{
        horizontal: 'center',
        vertical: 'center'
    },
    font:{
        color: '#000000',
        size: 14,
        name: 'Times New Roman'
    },

})

const file = xlsx.readFile('./table.xlsx');
file.SheetNames.forEach((el)=>{
    items = xlsx.utils.sheet_to_json(file.Sheets[el]);
})

handler.request(items).then((res)=>{

    //console.log(res);

    for(let i=0; i<7; i++){
        ws.column(i+1).setWidth(width[i]);
        ws.cell(1,i+1).string(names[i]).style(align);
    }

    res.forEach((el, i)=>{
        ws.cell(i+2, 1).link(el.Link).style(link);
        ws.cell(i+2, 2).string(el.Name).style(general);
        ws.cell(i+2, 3).number(el.CostBuy).style(align);
        ws.cell(i+2, 4).number(el.CostNow).style(align);
        ws.cell(i+2, 5).number(el.Amount).style(align);
        ws.cell(i+2, 6).formula(`E${i+2}*D${i+2}-E${i+2}*C${i+2}`).style(align);
        ws.cell(i+2, 7).formula(`=F${i+2}*0.85`).style(align);
    });

    wb.write('table.xlsx');
});















