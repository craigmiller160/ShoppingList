const fs = require('fs');
const path = require('path');
const { prettyFormatList } = require('./format');
const { writeShoppingList } = require('./io');

const printList = () => {
	const formatted = prettyFormatList();
	writeShoppingList(formatted);
};

module.exports = printList;