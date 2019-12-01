const { readData } = require('./io');

const formatData = () => {
	let formatted = 'Shopping List\n\n';

	const data = readData();
	const itemsByAisle = data.items.reduce((acc, item) => {
		if (acc[item.aisle]) {
			acc[item.aisle].push(item.name);
		}
		else {
			const aisleArray = [item.name];
			acc[item.aisle] = aisleArray;
		}
		return acc;
	}, {});

	Object.entries(itemsByAisle)
		.forEach(([aisle, itemArray]) => {
			formatted += `Aisle: ${aisle}\n`;
			itemArray.forEach((item) => {
				formatted += `  [ ] ${item}\n`;
			});
			formatted += '\n';
		});

	return formatted;
};

module.exports = formatData;