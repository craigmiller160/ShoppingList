const { readData, writeData, openReadline } = require('./io');
const { formatItemsByIndex } = require('./format');

const removeItem = async () => {
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
};

module.exports = removeItem;