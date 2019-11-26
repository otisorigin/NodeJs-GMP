const csv = require('csvtojson')

const csvFilePath = 'data/table.csv'
const filePath = '/data/output.json'

function onComplete() {
    console.log('Всё гуд');
}

csv()   
.fromFile(csvFilePath)
.subscribe((json,lineNumber)=>{
    console.log(lineNumber);
    console.log(json);
},(error) => console.log(error), onComplete)

//const jsonArray=csv().fromFile(filePath);