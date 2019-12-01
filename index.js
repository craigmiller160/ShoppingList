const commander = require('commander');

commander
	.option('-a, --add', 'Add an item to the shopping list')
	.option('-r, --remove', 'Remove an item to the shopping list')
	.option('-p, --print', 'Print the shopping list')
	.parse(process.argv);

if (commander.add) {
	throw new Error('Adding not implemented yet');
}
else if (commander.remove) {
	throw new Error('Removing not implemented yet');
} 
else if (commander.print) {
	throw new Error('Printing not implemented yet');
}
else {
	throw new Error('Invalid arguments.');
}