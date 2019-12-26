const { readData, writeShoppingList } = require('./io');
const formatHtml = require('./html-formatter');

const print = (data) => {
	let actualData = data;
	if (!actualData) {
		actualData = readData();
	}
	const formatted = formatHtml(actualData);
	writeShoppingList(formatted);
};

module.exports = print;