const fs = require('fs');
const path = require('path');

const DATA_PATH = path.resolve(__dirname, './data/list.json');

const readData = () => {
	if (fs.existsSync(DATA_PATH)) {
		const dataJson = fs.readFileSync(DATA_PATH, 'utf8');
		return JSON.parse(dataJson);
	}
	return [];
};

const data = readData();

