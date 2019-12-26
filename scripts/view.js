const { readData } = require('./io');

const viewData = () => {
	throw new Error('Need to open the browser to display the HTML');
};

module.exports = viewData;