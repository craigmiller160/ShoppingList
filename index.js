const commander = require('commander');
const addItem = require('./scripts/add');
const viewData = require('./scripts/view');
const removeItem = require('./scripts/remove');
const printItem = require('./scripts/print');
const formatHtml = require('./scripts/html-formatter'); // TODO remove this

commander
	.option('-a, --add', 'Add an item to the shopping list')
	.option('-r, --remove', 'Remove an item to the shopping list')
	.option('-p, --print', 'Print the shopping list')
	.option('-v, --view', 'View the shopping list')
	.option('--html', 'HTML test logic') // TODO remove this
	.parse(process.argv);

if (commander.add) {
	addItem();
}
else if (commander.remove) {
	removeItem();
} 
else if (commander.print) {
	printItem();
}
else if (commander.view) {
	viewData();
}
else if (commander.html) {
	// TODO delete this section
	formatHtml();
}
else {
	throw new Error('Invalid arguments.');
}