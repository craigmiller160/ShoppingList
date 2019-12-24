const { JSDOM } = require('jsdom');
const path = require('path'); // TODO remove this
const formatXml = require('xml-formatter');
const { readData } = require('./io');
const fs = require('fs'); // TODO remove this

const DOCTYPE = '<!DOCTYPE html>';

const css = `
	body {
		font-family: sans-serif;
	}

	.row {
		display: flex;
		flex-direction: row;
	}

	.col {
		display: flex;
		flex-direction: column;
	}

	.title {
		text-align: center;
		border-bottom: 1px solid lightgray;
		margin: 0 auto;
		width: 80%;
	}
`;

const formatDataHtml = () => {
	const data = readData();

	const dom = new JSDOM('<html><head /><body /></html>');
	const document = dom.window.document;

	// TODO figure out a way to move this out of this function
	const createElement = ({ tagName, textContent, className }) => {
		const elem = document.createElement(tagName);
		if (textContent) {
			elem.textContent = textContent;
		}
		if (className) {
			elem.className = className;
		}
		return elem;
	};

	document.head.appendChild(createElement({ 
		tagName: 'title', 
		textContent: 'Shopping List'
	}));
	document.head.appendChild(createElement({
		tagName: 'style',
		textContent: css
	}));

	document.body.appendChild(createElement({
		tagName: 'div',
		className: 'title'
	}));
	document.querySelector('div.title').appendChild(createElement({
		tagName: 'h1',
		textContent: 'Shopping List'
	}));

	const formatted = formatXml(dom.serialize());
	fs.writeFileSync(path.resolve(require.main.path, 'list.html'), formatted, 'utf8'); // TODO I don't want to write this here
};

module.exports = formatDataHtml;