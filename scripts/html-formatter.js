const { JSDOM } = require('jsdom');
const { HtmlBuilder } = require('./html/builder');
const { readData } = require('./io'); // TODO maybe remove this
const fs = require('fs'); // TODO delete this
const path = require('path'); // TODO delete this

const formatDataHtml = () => {
	const data = readData(); // TODO remove this

	const css = fs.readFileSync(path.resolve(require.main.path, 'scripts/html/styles.css'), 'utf8');

	const htmlBuilder = new HtmlBuilder();
	htmlBuilder.addCss(css);

	const titleElem = htmlBuilder.createElement({
		tagName: 'title',
		textContent: 'Shopping List'
	});
	htmlBuilder.document.head.appendChild(titleElem);

	const headerElem = htmlBuilder.createElement({ tagName: 'header' });
	htmlBuilder.document.body.appendChild(headerElem);

	const headerTitleDiv = htmlBuilder.createElement({
		tagName: 'div',
		className: 'title'
	});
	headerElem.appendChild(headerTitleDiv);

	const titleH1 = htmlBuilder.createElement({
		tagName: 'h1',
		textContent: 'Shopping List'
	});
	headerTitleDiv.appendChild(titleH1);

	const formatted = htmlBuilder.serialize();
	fs.writeFileSync(path.resolve(require.main.path, 'list.html'), formatted, 'utf8'); // TODO I don't want to write this here
};

module.exports = formatDataHtml;