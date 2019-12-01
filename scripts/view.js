const { prettyFormatList } = require('./format');

const viewData = () => {
	const formattedData = prettyFormatList();
	console.log(formattedData);
};

module.exports = viewData;