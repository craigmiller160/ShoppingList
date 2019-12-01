const { readData } = require('./io');
const leadingZeroes = require('leading-zeroes').default;

const organizeByAisle = () => {
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

	return itemsByAisle;
};

const prettyFormatList = () => {
	let formatted = 'Shopping List\n\n';

	const itemsByAisle = organizeByAisle();
	Object.entries(itemsByAisle)
		.forEach(([aisle, itemArray]) => {
			formatted += `Aisle: ${aisle}\n`;
			itemArray.sort((item1, item2) => item1.localeCompare(item2))
				.forEach((item) => {
					formatted += `  [ ] ${item}\n`;
				});
			formatted += '\n';
		});

	return formatted;
};

const formatItemsByIndex = () => {
	let formatted = 'Items By Index\n\n';

	const data = readData();
	return data.items
		.sort((item1, item2) => {
			const result = item1.aisle.localeCompare(item2.aisle);
			if (result === 0) {
				return item1.name.localeCompare(item2.name);
			}
			return result;
		})
		.map((item) => {
			const id = leadingZeroes(item.id, 3);
			return `[${id}] (${item.aisle}) ${item.name}`;
		})
		.join('\n');
};

module.exports = {
	prettyFormatList,
	formatItemsByIndex
};