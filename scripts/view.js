const print = require('./print');
const { execSync } = require('child_process');
const { paths } = require('./io');

const { outputFilePath } = paths;

const viewData = () => {
	print();
	execSync(`xdg-open ${outputFilePath}`);
};

module.exports = viewData;