const { readData, writeShoppingList } = require('./io');
const formatHtml = require('./html-formatter');

const print = () => {
	const data = readData();
	const formatted = formatHtml(data);
	writeShoppingList(formatted);
};

module.exports = print;