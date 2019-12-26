const { readData, writeData, openReadline } = require('./io');
const print = require('./print');

const addItem = async () => {
	const data = readData();

	let name;
	let aisle;

	const rl = openReadline();
	try {
		name = await rl.questionSync('Item Name: ');
		aisle = await rl.questionSync('Aisle Number: ');
	}
	finally {
		rl.close();
	}

	data.index++;
	data.items.push({
		id: data.index,
		name,
		aisle
	});

	writeData(data);
	console.log(`Successfully added ${name} in aisle ${aisle}`);
	print(data);
};

module.exports = addItem;