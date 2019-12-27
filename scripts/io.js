const fs = require('fs');
const path = require('path');
const moment = require('moment');
const readline = require('readline');

const DATA_FILE_PATH = path.resolve(require.main.path, './data/list.json');
const DEV_DATA_FILE_PATH = path.resolve(require.main.path, './data/dev-list.json');
const OUTPUT_PATH = path.resolve(require.main.path, 'ShoppingList.html');
const DEV_OUTPUT_PATH = path.resolve(require.main.path, 'ShoppingList_dev.html');

const DEFAULT_DATA = {
	index: 0,
	items: []
};

const dataFilePath = process.env.PROD ? DATA_FILE_PATH : DEV_DATA_FILE_PATH;
const outputFilePath = process.env.PROD ? OUTPUT_PATH : DEV_OUTPUT_PATH;

const createBackupFilePath = () => {
	const timestamp = moment().format('YYYYMMDDHHmmss');
	const devPrefix = process.env.PROD ? '' : 'dev_';
	return path.resolve(require.main.path, `./backup/${devPrefix}list.${timestamp}.json`);
}

const readData = () => {
	if (fs.existsSync(dataFilePath)) {
		const dataJson = fs.readFileSync(dataFilePath, 'utf8');
		return JSON.parse(dataJson);
	}
	return DEFAULT_DATA;
};

const writeData = (data) => {
	if (fs.existsSync(dataFilePath)) {
		const backupFilePath = createBackupFilePath();
		fs.copyFileSync(dataFilePath, backupFilePath);
	}

	fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
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

const writeShoppingList = (html) => {
	fs.writeFileSync(outputFilePath, html, 'utf8');
	console.log(`Shopping List written to: ${outputFilePath}`);
};

module.exports = {
	readData,
	writeData,
	openReadline,
	writeShoppingList,
	paths: {
		dataFilePath,
		outputFilePath
	}
};