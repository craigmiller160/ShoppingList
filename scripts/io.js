const fs = require('fs');
const path = require('path');
const moment = require('moment');
const readline = require('readline');

const DATA_FILE_PATH = path.resolve(require.main.path, './data/list.json');

const DEFAULT_DATA = {
	index: 0,
	items: []
};

const createBackupFilePath = () => {
	const timestamp = moment().format('YYYYMMDDHHmmss');
	return path.resolve(require.main.path, `./backup/list.${timestamp}.json`);
}

const readData = () => {
	if (fs.existsSync(DATA_FILE_PATH)) {
		const dataJson = fs.readFileSync(DATA_FILE_PATH, 'utf8');
		return JSON.parse(dataJson);
	}
	return DEFAULT_DATA;
};

const writeData = (data) => {
	if (fs.existsSync(DATA_FILE_PATH)) {
		const backupFilePath = createBackupFilePath();
		fs.copyFileSync(DATA_FILE_PATH, backupFilePath);
	}

	fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(data, null, 2), 'utf8');
};

const openReadline = () => {
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});

	rl.questionSync = (question) => new Promise((resolve) => {
		rl.question(question, (response) => resolve(response));
	});

	return rl;
};

module.exports = {
	readData,
	writeData,
	openReadline
};