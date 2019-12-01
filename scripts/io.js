const fs = require('fs');
const path = require('path');
const moment = require('moment');

const DATA_FILE_PATH = path.resolve(require.main.path, './data/list.json');

const createBackupFilePath = () => {
	const timestamp = moment().format('YYYYMMDDHHmmss');
	return path.resolve(require.main.path, `./backup/list.${timestamp}.json`);
}

const readData = () => {
	if (fs.existsSync(DATA_FILE_PATH)) {
		const dataJson = fs.readFileSync(DATA_FILE_PATH, 'utf8');
		return JSON.parse(dataJson);
	}
	return [];
};

const writeData = (data) => {
	if (fs.existsSync(DATA_FILE_PATH)) {
		const backupFilePath = createBackupFilePath();
		fs.copyFileSync(DATA_FILE_PATH, backupFilePath);
	}

	fs.writeFileSync(DATA_FILE_PATH, 'utf8', JSON.stringify(data));
};

module.exports = {
	readData,
	writeData
};