const { readData, writeData, openReadline } = require('./io');
const print = require('./print');

const removeItem = async () => {
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

	const item = data.items[index];
	data.items.splice(index, 1);
	writeData(data);
	console.log(`Successfully removed ${item.name} from aisle ${item.aisle}`);
	print(data);
};

module.exports = removeItem;