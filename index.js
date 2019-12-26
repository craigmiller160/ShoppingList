const commander = require('commander');
const addItem = require('./scripts/add');
const viewData = require('./scripts/view');
const removeItem = require('./scripts/remove');
const print = require('./scripts/print');
const formatHtml = require('./scripts/html-formatter'); // TODO remove this

commander
	.option('-a, --add', 'Add an item to the shopping list')
	.option('-r, --remove', 'Remove an item to the shopping list')
	.option('-p, --print', 'Print the shopping list')
	.option('-v, --view', 'View the shopping list')
	.parse(process.argv);

if (commander.add) {
	addItem();
}
else if (commander.remove) {
	removeItem();
} 
else if (commander.print) {
	print();
}
else if (commander.view) {
	viewData();
}
else {
	throw new Error('Invalid arguments.');
}