const commander = require('commander');
const { readData, writeData } = require('./scripts/io');

const data = readData();

console.log(data);