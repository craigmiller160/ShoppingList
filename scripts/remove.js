const { readData, writeData, openReadline } = require('./io');
const { formatItemsByIndex } = require('./format');

const removeItem = async () => {
	throw new Error('Refactor this to work with new HTML view'); // TODO delete this

	console.log(formatItemsByIndex());
	console.log('\n');

	let selection;

	const rl = openReadline();
	try {
		selection = await rl.questionSync('ID of Item to Remove: ');
	}
	finally {
		rl.close();
	}

	const id = parseInt(selection);
	const data = readData();
	const index = data.items.findIndex((item) => item.id === id);
	if (index === -1) {
		throw new Error(`Cannot find item with ID: ${selection}`);
	}

	data.items.splice(index, 1);
	writeData(data);

	// TODO at the very end, print a new HTML page
};

module.exports = removeItem;