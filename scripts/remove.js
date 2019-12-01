const { readData, writeData, openReadline } = require('./io');
const { formatItemsByIndex } = require('./format');

const removeItem = () => {
	console.log(formatItemsByIndex());
};

module.exports = removeItem;