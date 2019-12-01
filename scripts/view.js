const formatData = require('./format');

const viewData = () => {
	const formattedData = formatData();
	console.log(formattedData);
};

module.exports = viewData;