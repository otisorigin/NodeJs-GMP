import csv from 'csvtojson';
import { writeFile } from 'fs';

const csvFilePath = 'data/table.csv'
const outputPath = 'data/output.txt'

let jsonArray = [];

function createFile(jsonArray) {
    writeFile(outputPath, JSON.stringify(jsonArray, null, ' '), function (err) {
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