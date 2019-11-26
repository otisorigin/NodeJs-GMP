const csv = require('csvtojson')
const fs = require('fs')

const csvFilePath = 'data/table.csv'
const outputPath = 'data/output.txt'

let jsonArray = [];

function createFile(jsonArray) {
    fs.writeFile(outputPath, JSON.stringify(jsonArray, null, ' '), function (err) {
        if (err) throw err;
        console.log('File is created successfully.');
      }); 
}

csv()   
.fromFile(csvFilePath)
.subscribe((json,lineNumber)=>{
    console.log(lineNumber);
    console.log(json);
    jsonArray.push(json);
},(error) => console.log(error), () => createFile(jsonArray))